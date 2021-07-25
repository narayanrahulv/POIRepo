// React
import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';

// Services
import { POIService } from '../services/POIService'

// Models
import { POISearchRequest } from '../models/request/search/POISearchRequest';
import { POISearchResponse } from '../models/response/search/POISearchResponse';
import { POIEntity } from '../models/response/general/POIEntity';
import { POIAddressEntity } from '../models/response/general/POIAddressEntity';

// Constants
import { standardErrors, poiSearchParameters } from '../../StaticConfig';

export default class SearchComponent extends Component<{navigation?: any}, PropsModel, StateModel> {
    constructor(props) {
        super(props);

        this.state = {
            userEnteredQuery: "",
            poiSearchResultsDisplayed: [],
            isError: false,
            errorText: ""
        };
    }

    //variable definitions
    private poiService = new POIService();
    private poiSearchRequest: POISearchRequest = {
        query: '',
        ext: '',
        key: ''
    };
    private poiSearchResultsDisplayed = [];

    onQueryChanged = (text: string) => {
        if(text.length < this.props.minLength){
            //if the user hasn't entered the minimum number of characters for the search, present an error alerts
            this.setState({
                isError: true,
                errorText: standardErrors.minSearchlengthError + " " + this.props.minLength
            });
        }
        else {
            //else, hide any previously shown error messages and save user entered query into state
            this.setState({
                userEnteredQuery: text,
                isError: false,
                errorText: ""
            });
        }
    }

    onGoBtnClick = () => {
        //build the POI search request using static config values
        this.poiSearchRequest.query = this.state.userEnteredQuery;
        this.poiSearchRequest.ext = poiSearchParameters.ext;
        this.poiSearchRequest.key = poiSearchParameters.key;
        this.poiSearchRequest.limit = poiSearchParameters.optionalParametersDefaultValues.limit;
        this.poiSearchRequest.latitude = poiSearchParameters.optionalParametersDefaultValues.latlon.lat;
        this.poiSearchRequest.longitude = poiSearchParameters.optionalParametersDefaultValues.latlon.lon;

        this.getPOIs(this.poiSearchRequest);
    }

    getPOIs = async (poiSearchRequest: POISearchRequest) => {
        this.poiSearchResultsDisplayed = []; //reset any previous search results

        //perform POI search using POIService class
        let poiSearchResultsRetrieved = [];

        try {
            poiSearchResultsRetrieved = await this.poiService.retrieveSearchResults(poiSearchRequest);

            for (let s = 0; s < poiSearchResultsRetrieved.results.length; s++) {
                let poiEntity: POIEntity = { name: "", categories: [] };
                let poiAddressEntity: POIAddressEntity = { freeformAddress: "" };
                let displayedPoi: POISearchResponse = { id: "", dist: 0, score: 0, poiDetails: poiEntity, poiAddress: poiAddressEntity };
    
                displayedPoi.id = poiSearchResultsRetrieved.results[s].id;
                displayedPoi.dist = Math.round(poiSearchResultsRetrieved.results[s].dist * 100) / 100;
                displayedPoi.score = Math.round(poiSearchResultsRetrieved.results[s].score * 100) / 100;
                displayedPoi.poiDetails.name = poiSearchResultsRetrieved.results[s].poi.name;
                displayedPoi.poiDetails.categories = poiSearchResultsRetrieved.results[s].poi.categories;
                displayedPoi.poiAddress.freeformAddress = poiSearchResultsRetrieved.results[s].address.freeformAddress;
    
                this.poiSearchResultsDisplayed.push(displayedPoi);
            }
    
            //save this.poiSearchResultsDisplayed to state
            this.setState({
                poiSearchResultsDisplayed: this.poiSearchResultsDisplayed
            });
        }
        catch (e) {
            this.setState({
                isError: true,
                errorText: "something went wrong while processing your request"
            });
        }
    }

    render() {
        return(
            <ScrollView style={localstyles.maincontainer}>
                <View style={localstyles.inputcontainer}>
                    <TextInput 
                        style={localstyles.inputfield} 
                        placeholder={this.props.placeholder}
                        onChangeText={(text) => this.onQueryChanged(text)}>
                    </TextInput>
                </View>
                <View style={localstyles.buttoncontainer}>
                    <TouchableOpacity style={localstyles.button} onPress={this.onGoBtnClick}>
                        <Text>Go !</Text>
                    </TouchableOpacity>
                </View>

                {/* display an error when user hasn't entered the this.props.minLength or if there was an issue communicating with the API */}
                {
                    this.state.isError && 
                    <View style={localstyles.errorcontainer}>
                        <Text style={localstyles.errors}>{this.state.errorText}</Text>
                    </View>
                }

                {/* if all validation passes, display search results */}
                {
                    this.state.poiSearchResultsDisplayed.map(result => {
                        return(
                            <View key={result.id} style={localstyles.searchresultscontainer}>
                                <View>
                                    <Text style={localstyles.label}>POI name: </Text>
                                </View>
                                <View>
                                    <Text>{result.poiDetails.name}</Text>
                                </View>
                                <View>
                                    <Text style={localstyles.label}>POI categories: </Text>
                                </View>
                                {
                                    result.poiDetails.categories.map(category => {
                                        return(
                                            <View>
                                                <Text>{category + ","}</Text>
                                            </View>
                                        )
                                    })
                                }
                                <View>
                                    <Text style={localstyles.label}>POI address: </Text>
                                </View>
                                <View>
                                    <Text>{result.poiAddress.freeformAddress}</Text>
                                </View>
                                <View>
                                    <Text style={localstyles.label}>POI distance (meters): </Text>
                                </View>
                                <View>
                                    <Text>{result.dist}</Text>
                                </View>
                                <View>
                                    <Text style={localstyles.label}>POI score: </Text>
                                </View>
                                <View>
                                    <Text>{result.score}</Text>
                                </View>
                            </View>
                        );
                    })
                }
            </ScrollView>
        );
    }
}

interface PropsModel {
    minLength?: number,
    placeholder?: string
}

interface StateModel {
    userEnteredQuery: string;
    poiSearchResultsDisplayed: POISearchResponse[]
    isError: boolean;
    errorText: string;
}

const localstyles = StyleSheet.create({
    //views
    maincontainer: {
        width: "100%",
        height: "100%"
    },

    inputcontainer: {
        marginTop: 20,
        backgroundColor: "#ADD8E6",
        color: "#000000",
        borderRadius: 3,
        borderWidth: 1,
        width: "80%",
        alignItems: 'center',
        alignSelf: 'center'
    },

    buttoncontainer: {
        marginTop: 20,
        alignItems: 'center',
        alignSelf: 'center'
    },

    errorcontainer: {
        marginTop: 10,
        width: "80%",
        alignItems: 'center',
        alignSelf: 'center'
    },

    searchresultscontainer: {
        marginTop: 20,
        width: "80%",
        alignSelf: 'center'
    },

    //controls
    inputfield: {
        color: "#000000"
    },

    button: {
        minWidth: 62,
        borderRadius: 20,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#d3d3d3"
    },

    //text
    errors: {
        color: "#FF0000"
    },

    label: {
        color: "#800000"
    }
})