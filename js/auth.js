var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

t.get('board', 'private', 'token')
	.then(function(token){
		
		return new 
			Promise(
				function(resolve, reject) {
					
					var tokenOk = false;
					var tokenMsg = '';

					if (token) {
						$.ajax({
							async:false,
							url:"https://martinm78.github.io/ajax2.html?isTokenOk="+token,
							dataType: 'json', 
							success:function(json){

								if (0 == json.status) {
									tokenOk = true;
								} else {
									tokenMsg = 'Invalid Token';
								}
							},
							error:function(jqXHR,textStatus){
								console.log("Error0:"+textStatus);
							}      
						});

					} else {
						tokenMsg = 'Token not found';
					} 
					
					
					if (tokenOk) {
						resolve('Token Ok!');
					} else {
						reject(tokenMsg);
					}

				}
			)
		;
		
	}).catch(function(msg){
		console.log(msg);
		$('#authorize').show();
	}).then(function(msg){
		console.log('yehe: ' + msg);
	
	});





var oauthUrl = 'https://martinm78.github.io/loginFromTrello.html';


var authorizeOpts = {
  height: 680,
  width: 580
};

var authBtn = document.getElementById('authorize');

authBtn.addEventListener('click', function() {
	
	t.authorize(oauthUrl, authorizeOpts)
	.then(function(token) {
	  console.log('then token:' + token);
	  return t.set('board', 'private', 'token', token)
	  .catch(t.NotHandled, function() {
		// fall back to storing at board level
		  console.log('Error. Fall back to storing at board level');
		//return t.set('board', 'private', 'token', token);
	  });
	})
	.then(function() {
		console.log('then closePopup');
		// now that the token is stored, we can close this popup
		// you might alternatively choose to open a new popup
		t.get('board', 'private', 'token')
			.then(function(token){
				$.ajax({
					url:"https://martinm78.github.io/ajax.html?token="+token,
					dataType: 'json', 
					success:function(json){
						// do stuff with json (in this case an array)
						console.log("Success");
						t.overlay({
							url: './overlay.html',
							args: { rand: (Math.random() * 100).toFixed(0) }
						  })
						  .then(function(){
							return t.closePopup();
						  });
					},
					error:function(jqXHR,textStatus){
						console.log("Error:"+textStatus);
					}      
				});
		});

	});

});

