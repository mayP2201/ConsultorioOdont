import React, { useContext } from 'react';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Principal from '../components/Principal';
import { ScrollView } from 'react-native-gesture-handler';
import { colors, commonStyles } from '../common/globalStyle';
import { Button, Icon, Input, Text } from 'react-native-elements';
import { messages } from '../common/messages';
import { letter, number, specialCaracter } from '../services/validations';
import { CContext } from '../context/CContext';
import axios from 'axios';

const UpdatePassword = ({ navigation }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [errorOldPassword, setErrorOldPassword] = useState("")
    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [errorMathPassword, setErrorMathPassword] = useState("");
    const [iconVisibility, setIconVisibility] = useState(true);
    const [iconVisibility1, setIconVisibility1] = useState(true);
    const [iconVisibility2, setIconVisibility2] = useState(true);
    const { token } = useContext(CContext);

    const updatePassword = async () => {
        try {
          const response = await axios.post(
            'https://endpointsco-production.up.railway.app/api/update-password',
            {
                password_current: oldPassword,
                password: password,
                password_confirm: confirmPassword
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log(response.data);
          verify();
          navigation.navigate("Profile");
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

    passwordVisibility2 = () => {
        setIconVisibility2(!iconVisibility2);
    }


    const verifyOldPassword = (oldPassword) => {
        if (oldPassword.length < 8) {
            setErrorOldPassword(messages.PASSWORD_MIN);
        } else if (!number(oldPassword)) {
            setErrorOldPassword(messages.PASSWORD_NUMBER);
        } else if (!letter(oldPassword)) {
            setErrorOldPassword(messages.PASSWORD_LETTER);
        } else if (!specialCaracter(oldPassword)) {
            setErrorOldPassword(messages.PASSWORD_CARACTER);
        } else {
            setErrorOldPassword(null);
        }
        setOldPassword(oldPassword);
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

    const verify = () => {

        if (oldPassword.trim() === "" && password.trim() === ""
            && confirmPassword.trim() === ""
        ) {
            setErrorPassword(messages.PASSWORDS_NOTSECURITY);
            setErrorMathPassword(messages.PASSWORDS_DONT_MATCH);
            setErrorOldPassword(messages.PASSWORDS_NOTSECURITY);
        }
        else {

            setErrorPassword(null);
            setErrorMathPassword(null);
            setErrorOldPassword(null);
        }
        if (validate()) {
            console.log("Guardando....");
            setErrorPassword("");
            setErrorMathPassword("");
            setErrorOldPassword("");
            //setModalVisible(true);
        }
        else {
            console.log("error");
            //setModalVisibleError(true);

        }
    };

    const validate = () => {

        if (!oldPassword) {
            setErrorOldPassword(messages.PASSWORDS_NOTSECURITY);
            return false;
        }
        if (!password) {
            setErrorPassword(messages.PASSWORDS_NOTSECURITY);
            return false;
        }

        if (password != confirmPassword) {
            setErrorMathPassword(messages.PASSWORDS_DONT_MATCH);
            return false;
        }

        return true;
    };
    return (
        <Principal>
            <ScrollView>
                <Text style={commonStyles.textTile}>CAMBIO DE CONTRASEÑA</Text>
                <Text style={commonStyles.textDescription}>Ingresa la nueva contraseña</Text>
                <View style={styles.input}>

                    <Input style={styles.InputContainer}
                        label="Contraseña antigua"
                        labelStyle={[commonStyles.titleInput, { marginLeft: 0 }]}
                        placeholder="Tu contraseña"
                        value={oldPassword}
                        onChangeText={verifyOldPassword}
                        leftIcon={
                            <Icon name="md-key-outline" type="ionicon" size={30} color={colors.blue} />
                        }
                        maxLength={75}
                        secureTextEntry={iconVisibility2}
                        rightIcon={
                            <Icon
                                onPress={passwordVisibility2}
                                type="feather"
                                name={iconVisibility2 ? "eye-off" : "eye"}
                            />
                        }
                        errorMessage={(errorOldPassword ? errorOldPassword : "")}
                        errorStyle={commonStyles.errorStyle}
                    />
                    <Input style={styles.InputContainer}
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
                    />
                    <Input style={styles.InputContainer}
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
                    />
                </View>
                <View style={commonStyles.containerButton}>
                    <Button
                        title={"Guardar"}
                        buttonStyle={[commonStyles.buttonStyle, { backgroundColor: colors.violet }]}
                        containerStyle={commonStyles.introButton}
                        titleStyle={commonStyles.fontButton}
                        onPress={updatePassword}
                    />

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
        marginTop: '30%',
        marginBottom: '10%',

        padding: 25,
    },
    textLog: {
        marginTop: 30,
        //backgroundColor:'red',
        marginBottom: 20,
    },

})

export default UpdatePassword;
