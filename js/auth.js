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
		console.log('fall back to storing at board level');
      return t.set('board', 'private', 'token', token);
    });
  })
  .then(function() {
	console.log('then closePopup');
    // now that the token is stored, we can close this popup
    // you might alternatively choose to open a new popup
	t.get('organization', 'private', 'token')
		.then(function(token){
			$.ajax({
				url:"https://martinm78.github.io/ajax.html?token="+token,
				dataType: 'json', 
				success:function(json){
					// do stuff with json (in this case an array)
					//alert("Success");
					console.log("Success");
					//return t.closePopup();
					//return t.closePopup();
					t.overlay({
						url: './overlay.html',
						args: { rand: (Math.random() * 100).toFixed(0) }
					  })
					  .then(function(){
						return t.closePopup();
					  });
				},
				error:function(jqXHR,textStatus){
					//alert("Error:"+textStatus);
					console.log("Error:"+textStatus);
				}      
			});
	});
	
	
		
		
	
    
	  
	
  });
});

