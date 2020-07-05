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

// save a new todo
router.post( '/', ( req, res ) => {
    console.log('hi');

    // a new task's completed state will always be false 
    // (column default)
    let insertQuery = `INSERT INTO "todos" ( "task" ) VALUES ( $1 )`;

    pool.query( insertQuery, [ req.body.task ] )
    .then( ( result ) => {
        res.sendStatus( 201 );
    }).catch( ( err ) => {
        console.log( '>:| ' + err );
        res.sendStatus( 500 );
    })
})


// send out our guy
module.exports = router;