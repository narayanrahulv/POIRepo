export function displayedErrorMessage(statusCode: number): string {
    //note: in a production app, maybe we'll also log these errors somewhere
    let returnedErrorMessage: string;

    switch(statusCode) {
        case 400:
            returnedErrorMessage = "Bad Request: One or more parameters were incorrectly specified. Check the values that you're passing to the POI search.";
            break;
        case 403:
            returnedErrorMessage = "Forbidden: Ensure that your API key is correct.";   //for a normal user this error would be replaced with something else more relevant
            break;
        case 405:
            returnedErrorMessage = "Method Not Allowed: The HTTP Request method (GET) is not supported for this Request.";
            break;
        case 429:
            returnedErrorMessage = "Too Many Requests: The API key is over QPS (Queries per second).";
            break;
        default:
            returnedErrorMessage = "Something went wrong while retrieving POI data.";
    }

    return returnedErrorMessage;
}