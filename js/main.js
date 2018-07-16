$(document).ready(function() {
  var responseContainer = $('.js-shoper-response');
  var shopUrl = 'https://sklep320930.shoparena.pl'
  var requestUrl = shopUrl + '/webapi/rest/';
  var account = {
    login: 'admin',
    pass: '799f6507'
  };
  var accessToken = {};

  responseContainer.html('<div class="col-6 offset-3">text message</div>');

  getApiData();

  function getApiData() {
    var getData;

    // trying to get access token for 10 seconds
    getAccessToken();

    (function waitForElement() {
        if(typeof accessToken.accessToken !== "undefined"){
            //variable exists, do what you want
            console.log(accessToken);

            getData = $.ajax({
                method: 'GET',
                url: requestUrl + 'categories',
                dataType: 'json',
                async: false,
                username: account.login,
                password: account.pass,
                headers: {
                  "Authorization": accessToken.accessTokenType + ' ' + accessToken.accessToken
                }
            });

            getData.done(function(response) {
                console.log(response);
            });

            getData.fail(function(jqXHR, textStatus) {
                console.log(jqXHR);
            });
        }
        else{
            setTimeout(waitForElement, 250);
            console.log('waiting for auth key...');
        }
    }());
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
        };
    });

    request.fail(function( jqXHR, textStatus ) {
      alert( "Request failed: " + textStatus );
      console.log(jqXHR);
    });
  }
});
