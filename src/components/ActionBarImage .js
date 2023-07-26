import React, { Component } from 'react';
import { View, Image, Dimensions, StatusBar, } from 'react-native';

class ActionBarImage extends Component {
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Image source={require('../../assets/logo.png')}
                    style={{
                        width: Dimensions.get("window").width * (120 / 1000),
                        height: Dimensions.get("window").height * (5/ 1000) + StatusBar.currentHeight,
                        marginRight:'5%'
                    }}
                />
            </View>
        );
    }
}

export { ActionBarImage };