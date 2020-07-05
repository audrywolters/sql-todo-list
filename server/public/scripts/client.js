$( document ).ready( onReady );

function onReady() {
    // register clicks
    $( '#addTodoButton' ).on( 'click', addTodo );
    $( '#todosDisplay' ).on( 'click', '.deleteTodoButton', deleteTodo );

    // need 'completed' event

    // and always get all items
    getTodos();
}

// get everbody in the table
function getTodos() {
    $.ajax({
        type: 'GET',
        url: '/todos'
    }).then( function( response ){
        // find the element in which to display the todos
        let tableBody = $( '#todosDisplay' );

        // we're going to have to wipe everything out
        tableBody.empty();

        // and reprint each eachtime
        // AUDRY - how the f are we going to check a checkbox by bool value?
        // css pseudo - can i do that?
        // we're going to have to hack it some how
        for ( let row of response ) {
            tableBody.append( 
                `<tr>
                    <td>${ row.task }</td>
                    <td>${ row.completed }</td>
                    <td>
                        <button class="deleteTodoButton" data-id=${ row.id }>x</button>
                    </td>
                 </tr>`
            )    
        }
    }).catch( function( err ) {
        console.log( 'GET failed: ' + err );
    })
}

// insert
function addTodo() {
    // prepare the input as an object DB will understand
    const todoToSend = {
        task: $( '#taskIn' ).val()
        // a new task has the default state of NOT completed
        // don't worry about sending it
    }

    // make input blank so user can start anew
    $( '#taskIn' ).val( '' );

    // send it to server so it can talk to DB about it
    $.ajax({
        type: 'POST',
        url: '/todos',
        data: todoToSend
    }).then( function( response ) {
        getTodos();
    }).catch( function( err ) {
        console.log( 'add failure!!! '  + err );
    })
}

// delete
function deleteTodo() {

    $.ajax({
        type: "DELETE",
        url: '/todos/' + $( this ).data( 'id' )
    }).then( function( response ) {
        getTodos();
    }).catch( function( err ) {
        console.log( 'delete failure!!! '  + err );
    })
    
}
