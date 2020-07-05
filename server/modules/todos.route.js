// import stuff!
const express = require( 'express' );
const router = express.Router();
const pool = require( './pool' );

// get the todos
router.get( '/', ( req, res ) => {

    const getQuery = `SELECT * FROM "todos" ORDER BY "id" ASC;`;
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
    const insertQuery = `INSERT INTO "todos" ( "task" ) VALUES ( $1 )`;
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

    const deleteQuery = `DELETE FROM "todos" WHERE "id"=${ req.params.id };`;
    pool.query( deleteQuery )
    .then( ( results ) => {
        res.send( 200 );
    }).catch( ( err ) => {
        console.log( '>:| delete went bad: ' + err );
        res.send( 500 );
    })
}) // DELETE end

// complete/uncomplete the todo
router.put( '/:id', ( req, res ) => {

    const updateQuery = `UPDATE "todos" SET "completed"=${ req.body.completed } WHERE "id"=${ req.params.id };`;
    pool.query( updateQuery )
    .then( ( results ) => {
        res.sendStatus( 200 );
    }).catch( ( err ) => {
        console.log( '>:| update no: ' + err );
        res.sendStatus( 500 );
    }) // UPDATE end
})

// tie a ribbon on it
module.exports = router;