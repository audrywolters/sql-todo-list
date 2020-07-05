$( document ).ready( onReady );

function onReady() {
    // AUDRY do button events
    // $( '#addBirdButton' ).on( 'click', addBird );
    // $( '#birdsOut' ).on( 'click', '.deleteBirdButton', deleteBird );
    getTodos();
}

// GET all
function getTodos() {
    $.ajax({
        type: 'GET',
        url: '/todos'
    }).then( function( response ){
        console.log( 'sucessed GET: ' + response );
    }).catch( function( err ) {
        console.log( 'GET failed: ' + err );
    })
}

// CREATE

// UPDATE

// DELTE