// require
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const todos = require( './modules/todos.route' );

// use
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( express.static( 'server/public' ) );
app.use( '/todos', todos );

// go server!
const port = 5000;
app.listen( port, () => {
    console.log( 'server running!: ' + port );
})