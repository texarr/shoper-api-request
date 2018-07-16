$(document).ready(function() {
  var responseContainer = $('.js-shoper-response');
  var shopUrl = 'https://sklep320930.shoparena.pl'
  var apiKey;
  var requestUrl = shopUrl + '/webapi/rest/';
  var account = {
    login: 'admin',
    pass: '799f6507'
  }
  var accessToken = {};

  responseContainer.html('<div class="col-6 offset-3">text message</div>');

  getApiData();

  function getApiData() {


      setTimeout(function(){
        getAccessToken();
        console.log('getting token');
        console.log(accessToken.accessToken);
      }, 200);






    // var request = $.ajax({
    //   method: 'GET',
    //   url: requestUrl,
    //   dataType: 'json'
    // });
    //
    // request.done(function(data) {
    //   responseContainer.html(data);
    // });
    //
    // request.fail(function( jqXHR, textStatus ) {
    //   alert( "Request failed: " + textStatus );
    // });
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

  // setTimeout(function(){
  //   console.log(accessToken);
  // }, 1000);
});
