$(document).ready(function() {
  var responseContainer = $('.js-shoper-response');
  var shopUrl = 'https://sklep320930.shoparena.pl'
  var apiKey;
  var requestUrl = shopUrl + '/webapi/rest/';
  var account = {
    login: 'admin',
    pass: '799f6507'
  }
  var accessToken;

  function getApiData() {
    var request = $.ajax({
      method: 'GET',
      url: requestUrl,
      dataType: 'json'
    });

    request.done(function(data) {
      $(responseContainer).html(data);
    });

    request.fail(function( jqXHR, textStatus ) {
      alert( "Request failed: " + textStatus );
    });
  }

  function getAccessToken() {
    var request = $.ajax({
      method: 'POST',
      url: requestUrl + 'auth',
      data: {
        client_id: account.login,
        client_secret: account.pass
      }
    });

    request.done(function(response) {
      accessToken = {
          accessToken: response.access_token,
          accessTokenType: response.token_type
        }
    });

    request.fail(function( jqXHR, textStatus ) {
      alert( "Request failed: " + textStatus );
      console.log(jqXHR);
    });
  }

  getAccessToken();
  setTimeout(function(){
    console.log(accessToken);
  }, 1000)
});
