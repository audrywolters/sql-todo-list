$( document ).ready( onReady );

function onReady() {
    // register clicks
    $( '#addTodoButton' ).on( 'click', addTodo );
    $( '#todosDisplay' ).on( 'click', '.deleteTodoButton', deleteTodo );
    $( '#todosDisplay' ).on( 'click', '.completeTodoCheckbox', completeTodo );

    // and always get all items
    getTodos();
}

// throw everybody into the table
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
        for (let i=0; i<response.length; i++) {

            let row = response[i];
            
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

            // set the current checkbox based on its 'completed' status
            $( `#${ row.id }.completeTodoCheckbox` ).prop( 'checked', row.completed );
        }
    }).catch( function( err ) {
        console.log( 'GET failed: ' + err );
    })
}

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
}

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
}

// complete/un
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
}
