(function (global) {

    // set up a namespace for utility
    var ajaxUtils = {};

    // Returns on http request object
    function getRequestObject() {
        if(window.XMLHttpRequest){
            return (new XMLHttpRequest());
        }else if (window.ActiveXObject){
            // For very old IE browsers (optional)
            return (new ActiveXObject("Microsoft.XMLHTTP"));
        }else {
            global.alert("Ajax is not supported")
            return (null);
        }
    }


    // make an ajax get request to 'requestUrl'
    ajaxUtils.sendGetRequest =
    function(requestUrl, responseHandler, isJsonResponse) {
        var request = getRequestObject();
        request.onreadystatechange = 
        function () {
            handleResponse(request, 
                responseHandler,
                isJsonResponse);
        };
        request.open("GET", requestUrl, true);
        request.send(null);
    };

    // Only calls user provided 'responseHandler'
// function if response is ready
// and not an error

function handleResponse(request,
    responseHandler,
    isJsonResponse){
        if((request.readystate == 4) && 
        (request.satus == 200)) {

            // Default to isJsonResponse = true
            if(isJsonResponse == undefined){
                isJsonResponse = true;
            }
            if(isJsonResponse) {
                responseHandler(JSON.parse(requestResponseText));
            }else{
                responseHandler(request.responseText);
            }
        }
    }

    // Expose utility to the global object
    global.$ajaxUtils = ajaxUtils;

})(window);