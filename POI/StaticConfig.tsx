export const minSearchlength = 3;

export const standardErrors = {
    minSearchlengthError: "Please enter at least the following number of characters in your search: "
};

export const poiSearchParameters = {
    URL: "https://api.tomtom.com/search/2/poiSearch/",
    ext: "json",
    key: "key=yourkey",
    queryStringPeriodSeparator: ".",
    queryStringQuestionmarkSeparator: "?",
    queryStringParameterSeparator: "&",
    optionalParametersDefaultValues: {
        limit: "limit=5",
        latlon: {
            lat: "lat=37.337",
            lon: "lon=-1201.89"
        }   
    },
    otherlatlonTestValues: {
        amsterdamlatlon: {
            lat: "lat=52.3467",
            lon: "lon=4.9220"
        },
        londonbigbenlatlon: {
            lat: "lat=51.5007",
            lon: "lon=0.1246"
        }
    }
};