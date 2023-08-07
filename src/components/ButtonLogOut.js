import { Text, StyleSheet, TouchableOpacity, Dimensions, } from 'react-native'
import React, { Component, useContext, useState } from 'react'
import { Icon } from '@rneui/themed';
import { colors } from '../common/globalStyles';
import { StatusBar } from 'react-native';
import { CContext } from '../context/CContext';
import axios from 'axios';
import ModalC from './ModalC';
import { View } from 'react-native';
import { useEffect } from "react";


const ButtonLogOut = (props) => {

  const { token, handleChangeToken, handleChangeuserDataContext, userDataContext, handleChangevisibleModal } = useContext(CContext);
  const { text, type, size, name, onPress } = props;
  const [message, setMessege] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  

  const logout = async () => {
    handleChangevisibleModal(true);
    try {
      const response = await axios.post(
        'https://endpointsco-production.up.railway.app/api/logout',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      handleChangeuserDataContext(null);
      handleChangevisibleModal(false);
      setMessege(response.data.message);
      setModalVisible(true);

    } catch (error) {
      console.log("error tomar citas", error);
    }
  };


  const buttonAceptModal = () => {
    onPress();
    setModalVisible(false);
  }

  return (
    <View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={logout}
      >
        <Text style={styles.text}>{text}</Text>
        <Icon
          name={name}
          type={type}
          style={styles.icons}
          size={size}
          color={colors.blue}
        />
      </TouchableOpacity>
      <ModalC
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onAccept={buttonAceptModal}
        modalText={message}
        showCancelButton={false}
        imageModal={require('../../assets/checked.png')}
        acceptButtonText="Aceptar"
      />
    </View>
  );
};

export default ButtonLogOut;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    backgroundColor: colors.silverBtnLogOut,
    marginTop: '160%',
    padding: 15,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: colors.blue,
    height: Dimensions.get("window").height * (40 / 1000) + StatusBar.currentHeight,
  },
  icons: {
    marginLeft: 60,
    width: Dimensions.get("window").width * (50 / 1000),
    height: Dimensions.get("window").height * (0.5 / 100) + StatusBar.currentHeight,
  },
  text: {
    fontSize: 14,
    color: colors.blue,
    fontWeight: '600',
  },
});

