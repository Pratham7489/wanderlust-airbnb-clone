const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listings.js");

// index(All Listings) and create Listing
router.route("/")
    .get(wrapAsync( listingController.index )
)
.post(
    isLoggedIn,
    validateListing, 
    upload.single('listing[image]'),
    wrapAsync( listingController.createListing )
);

// Create new form listing route
router.get("/new", isLoggedIn, listingController.renderNewForm );


// show , Update  and Delete Listing routes
router.route("/:id")
    .get( wrapAsync ( listingController.showListing )  
)
.put(
    isLoggedIn, 
    isOwner,
    upload.single('listing[image]'),
    validateListing, 
    wrapAsync( listingController.updateListing ) 
)
.delete( 
    isLoggedIn, 
    isOwner,
    wrapAsync( listingController.destroyListing )
);


//  listing Edit route

router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync( listingController.renderEditForm )
);


module.exports = router;