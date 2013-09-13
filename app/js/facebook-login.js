// window.fbAsyncInit = function() {
//   FB.init({
//     appId      : '235979013222853',
//     channelUrl : '//dutee.herokuapp.com/channel.html',
//     status     : true, // check login status
//     cookie     : true // enable cookies to allow the server to access the session
//   });
// };

// // Load the SDK asynchronously
// (function(d){
//  var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
//  if (d.getElementById(id)) {return;}
//  js = d.createElement('script'); js.id = id; js.async = true;
//  js.src = "//connect.facebook.net/en_US/all.js";
//  ref.parentNode.insertBefore(js, ref);
// }(document));


// var facebookButton = document.getElementById("facebook-login");

// facebookButton.addEventListener('click', function(){
//   FB.login(function(response){
//       if(response.authResponse){
//           console.log('Welcome!');
//           // access_token = response.authResponse.accessToken;
//           // user_id = response.authResponse.userID;

//           FB.api('/me', function(response) {
//             // console.log(response);
//             // user_email = response.email;
//           });

//       }
//       else{
//         console.log('User cancelled login or did not fully authorize.');
//       }
//   },
//   {
//     scope: 'email'
//   });
// });
