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
        console.log( '>:| select fail: ' + err );
        res.send( 500 );
    })
}) // GET end

// save a new todo
router.post( '/', ( req, res ) => {
    // we only need the 'task' data
    // 'completed' will be sql-auto-false-column-default
    let insertQuery = `INSERT INTO "todos" ( "task" ) VALUES ( $1 )`;

    pool.query( insertQuery, [ req.body.task ] )
    .then( ( result ) => {
        res.sendStatus( 201 );
    }).catch( ( err ) => {
        console.log( '>:| insert went poorly: ' + err );
        res.sendStatus( 500 );
    })
}) // INSERT end

// slice and dice
router.delete( '/:id', ( req, res ) => {
    console.log( '/birds DELETE hit:', req.params.id );

    let deleteQuery = `DELETE FROM "todos" WHERE "id"=${ req.params.id };`;
    pool.query( deleteQuery )
    .then( ( results ) => {
        console.log( '>:| delete went bad: ' + err );
        res.send( 200 );
    }).catch( ( err ) => {
        res.send( 500 );
    })
}) // DELETE end


// send out our guy
module.exports = router;