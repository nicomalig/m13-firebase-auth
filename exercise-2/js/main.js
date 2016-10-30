$(function() {
	// Set the config object with the values for your application
	var config = {
    apiKey: "AIzaSyCVmFkJLhdPzdUw8_avijSg7ulfLUkASjo",
    authDomain: "m13-e2.firebaseapp.com",
    databaseURL: "https://m13-e2.firebaseio.com",
    storageBucket: "m13-e2.appspot.com",
    messagingSenderId: "347930206303"
  };
	firebase.initializeApp(config);

	// Initialize your 'users' firebase reference
	var userRef = firebase.database().ref("users");

	// Checks to see if a user is already signed in and if so redirects
	// to users.html
	var user = firebase.auth().currentUser;
	if (user) {
		window.location = "./views/user.html"
	}

	var authFunc = function(service) {
		// Check to see if the service is google or github and set
		// provider accordingly (more info on login with 3rd party
		// providers can be found in the firebase documentation).
		var provider;
		if (service == "google") {
			provider = new firebase.auth.GoogleAuthProvider();
		} else if (service == "github") {
			provider = new firebase.auth.GithubAuthProvider();
		}
		// Sign into firebase using the correct provider
		firebase.auth().signInWithPopup(provider).then(function(result) {
			// Log the user result to the console to see what a user object
			// looks like
			console.log(result);

			// Check to see if we have already saved a user with this id
			// to our users ref
			userRef.child(result.user.uid).once("value", function(snapshot) {
				// If there is no user with this id, make a new object with
				// this user's id and set its name and photoURL and add it as
				// a child to your user ref
				var data = snapshot.val();
				if (data === null) {
					userRef.child(result.user.uid).set({
						"name": result.user.displayName,
						"photoURL": result.user.photoURL
					}).then(function() {
						// Navigate to the user.html page once sign in is complete
						window.location = ".views/user.html"
					});
				} else {
					window.location = "./views/user.html"
				}
			})
		})
	}

	$("#google-signin").on("click", function() {
		authFunc("google");
	});

	$("#github-signin").on("click", function() {
		authFunc("github");
	});
});
