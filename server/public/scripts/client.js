// AUDRY - fun stuff to try
// - move completed tasks to bottom
// - don't allow user to add empty task
// - confirm delete


$( document ).ready( onReady );

function onReady() {
    // register clicks
    $( '#addTodoButton' ).on( 'click', addTodo );
    $( '#todosDisplay' ).on( 'click', '.deleteTodoButton', deleteTodo );
    $( '#todosDisplay' ).on( 'click', '.completeTodoCheckbox', completeTodo );

    // and always get all items
    getTodos();
} // onReady END


// throw everybody into the table
function getTodos() {
    $.ajax({
        type: 'GET',
        url: '/todos'
    }).then( function( response ){

    // show the user their stuff
    displayTodos( response );

    }).catch( function( err ) {
        console.log( 'GET failed: ' + err );
    })
} // getTodos END


function displayTodos( response ) {        
    // find the element in which to display the todos
    let tableBody = $( '#todosDisplay' );

    // we're going to have to wipe everything out
    tableBody.empty();

    // and reprint everything
    for ( let row of response ) {
        tableBody.append( 
            `<tr>
                <td>${ row.task }</td>
                <td>
                    <input class="completeTodoCheckbox" data-id="${ row.id }" id="${ row.id }" type="checkbox" />
                </td>
                <td>
                    <button class="deleteTodoButton" data-id=${ row.id }>x</button>
                </td>
                </tr>`
        )

        // check/uncheck the checkbox based on its 'completed' status
        let checkbox = $( `#${ row.id }.completeTodoCheckbox` )
        checkbox.prop( 'checked', row.completed );

        // do css work to checked rows
        dimCompletedTodos( checkbox );
    }
} // displayTodos END


function dimCompletedTodos( checkbox ) {
    // scoot up to the parent row
    let row = checkbox.closest( 'tr' );

    // let's help the user see what they've completed
    if ( checkbox.is( ':checked' ) ) {
        row.css( 'background-color', 'orange' );
    } else {
        row.css( 'background-color', 'gray' );
    }
} // dimCompletedTodos END


// insert
function addTodo() {
    // prepare the input as an object DB will understand
    // a new task has the default state of NOT completed
    // don't worry about sending it
    const todoToSend = {
        task: $( '#taskIn' ).val()
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
} // insert END


// remove
function deleteTodo() {

    $.ajax({
        type: 'DELETE',
        url: '/todos/' + $( this ).data( 'id' )
    }).then( function( response ) {
        getTodos();
    }).catch( function( err ) {
        console.log( 'delete failure!!! '  + err );
    })
} // delete END


// complete/uncomplete a.k.a. update
function completeTodo() {
    // prepare the input as an object DB will understand
    const todoToSend = {
        completed: this.checked
    }

    $.ajax({
        type: 'PUT',
        url: '/todos/' + $( this ).data( 'id' ),
        data: todoToSend
    }).then( function( response ) {
        getTodos();
    }).catch( function( err ) {
        console.log( 'update failure!!! '  + err );
    })
} // complete todo/update END
