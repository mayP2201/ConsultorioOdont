import { Text, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { Icon } from '@rneui/themed';
import { StyleSheet, Dimensions,StatusBar  } from 'react-native';
import { colors } from '../common/globalStyles';

const MenuButtons = (props) => {
    const { text, type, size, onPress, name } = props;
  
    return (
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={onPress}
      >
        <Icon
          name={name}
          type={type}
          style={styles.iconsMenu}
          size={size}
          color={colors.lightBlue}
        />
        <Text style={styles.txtMenu}>{text}</Text>
      </TouchableOpacity>
    );
  };
  
  export default MenuButtons;


const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        backgroundColor: colors.base,
        padding: 15,
        alignItems: "center",
        flexDirection: "row",
        borderWidth: 0.5,
        borderColor: colors.blue,
        height: Dimensions.get("window").height * (40 / 1000) + StatusBar.currentHeight,
    },
    iconsMenu: {
        width: Dimensions.get("window").width * (80 / 1000),
        height: Dimensions.get("window").height * (0.05 / 100) + StatusBar.currentHeight,
    },
    txtMenu: {
        marginStart: 25,
        fontSize: 14,
        color: colors.blue,
        fontWeight:'600'
    },
});