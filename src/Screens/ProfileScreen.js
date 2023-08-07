import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Principal from '../components/Principal';
import { Image } from 'react-native-elements';
import { colors, commonStyles } from '../common/globalStyle';
import { Input } from '@rneui/base';
import { Icon, Button, Avatar } from '@rneui/themed';
import { ScrollView } from 'react-native-gesture-handler';
import { validateEmail1, validateLastName, validateName, validatePhone } from '../services/validations';
import { messages } from '../common/messages';
import { useContext } from 'react';
import { CContext } from '../context/CContext';
import { useEffect } from 'react';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import ModalC from '../components/ModalC';
import ReturnButton from '../components/ReturnButton';

const Profile = ({ navigation }) => {
    const [name, setName] = useState();
    const [errorName, setErrorName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errorLastName, setErrorLastName] = useState("");
    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [errorPhone, setErrorPhone] = useState("");
    const [id, setId] = useState("");
    const [errorId, setErrorId] = useState("");
    const [address, setAddress] = useState("");
    const [errorAddress, setErrorAddress] = useState("");
    const [errorImage, setErrorImage] = useState("");
    const [viewName, setViewName] = useState(false);
    const [editable, setEditable] = useState(false);
    const { token } = useContext(CContext);
    const [userData, setUserData] = useState([]);
    const [newAvatar, setNewAvatar] = useState("");
    const [imageName, setImageName] = useState("");
    const { userDataContext } = useContext(CContext);
    const [message, setMessege] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        viewData();
      }, []);
    const updateUserData = async () => {

        try {
            if (verify()) {
                const response = await axios.post(
                    'https://endpointsco-production.up.railway.app/api/update-user',
                    {
                        names: name,
                        surnames: lastName,
                        email: email,
                        phone: phone,
                        address: address,
                        profesional_descrption: "",
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                console.log("actualizacion de datos", response.data);
                // union de dos objetos el uno se sobre pone al otro 
                setUserData({ ...userData, ...{ names: name, surnames: lastName, email: email, phone: phone, address: address } });
                setMessege(response.data.message);
                setModalVisible(true);

            } else {
                console.log("datos erroneos")
            }
        } catch (error) {
            console.log(error);
        }
    };

    passwordVisibility = () => {
        setIconVisibility(!iconVisibility);
    }

    passwordVisibility1 = () => {
        setIconVisibility1(!iconVisibility1);
    }

    const verifyName = (name) => {
        if (validateName(name)) {
            setErrorName(null);
        }
        else {
            setErrorName(messages.INCORRECT_NAME);
        }
        setName(name);
    }

    const verifyLastName = (lastName) => {
        if (validateLastName(lastName)) {
            setErrorLastName(null);
        }
        else {
            setErrorLastName(messages.INCORRECT_LASTNAME);
        }
        setLastName(lastName);
    }

    const verifyEmail = (email) => {
        if (validateEmail1(email)) {
            setErrorEmail(null);
        }
        else {
            setErrorEmail(messages.EMAIL_INCORRECT);
        }
        setEmail(email);
    }

    const verifyPhone = (phone) => {
        if (validatePhone(phone)) {
            setErrorPhone(null);
        }
        else {
            setErrorPhone(messages.PHONE_INCORRECT);
        }
        setPhone(phone);
    }


    editBoton = () => {
        setViewName(!viewName);
        setEditable(!editable);
    }

    const verifyAdrees = (address) => {
        if (address.length <= 3) {
            setErrorAddress(messages.INCORRECT_ADDRESS);
        }
        else {
            setErrorAddress(null);
        }
        setAddress(address);
    }
    const verify = () => {

        if (name.trim() === "" && lastName.trim() === ""
            && email.trim() === ""
            && phone.trim() === "" && address.trim() === ""
        ) {
            console.log("todo bien primer if");
            setErrorName(messages.INCORRECT_NAME);
            setErrorLastName(messages.INCORRECT_LASTNAME);
            setErrorEmail(messages.EMAIL_INCORRECT);
            setErrorPhone(messages.PHONE_INCORRECT);
            setErrorAddress(messages.ADDRESS_INCORRECT);
            setErrorImage(messages.NOT_LOAD_IMAGE);
        }
        else {
            console.log("todo mal primer else");
            setErrorName(null);
            setErrorLastName(null);
            setErrorId(null);
            setErrorEmail(null);
            setErrorPhone(null);
            setErrorAddress(null);
            setErrorImage(null);
        }
        console.log("validando uno ", validate());
        if (validate()) {

            console.log("Guardando....");
            setErrorName("");
            setErrorLastName("");
            setErrorEmail("");
            setErrorPhone("");
            setErrorAddress("")
            setErrorImage("")
            //setModalVisible(true);
            return true;
        }
        return false;
    };

    const validate = () => {
        if (!name) {
            setErrorName(messages.INCORRECT_NAME);
            return false;
        }
        if (!lastName) {
            setErrorLastName(messages.INCORRECT_LASTNAME);
            return false;
        }
        if (!id) {
            setErrorId(messages.INCORRECT_ID_ERROR);
            return false;
        }
        if (!email) {
            setErrorEmail(messages.EMAIL_INCORRECT);
            return false;
        }
        if (!phone) {
            setErrorPhone(messages.PHONE_INCORRECT);
            return false;
        }
        if (!address) {
            setErrorAddress(messages.PASSWORDS_NOTSECURITY);
            return false;
        }
        {/*if (!newAvatar) {
            
            setErrorImage(messages.NOT_LOAD_IMAGE);
            return false;
        }*/}

        return true
    }

    viewData = () => {
        setName(userDataContext.names);
        setLastName(userDataContext.surnames);
        setId(userDataContext.identity_card_user);
        setEmail(userDataContext.email);
        setPhone(userDataContext.phone);
        setAddress(userDataContext.address);
        //setNewAvatar(userData.image);

    }

    buttonAceptModal = ()=>{
        setModalVisible(false);
    }
    return (
        <Principal>
            <ScrollView>
                <Text style={commonStyles.textTile}>Perfil</Text>
                <View style={[commonStyles.containerButton, {
                    justifyContent: 'flex-start', flexDirection: 'row',
                    alignItems: 'center', marginRight: '5%', marginLeft: '20%'
                }]}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <Text style={styles.nameText}>{userData.names} {userData.surnames}</Text>
                    </View>
                    <View>
                        <Icon
                            raised
                            name='edit'
                            type='entypo'
                            color={viewName ? colors.violet : colors.blue}
                            size={30}
                            onPress={editBoton}
                        />
                    </View>
                </View>
                <View style={styles.input}>
                    {
                        viewName ? <Input style={styles.InputContainer}
                            label="Nombres"
                            labelStyle={[commonStyles.titleInput, { marginLeft: 0 }]}
                            placeholder="Tus nombres"
                            value={name}
                            onChangeText={verifyName}
                            leftIcon={
                                <Icon name="user" type="antdesign" size={30} color={colors.blue} />
                            }
                            maxLength={75}
                            errorMessage={(errorName ? errorName : "")}
                            errorStyle={commonStyles.errorStyle}
                        /> : <></>
                    }

                    {
                        viewName ? <Input style={styles.InputContainer}
                            label="Apellidos"
                            labelStyle={[commonStyles.titleInput, { marginLeft: 0 }]}
                            placeholder="Tus apellidos"
                            leftIcon={
                                <Icon name="user" type="antdesign" size={30} color={colors.blue} />
                            }
                            maxLength={25}
                            value={lastName}
                            onChangeText={verifyLastName}
                            errorMessage={(errorLastName ? errorLastName : "")}
                            errorStyle={commonStyles.errorStyle}
                        /> : <></>
                    }
                    <Input style={styles.InputContainer}
                        label="Cédula"
                        labelStyle={[commonStyles.titleInput, { marginLeft: 0 }]}
                        placeholder="Tu cédula"
                        value={id}
                        onChangeText={setId}
                        leftIcon={
                            <Icon name="idcard" type="antdesign" size={30} color={colors.blue} />
                        }
                        keyboardType={"numeric"}
                        maxLength={10}
                        errorMessage={(errorId ? errorId : "")}
                        errorStyle={commonStyles.errorStyle}
                        disabled={true}
                    />
                    <Input style={styles.InputContainer}
                        label="Correo electrónico"
                        labelStyle={[commonStyles.titleInput, { marginLeft: 0 }]}
                        placeholder="Tu correo electrónico"
                        value={email}
                        onChangeText={verifyEmail}
                        leftIcon={
                            <Icon name="email" type="fontisto" size={25} color={colors.blue} />
                        }
                        keyboardType={"email-address"}
                        maxLength={75}
                        disabled={!editable}
                        errorMessage={(errorEmail ? errorEmail : "")}
                        errorStyle={commonStyles.errorStyle}
                    />
                    <Input style={styles.InputContainer}
                        label="Celular"
                        labelStyle={[commonStyles.titleInput, { marginLeft: 0 }]}
                        placeholder="Tu celular"
                        value={phone}
                        onChangeText={verifyPhone}
                        leftIcon={
                            <Icon name="phone" type="feather" size={25} color={colors.blue} />
                        }
                        keyboardType={"numeric"}
                        maxLength={10}
                        disabled={!editable}
                        errorMessage={(errorPhone ? errorPhone : "")}
                        errorStyle={commonStyles.errorStyle}
                    />
                    <Input style={styles.InputContainer}
                        label="Dirección"
                        labelStyle={[commonStyles.titleInput, { marginLeft: 0 }]}
                        placeholder="Tu dirección"
                        disabled={!editable}
                        value={address}
                        onChangeText={verifyAdrees}
                        leftIcon={
                            <Icon name="map-pin" type="feather" size={25} color={colors.blue} />
                        }
                        maxLength={75}
                        errorMessage={(errorAddress ? errorAddress : "")}
                        errorStyle={commonStyles.errorStyle}
                    />
                </View>
                <View style={styles.textLog}>
                    {
                        viewName ? <TouchableOpacity
                            onPress={() => navigation.navigate("UpdatePassword")}
                        >
                            <Text style={[styles.textLogin, { fontWeight: 'bold' }]}>¡Actualiza tu contraseña aquí!</Text>
                        </TouchableOpacity> : <></>
                    }
                </View>
                <View style={[commonStyles.containerButton, { marginBottom: '5%' }]}>
                    {
                        viewName ? <Button
                            title={"Guardar"}
                            buttonStyle={{ backgroundColor: colors.violet }}
                            containerStyle={commonStyles.introButton}
                            titleStyle={commonStyles.fontButton}
                            onPress={updateUserData}
                        /> : <></>
                    }
                </View>
                <ModalC
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    onAccept={buttonAceptModal}
                    modalText={message}
                    showCancelButton={false}
                    imageModal={require('../../assets/checked.png')}
                    acceptButtonText="Aceptar"
                />
            </ScrollView>
            <ReturnButton onPress={()=> navigation.goBack()} />
        </Principal>
    );
}

const styles = StyleSheet.create({

    container: {
        //backgroundColor:'yellow',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5%'
    },

    circularImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },

    img: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    nameText: {
        //backgroundColor:'green',
        fontSize: 18,
        color: colors.blue,
        padding: '1%',
        textAlign: 'center',
        marginTop: '10%',
        fontWeight: 'bold'
    },
    InputContainer: {
        //backgroundColor: 'pink',
        color: colors.blue,
        fontSize: 12,
        marginTop: 10,
        borderColor: colors.light,
        marginLeft: 15,
        opacity: 0.5
    },

    input: {
        //backgroundColor: 'yellow',
        marginTop: 10,
        padding: 25,
    },
    changePass: {
        //backgroundColor:'yellow',
        fontSize: 16,
        margin: '4%',
        textAlign: 'center',
        fontWeight: 'bold',
        color: colors.violet
    },
    textLog: {
        //backgroundColor:'red',
        marginBottom: 20,
    },
    textLogin: {
        textAlign: "center",
        fontSize: 16,
        fontStyle: "italic",
        color: colors.violet,
        textDecorationLine: "underline",
    },
    containerBtnCharge: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center",
    },
    btnCharge: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    },
})

export { Profile };
