// import stuff!
const express = require( 'express' );
const router = express.Router();
const pool = require( './pool' );

// get our todos
router.get( '/', ( req, res ) => {
    console.log( 'Hey we got GET' );
})

// send out our guy
module.exports = router;