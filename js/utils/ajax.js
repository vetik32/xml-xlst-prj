
var Ajax = (function () {
  return {
    get: function (url, callback) {

      var request;

      // Create a request object. Try Mozilla / Safari method first.
      if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();

        // If that doesn't work, try IE methods.
      } else if (window.ActiveXObject) {
        try {
          request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e1) {
          try {
            request = new ActiveXObject("Microsoft.XMLHTTP");
          } catch (e2) {
          }
        }
      }

      // If we couldn't make one, abort.
      if (!request) {
        window.alert("No ajax support.");
        return false;
      }

      // Upon completion of the request, execute the callback.
      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          if (request.status === 200) {
            callback(request.responseXML);
          } else {
            window.alert("Could not load " + url);
          }
        }
      };

      request.open("GET", url);
      request.send();
    }
  }
})();
