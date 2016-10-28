// JavaScript file

$(function() {
    // Chats reference
    var chats = firebase.database().ref('chats');

    // Listen for children being added:fired once on load, then each time a child is added
    chats.on('child_added', function(snapshot) {
      var data = snapshot.val();

      renderChat (snapshot.key, data);
    });


    // Function to render each chat
    var renderChat = function(id, data) {
        // Build appropriate DOM elements and add them to the DOM
        var newChat = $('<div>');
        var name = $('<span>').addClass('user').text(data.name + ': ');
        var message = $("<span>").text(data.chat);

        newChat.append(name);
        newChat.append(message);
        $('#chat-box').append(newChat);
    };


    // Assign event listener to the chat button
    $('#chat-button').on('click', function() {
      // Push in a new element to the chats reference
      chats.push({
        name: firebase.auth().currentUser.displayName,
        chat: $("#message").val()
      });
      $('#message').val('');
    });


});
