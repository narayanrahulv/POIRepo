// React
import React, { Component } from 'react';
import { StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native';

// Models
import { POISearchRequest } from '../models/request/search/POISearchRequest';
import { POISearchResponse } from '../models/response/search/POISearchResponse';

// Constants
import { poiSearchParameters } from '../../StaticConfig';

export class POIService {
    public async retrieveSearchResults(poiSearchRequest: POISearchRequest): Promise<any> {
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

        if (!poiApiResponse.ok)
            return poiApiResponse;
        
        let retrievedPoiResults = await poiApiResponse.json();

        return retrievedPoiResults;
    }
}