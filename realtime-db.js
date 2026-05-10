// realtime database stuff
// this is what keeps everything in sync across users

function syncToRealtimeDB(id, text, completed) {
  rtdb.ref("todos/" + id).set({
    text: text,
    completed: completed
  })
  .catch(function(err) {
    console.error("rtdb sync error:", err);
  });
}

function removeFromRealtimeDB(id) {
  rtdb.ref("todos/" + id).remove()
  .catch(function(err) {
    console.error("rtdb remove error:", err);
  });
}

// this is the main listener - watches for any changes
// and updates the UI straight away for all users
function listenForChanges() {
  rtdb.ref("todos").on("value", function(snapshot) {
    var data = snapshot.val();

    // clear the list first
    var list = document.getElementById("todoList");
    list.innerHTML = "";

    if (!data) return; // nothing there yet

    // loop through and render each todo
    Object.keys(data).forEach(function(id) {
      var todo = data[id];
      renderTodo(id, todo.text, todo.completed);
    });
  });
}
