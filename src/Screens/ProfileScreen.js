import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Principal from '../components/Principal';
import { Image } from 'react-native-elements';
import { colors, commonStyles } from '../common/globalStyle';
import { Input } from '@rneui/base';
import { Icon, Button } from '@rneui/themed';
import { ScrollView } from 'react-native-gesture-handler';
import { validateEmail1, validateLastName, validateName, validatePhone } from '../services/validations';
import { messages } from '../common/messages';


const Profile = () => {
    const [name, setName] = useState();
    const [errorName, setErrorName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errorLastName, setErrorLastName] = useState("");
    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [errorPhone, setErrorPhone] = useState("");
    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [errorMathPassword, setErrorMathPassword] = useState("");
    const [id, setId] = useState("");
    const [errorId, setErrorId] = useState("");
    const [iconVisibility, setIconVisibility] = useState(true);
    const [iconVisibility1, setIconVisibility1] = useState(true);
    const [viewName, setViewName] = useState(false);

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
    const verifyPassword = (password) => {
        if (password.length < 8) {
            setErrorPassword(messages.PASSWORD_MIN);
        } else if (!number(password)) {
            setErrorPassword(messages.PASSWORD_NUMBER);
        } else if (!letter(password)) {
            setErrorPassword(messages.PASSWORD_LETTER);
        } else if (!specialCaracter(password)) {
            setErrorPassword(messages.PASSWORD_CARACTER);
        } else {
            setErrorMathPassword(messages.PASSWORDS_DONT_MATCH);
            setErrorPassword(null);

        }
        setPassword(password);
    }

    const confirmOfPassword = (confirmPassword) => {
        setconfirmPassword(confirmPassword);
        matchPassword(password, confirmPassword);
    }

    const matchPassword = (value1, value2) => {
        if (value1 == value2) {
            setErrorMathPassword(null);
        }
        else {
            setErrorMathPassword(messages.PASSWORDS_DONT_MATCH);
        }
    }
    editBoton = () =>{
        setViewName(!viewName);
    }
    return (
        <Principal>
            <ScrollView>
                <Text style={styles.textTile}>Perfil</Text>
                <View style={styles.container}>
                    <Image source={require('../../assets/o1.jpg')}
                        style={styles.img}
                    />
                </View>
                <View style={[commonStyles.containerButton, {
                    justifyContent: 'flex-start', flexDirection: 'row',
                    alignItems: 'center', marginRight:'5%', marginLeft:'20%'
                }]}>
                    <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                        <Text style={styles.nameText}>Pablo Ariel Arias Arias</Text>
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
                    />:<></>
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
                    />:<></>
                }
                    <Input style={styles.InputContainer}
                        label="Cédula"
                        labelStyle={[commonStyles.titleInput, { marginLeft: 0 }]}
                        placeholder="Tu cédula"
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
                        errorMessage={(errorPhone ? errorPhone : "")}
                        errorStyle={commonStyles.errorStyle}
                    />
                    <Input style={styles.InputContainer}
                        label="Dirección"
                        labelStyle={[commonStyles.titleInput, { marginLeft: 0 }]}
                        placeholder="Tu dirección"
                        leftIcon={
                            <Icon name="map-pin" type="feather" size={25} color={colors.blue} />
                        }
                        maxLength={75}
                    />
                    { viewName ? <Text style={styles.changePass}>Cambio de contraseña</Text> : <></>}
                    {
                    viewName ? <Input style={styles.InputContainer}
                        label="Contraseña antigua"
                        labelStyle={[commonStyles.titleInput, { marginLeft: 0 }]}
                        placeholder="Tu contraseña"
                        value={confirmPassword}
                        onChangeText={confirmOfPassword}
                        leftIcon={
                            <Icon name="md-key-outline" type="ionicon" size={30} color={colors.blue} />
                        }
                        maxLength={75}
                        secureTextEntry={iconVisibility1}
                        rightIcon={
                            <Icon
                                onPress={passwordVisibility1}
                                type="feather"
                                name={iconVisibility1 ? "eye-off" : "eye"}
                            />
                        }
                        errorMessage={(errorMathPassword ? errorMathPassword : "")}
                        errorStyle={commonStyles.errorStyle}
                    />:<></>
                    }
                    {
                    viewName ? <Input style={styles.InputContainer}
                        label="Nueva contraseña"
                        labelStyle={[commonStyles.titleInput, { marginLeft: 0 }]}
                        placeholder="Tu contraseña"
                        value={password}
                        onChangeText={verifyPassword}
                        leftIcon={
                            <Icon name="md-key-outline" type="ionicon" size={30} color={colors.blue} />
                        }
                        secureTextEntry={iconVisibility}
                        maxLength={75}
                        rightIcon={
                            <Icon
                                onPress={passwordVisibility}
                                type="feather"
                                name={iconVisibility ? "eye-off" : "eye"}
                            />
                        }
                        errorMessage={(errorPassword ? errorPassword : "")}
                        errorStyle={commonStyles.errorStyle}
                    />:<></>
                    }
                    {
                    viewName ? <Input style={styles.InputContainer}
                        label="Confirmar contraseña"
                        labelStyle={[commonStyles.titleInput, { marginLeft: 0 }]}
                        placeholder="Tu contraseña"
                        value={confirmPassword}
                        onChangeText={confirmOfPassword}
                        leftIcon={
                            <Icon name="md-key-outline" type="ionicon" size={30} color={colors.blue} />
                        }
                        maxLength={75}
                        secureTextEntry={iconVisibility1}
                        rightIcon={
                            <Icon
                                onPress={passwordVisibility1}
                                type="feather"
                                name={iconVisibility1 ? "eye-off" : "eye"}
                            />
                        }
                        errorMessage={(errorMathPassword ? errorMathPassword : "")}
                        errorStyle={commonStyles.errorStyle}
                    />:<></>
                    }
                </View>
                <View style={[commonStyles.containerButton,{marginBottom:'5%'}]}>
                       {
                        viewName ? <Button
                            title={"Guardar"}
                            buttonStyle={{ backgroundColor: colors.violet }}
                            containerStyle={commonStyles.introButton}
                            titleStyle={commonStyles.fontButton}
                        />:<></>
                       } 
                    </View>
            </ScrollView>
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
    textTile: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.blue,
        textAlign: 'center',
        maxWidth: '100%',
        marginTop: 30
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
    textLog: {
        marginTop: 30,
        //backgroundColor:'red',
        marginBottom: 20,
    },
    changePass:{
        //backgroundColor:'yellow',
        fontSize: 16,
        margin:'4%',
        textAlign:'center',
        fontWeight:'bold',
        color: colors.violet
    }

})

export { Profile };
