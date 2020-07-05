$( document ).ready( onReady );

function onReady() {
    // register clicks
    $( '#addTodoButton' ).on( 'click', addTodo );
    $( '#todosDisplay' ).on( 'click', '.deleteTodoButton', deleteTodo );

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
                        <button class="deleteTodoButton">x</button>
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
    console.log( 'add todo!');
}

// delete
function deleteTodo() {
    console.log( 'delete!' );
}