// React
import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';

// Services
import { POIService } from '../services/POIService'

// Constants
import { minSearchlength } from '../../StaticConfig';

// Components
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import SearchComponent from '../components/SearchComponent';

export default class MainScreen extends Component<{navigation?: any}, StateModel>
{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={localstyles.maincontainer}>
                <SearchComponent
                    placeholder="Look for a point of interest" 
                    minLength={minSearchlength} />
            </View>
        )
    }
}

const localstyles = StyleSheet.create({
    //views
    maincontainer: {
        backgroundColor: "#6699cc",
        alignItems: 'center',
        alignSelf: 'center',
        width: "90%",
        height: "90%"
    }
})