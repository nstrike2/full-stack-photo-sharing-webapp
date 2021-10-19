var Promise = require("Promise");

/**
  * FetchModel - Fetch a model from the web server.
  *     url - string - The URL to issue the GET request.
  * Returns: a Promise that should be filled
  * with the response of the GET request parsed
  * as a JSON object and returned in the property
  * named "data" of an object.
  * If the requests has an error the promise should be
  * rejected with an object contain the properties:
  *    status:  The HTTP response status
  *    statusText:  The statusText from the xhr request
  *
*/


function fetchModel(url) {
  return new Promise(function (resolve, reject) {
    console.log("URL TEST", url);
    setTimeout(() => reject({ status: 501, statusText: "Not Implemented" }), 0);
    // On Success return:
    // resolve({data: getResponseObject});
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);//param open -> (resquestType, src, asynchronous or not?)
    xhr.send();
    xhr.onreadystatechange = function () {//event handler -- whenever ready state changes, fnc called
      if (this.readyState === 4 && this.status === 200) {//200 successful,4 done laoding 
        let jsonObj = JSON.parse(this.responseText);
        console.log("inside fetchModel\n",this.responseText);
        return resolve(jsonObj);
      }
     xhr.onerror = function(err){
      reject({status: this.status, statusText: "Error"});

     }
    };
    
  });
}

export default fetchModel;
