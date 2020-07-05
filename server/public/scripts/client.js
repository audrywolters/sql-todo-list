$( document ).ready( onReady );

function onReady() {
    // AUDRY do button events
    // $( '#addBirdButton' ).on( 'click', addBird );
    // $( '#birdsOut' ).on( 'click', '.deleteBirdButton', deleteBird );
    getTodos();
}

// let todos = [];

// GET all
function getTodos() {
    $.ajax({
        type: 'GET',
        url: '/todos'
    }).then( function( response ){
        // find the element in which to display the todos
        let tableBody = $( '#todosDisplay' );

        // we're going to have to wipe everything out
        tableBody.empty();

        // AUDRY - why did he do this?
        // hold response in a global
        //todos = response;
 
        // we're going to have to reprint everything each time
        // AUDRY - how the f are we going to check a checkbox by bool value?
        // css pseudo - can i do that?
        for ( let row of response ) {
            tableBody.append( 
                `<tr>
                    <td>${ row.task }</td>
                    <td>${ row.completed }</td>
                    <button>Delete</button>
                 </tr>`
            )    
        }
    }).catch( function( err ) {
        console.log( 'GET failed: ' + err );
    })
}

// CREATE

// UPDATE

// DELTE