var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

//var oauthUrl = 'https://trello.com/1/authorize?expiration=never' +
//  '&name=[APPNAME]&scope=read&key=[APIKEY]&callback_method=fragment' +
//  '&return_url=[RETURNURL]';
  
  var oauthUrl = 'http://webexport.com.ar/lavacaclub/be/public/login';
  
  
  

var tokenLooksValid = function(token) {
  return /^[0-9a-f]{64}$/.test(token);
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
    return t.set('organization', 'private', 'token', token)
    .catch(t.NotHandled, function() {
      // fall back to storing at board level
      return t.set('board', 'private', 'token', token);
    });
  })
  .then(function() {
    // now that the token is stored, we can close this popup
    // you might alternatively choose to open a new popup
    return t.closePopup();
  });
});

