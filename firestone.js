// handles all the firestore stuff
// add, get, delete todos from firestore

function addTodoToFirestore(text) {
  return db.collection("todos").add({
    text: text,
    completed: false,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(function(docRef) {
    // also mirror it to realtime db for live sync
    syncToRealtimeDB(docRef.id, text, false);
  })
  .catch(function(err) {
    console.error("error adding todo:", err);
  });
}

function deleteTodoFromFirestore(id) {
  return db.collection("todos").doc(id).delete()
  .then(function() {
    // remove from realtime db too
    removeFromRealtimeDB(id);
  })
  .catch(function(err) {
    console.error("error deleting todo:", err);
  });
}

function toggleTodoComplete(id, currentStatus) {
  return db.collection("todos").doc(id).update({
    completed: !currentStatus
  })
  .catch(function(err) {
    console.error("couldnt update todo:", err);
  });
}
