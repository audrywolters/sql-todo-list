// import stuff!
const express = require( 'express' );
const router = express.Router();
const pool = require( './pool' );

// get the todos
router.get( '/', ( req, res ) => {

    let getQuery = `SELECT * FROM "todos"`;
    pool.query( getQuery ).then( ( result ) => {
        res.send( result.rows );
    }).catch( ( err ) => {
        console.log( 'select fail :,( ' + err );
        res.send( 500 );
    })
})

// send out our guy
module.exports = router;