
$( document ).ready( onReady );

function onReady() {
    // register clicks
    $( '#addTodoButton' ).on( 'click', addTodo );
    $( '#todosDisplay' ).on( 'click', '.deleteTodoButton', deleteTodo );
    $( '#todosDisplay' ).on( 'click', '.completeTodoCheckbox', completeTodo );

    // don't allow any blank/empty tasks to be created
    $('#addTodoButton').prop( 'disabled' , true );
    $( '#taskIn' ).keyup( function() {
        $('#addTodoButton').prop( 'disabled', this.value == "" ? true : false );     
    })

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
                <td>
                    <button class="deleteTodoButton" data-id=${ row.id } title="Delete Task">X</button>
                </td>
                <td class="taskCell">${ row.task }</td>
                <td>
                    <input class="completeTodoCheckbox" data-id="${ row.id }" id="${ row.id }" title="Done-zo!" type="checkbox" />
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
    // scoot up and grab the parent row
    let row = checkbox.closest( 'tr' );

    // let's help the user see what they've completed
    if ( checkbox.is( ':checked' ) ) {
        row.css( 'background-color', 'lightgray' );
        row.css( 'color', 'gray' );
    } else {
        row.css( 'background-color', '#5ecab6' );
        row.css( 'color', '#444' );
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

    let deleteDecision = confirm( 'You sure you want to delete this guy?' );
    if ( !deleteDecision ) {
        return;
    }

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
