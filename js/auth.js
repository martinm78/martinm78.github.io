var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

//var oauthUrl = 'https://trello.com/1/authorize?expiration=never' +
//  '&name=[APPNAME]&scope=read&key=[APIKEY]&callback_method=fragment' +
//  '&return_url=[RETURNURL]';
  
  var oauthUrl = 'https://martinm78.github.io/loginFromTrello.html';
  
  
  

var tokenLooksValid = function(token) {
  //return /^[0-9a-f]{64}$/.test(token);
  return true;
}

var authorizeOpts = {
  height: 680,
  width: 580,
  validToken: tokenLooksValid
};

var authBtn = document.getElementById('authorize');

authBtn.addEventListener('click', function() {
	
  t.authorize(oauthUrl, authorizeOpts)
  .then(function(token) {
	console.log('then token:' + token);
    return t.set('organization', 'private', 'token', token)
    .catch(t.NotHandled, function() {
      // fall back to storing at board level
      return t.set('board', 'private', 'token', token);
    });
  })
  .then(function() {
	console.log('then closePopup');
    // now that the token is stored, we can close this popup
    // you might alternatively choose to open a new popup
		console.log(this.token);
	$.ajax({
		
		url:"https://martinm78.github.io/ajax.html?token="+t.get('board', 'private', 'token'),
		dataType: 'json', 
		success:function(json){
			// do stuff with json (in this case an array)
			alert("Success");
		},
		error:function(jqXHR,textStatus){
			alert("Error:"+textStatus);
		}      
	});
    
	  
	//return t.closePopup();
  });
});

