import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { FAB } from '@rneui/themed';
import { colors } from '../common/globalStyles';


const ReturnButton = ({ onPress }) => {
    return (
        <View style={{ flex: 1, position: 'relative'}}>
            <FAB
                icon={{ name: 'reply', type:'entypo', color: 'white' }}
                color={colors.blue}
                onPress={onPress}
                placement="right"
                style={styles.fab}
                
            />
        </View>
    );
}

const styles = StyleSheet.create({
    fab: {
        backgroundColor:'yellow',
        position:'absolute',
        //marginBottom:'5%'
    },

})

export default ReturnButton;
