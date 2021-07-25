// React
import React, { Component } from 'react';
import { StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native';

// Models
import { POISearchRequest } from '../models/request/search/POISearchRequest';
import { POISearchResponse } from '../models/response/search/POISearchResponse';

// Constants
import { poiSearchParameters } from '../../StaticConfig';

export class POIService{
    public returnSearchResults(): string[] {
        var searchResultsReturned: string[];

        searchResultsReturned = ["search result 1", "search result 2", "search result 3", "search result 4", "search result 5"]

        return searchResultsReturned;
    }

    public async getRemoteSearchResults(poiSearchRequest: POISearchRequest): Promise<any> {
        let poiRequestApiUrl: string;

        //create the request URL
        poiRequestApiUrl = poiSearchParameters.URL + poiSearchRequest.query + poiSearchParameters.queryStringPeriodSeparator + poiSearchRequest.ext + 
                        poiSearchParameters.queryStringQuestionmarkSeparator + poiSearchRequest.key + 
                        poiSearchParameters.queryStringParameterSeparator + poiSearchRequest.limit + 
                        poiSearchParameters.queryStringParameterSeparator + poiSearchRequest.latitude + 
                        poiSearchParameters.queryStringParameterSeparator + poiSearchRequest.longitude 

        //make a call to the end point
        let poiApiResponse: Response;
        poiApiResponse = await fetch(poiRequestApiUrl, {
            method: 'GET'
        });

        let retrievedPoiResults = await poiApiResponse.json();

        return retrievedPoiResults;
    }
}