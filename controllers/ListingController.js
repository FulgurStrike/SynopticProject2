const Listing = require('../models/listing');

exports.getAllListings = async (req, res) => {
    try {
        const listings = await Listing.find().sort({ createdAt: -1 }); 
        res.render('listings', {
            pageTitle: 'All Listings',
            listings: listings,
            user: { avatarUrl: 'https://via.placeholder.com/30/000000/FFFFFF/?text=U' }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getNewListingForm = (req, res) => {
    res.render('newListing', {
        pageTitle: 'Create New Listing',
        user: { avatarUrl: 'https://via.placeholder.com/30/000000/FFFFFF/?text=U' } 
    });
};

exports.createListing = async (req, res) => {
    try {
        const { item, type, quantity, extraDetails } = req.body;
        const newListing = new Listing({
            item,
            type,
            quantity,
            extraDetails
        });
        await newListing.save();
        res.redirect('/listings'); 
    } catch (err) {
        console.error(err);
        res.status(400).render('newListing', {
            pageTitle: 'Create New Listing',
            errorMessage: 'Failed to create listing. Please check your input.',
            formData: req.body, 
            user: { avatarUrl: 'https://via.placeholder.com/30/000000/FFFFFF/?text=U' }
        });
    }
};