// JavaScript authentication file
$(function() {

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAl0iS2Ipn7UHX3V6vM6SgWzu_PcPelLC0",
      authDomain: "m13-e1.firebaseapp.com",
      databaseURL: "https://m13-e1.firebaseio.com",
      storageBucket: "m13-e1.appspot.com",
      messagingSenderId: "673310196974"
    };
    firebase.initializeApp(config);

    // Sign Up: Function to create account on firebase, then redirect to index.html
    var signUp = function() {
        // Get email, password, and display name
        var userEmail = $('#email').val();
        var userPassword = $('#password').val();
        var userDisplayName = $('#display-name').val();

        // Create user, then set the user's display name
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).
          then(function(user) {
            // Set display name
            user.updateProfile({
              displayName: userDisplayName
            }).then(function() {
              window.location = "./"
            });
          }).catch(function(error) {
            alert(error.message);
          });

    };

    // SignIn: Function to authenticate on Firebase, then redirect to index.html
    var signIn = function() {
        // Get email and password
        var userEmail = $('#email').val();
        var userPassword = $('#password').val();

        // Authenticate using email and password, then redirect
        firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
          .then(function() {
            // redirect here
            window.location = './';
          })
          .catch(function(error) {
            // Try again message, or something like that
            alert(error);
          });
    };

    // Sign out: Function to log a user out of firebase
    var signOut = function() {
        // Sign out, then redirect
        firebase.auth().signOut().then(function() {
          window.location = './sign-up.html';
        });
    };

    // Assign event lister to form submission
    $('form').on('submit', function() {
      event.preventDefault();

      var formId  = $(this).attr('id');
      if (formId == 'sign-up') {
        signUp();
      } else if (formId == 'sign-in') {
        signIn();
      }
    });


    // Assign click event to logout button
    $('#log-out').on('click', function() {
      signOut();
    });


    // Authentication Change: see if a user is already signed in, and redirect
    var checked;
    firebase.auth().onAuthStateChanged(function(user) {
      if (checked == true) {
        // Rediriect to index.html if there is a user and the pathname isn't '/'
        if (user && window.location.pathname.indexOf("sign") != -1) {
          window.location = "./";
        }

        // Redirect to sign-in if there is NOT a user and the pathname IS '/'
        if (!user && window.location.pathname.indexOf("sign") == -1) {
          window.location = './sign-in.html';
        }
      }
    });


});
