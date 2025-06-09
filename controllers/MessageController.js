const Message = require('../models/MessageModel');
const Trading = require('../models/Trading');
const User = require('../models/UserModel');

// List of users that the current user has exchanged msgs with
exports.userDashboard = async (req, res) => {
    try {
        const userId = req.user._id;

        const inboxUsers = await Message.aggregate([
            { $match: { recipient: userId } },
            { $group: { _id: '$sender' } }
        ]);

        const sentUsers = await Message.aggregate([
            { $match: {sender: userId }},
            { $group: {_id: '$recipient'}}
        ])

        const uniqueUserIDs = new Set([
            ...inboxUsers.map(u => u._id.toString()),
            ...sentUsers.map(u => u._id.toString())
        ]);

        const contacts = await User.find({ _id: { $in: Array.from(uniqueUserIDs) } });
        res.render('userDashboardPage', {user: req.user, contacts});
    } catch (err) {
        console.error(err);
        req.flash('error', 'Unable to load dashboard');
        res.redirect('/');
    }
}

// Msg user via listing
exports.sendFromListing = async (req, res) => {
    try {
        const listing = await Trading.findById(req.params.listingID);
        if (!listing) {
            req.flash('error', 'Listing not found');
            return res.redirect('/listings');
        }
        if (listing.createdBy.toString() === req.user._id.toString()) {
            req.flash('error', 'You cannot message yourself');
            return res.redirect(`/listings/${req.params.listingID}`);
        }
        await Message.create({
            sender: req.user._id,
            recipient: listing.createdBy,
            listing: listing._id,
            content: req.body.content
        });
        req.flash('success', 'Message sent successfully');
        res.redirect('/messages');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Message failed to send');
        res.redirect('/listings');
    }
}

// View full conversation with a user
exports.conversationWithUser = async (req, res) => {
    try {
        const currentUser = req.user._id;
        const otherUser = req.params.userId;

        const messages = await Message.find({
            $or: [
                { sender: currentUser, recipient: otherUser },
                { sender: otherUser, recipient: currentUser }
            ]
        }).sort({ createdAt: 1 }).populate('sender recipient listing');

        const otherUserDetails = await User.findById(otherUser);
        
        res.render('conversationPage', {
            user: req.user,
            otherUser: otherUserDetails,
            messages
        })
    } catch (err) {
        console.error(err);
        req.flash('error', 'Could not load conversation');
        res.redirect('/messages');
    }
}

exports.replyToUser = async (req, res) => {
    try {
        await Message.create({
            sender: req.user._id,
            recipient: req.params.userId,
            content: req.body.content
        });
        req.flash('success', 'Reply sent');
        res.redirect(`/messages/conversation/${req.params.userId}`);
    } catch (err) {
        console.error(err);
        req.flash('error', 'Reply failed');
        res.redirect('/messages');
    }
}