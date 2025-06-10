const Trading = require('../models/Trading');
const User = require('../models/UserModel');

exports.renderTradingPage = async (req, res) => {
  try {
    const listings = await Trading.find().populate('createdBy');
    res.render('tradingPage', { title: 'Trading Page', listings, user: req.user });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Unable to load listings');
    res.redirect('/');
  }
};

exports.renderListingDetail = async (req, res) => {
  try {
    const listing = await Trading.findById(req.params.id).populate('createdBy');
    if (!listing) {
      req.flash('error', 'Listing not found');
      return res.redirect('/listings');
    } 
    res.render('showListingPage', { listing, user: req.user });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not load listing');
    res.redirect('/listings');
  }
}

exports.renderCreateForm = (req, res) => {
  res.render('createListingPage', {user: req.user });
}

exports.createListing = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    await Trading.create({
      name,
      description,
      price: price,
      createdBy: req.user._id
    });
    req.flash('success', 'Listing created successfully');
    res.redirect('/listings');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to create listing');
    res.redirect('/listings/new');
  }
} 

exports.deleteListing = async (req, res) => {
  try {
    const listing = await Trading.findById(req.params.id);

    if (!listing) {
      req.flash('error', 'Listing not found');
      return res.redirect('/listings');
    }

    // Check if the logged in user is the creator
    if (listing.createdBy.toString() !== req.user._id.toString()) {
      req.flash('error', 'You do not have permission to delete this listing');
      return res.redirect('/listings');
    }

    await Trading.findByIdAndDelete(req.params.id);

    req.flash('success', 'Listing deleted successfully');
    res.redirect('/listings');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to delete listing');
    res.redirect('/listings');
  }
};

exports.clearAllListings = async (req, res) => {
    try {
        await Trading.deleteMany({});
        res.send('All listings deleted.');
    } catch (err) {
        res.status(500).send('Error deleting listings.');
    }
};




