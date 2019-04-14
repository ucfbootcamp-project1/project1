$(function () {
    $("#modal").modal('show');
});

$('.menu-link').click(function(){ 
    $('.collapse').hide();
});
$('.navbar-toggler').click(function(){ 
    $('.collapse').show();
});

$("#modalSubmit").click(function(){ 
            console.log("clicky");
});    
// Firebase authentication starts here
  var config = {
    apiKey: "AIzaSyD1z4ChJJE8vLLLZ7MJYYoltlNrlTbzWjM",
    authDomain: "explore-earth.firebaseapp.com",
    databaseURL: "https://explore-earth.firebaseio.com",
    projectId: "explore-earth",
    storageBucket: "",
    messagingSenderId: "906400318574"
  };
  firebase.initializeApp(config);

    /**
     * Function called when clicking the Login/Logout button.
     */
    // [START buttoncallback]
    function toggleSignIn() {
      if (!firebase.auth().currentUser) {
        // [START createprovider]
        console.log("something");
        var provider = new firebase.auth.GoogleAuthProvider();
        // [END createprovider]
        // [START addscopes]
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        // [END addscopes]
        // [START signin]
        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
//           var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // [START_EXCLUDE]
//           document.getElementById('quickstart-oauthtoken').textContent = token;
          // [END_EXCLUDE]
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // [START_EXCLUDE]
          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');
            // If you are using multiple auth providers on your app you should handle linking
            // the user's accounts here.
          } else {
            console.error(error);
          }
          // [END_EXCLUDE]
        });
        // [END signin]
      } else {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      }
      // [START_EXCLUDE]
//       document.getElementById('quickstart-sign-in').disabled = true;
      // [END_EXCLUDE]
    }
    // [END buttoncallback]
    /**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     */
    function initApp() {
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
            var photoURL = $("<img>");
            $("#user-avatar").append(photoURL);
            $("#user-avatar").attr("src","user.photoURL");
            
//           var email = user.email;
//           var emailVerified = user.emailVerified;
//           var photoURL = user.photoURL;
//           var isAnonymous = user.isAnonymous;
//           var uid = user.uid;
//           var providerData = user.providerData;
          // [START_EXCLUDE]
//           document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
//           document.getElementById('quickstart-sign-in').textContent = 'Sign out';
//           document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
          // [END_EXCLUDE]
        } else {
          // User is signed out.
          // [START_EXCLUDE]
          $("#user-avatar").hide;
          // [END_EXCLUDE]
        }
//         // [START_EXCLUDE]
        document.getElementById('modalSubmit').addEventListener('click', toggleSignIn);
        console.log("test");
    });
        
    window.onload = function() {
      initApp();
    }}
