import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity } from 'react-native';
import Principal from '../components/Principal';
import { colors, commonStyles } from '../common/globalStyle';
import { Input } from '@rneui/base';
import { Icon, Button } from '@rneui/themed';
import { useState } from 'react';
import { letter, number, specialCaracter } from '../services/validations';
import { messages } from '../common/messages';
import axios from 'axios';
import ModalC from '../components/ModalC';
import ReturnButton from '../components/ReturnButton';
import { useContext } from 'react';
import { CContext } from '../context/CContext';

const NewPassword = (props) => {
    console.log(props)
    const { navigation } = props;
    const {code} = props.route.params;
    const { handleChangevisibleModal } = useContext(CContext);
    //const { code, handleChangeCode } = useContext(CContext); // Uso de context
    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [iconVisibility, setIconVisibility] = useState(true);
    const [errorMathPassword, setErrorMathPassword] = useState("");
    const [iconVisibility1, setIconVisibility1] = useState(true);
    const [modalVisibleError, setModalVisibleError] = useState(false);


    const resetPassword = async () => {
        handleChangevisibleModal(true);
        try {
          const response = await axios.post('https://endpointsco-production.up.railway.app/api/reset-password', { 
            code: code,
            password: password,
            password_confirm: confirmPassword
           });
           verify();
           handleChangevisibleModal(false);
           navigation.navigate('Login');
        } catch (error) {
            setModalVisibleError(true);
        }
      };

    //handleChangeCode("122343");  cambiar codigo 
    passwordVisibility = () => {
        setIconVisibility(!iconVisibility);
    }

    passwordVisibility1 = () => {
        setIconVisibility1(!iconVisibility1);
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
        setConfirmPassword(confirmPassword);
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

        if (password.trim() === "" && confirmPassword.trim()) {
            setErrorPassword(messages.PASSWORDS_NOTSECURITY);
            setErrorMathPassword(messages.PASSWORDS_DONT_MATCH);
        }
        else {
            setErrorPassword(null);
            setErrorMathPassword(null);
        }
        if (validate()) {
            console.log("Guardando....");
            setErrorPassword("");
            setErrorMathPassword("");
   
        }
        else {
            console.log("error");
            setModalVisibleError(true);
        }
    };

    const validate = () => {
        
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

    buttonAceptError = () => {
        setModalVisibleError(false);
        handleChangevisibleModal(false);
    }

    return (
        <Principal>
            <ScrollView>
                <View>
                    <Text style={commonStyles.textTile}>REESTABLECER</Text>
                    <Text style={styles.textTile1}>CONTRASEÑA</Text>
                    <Text style={commonStyles.textDescription}>Escribe tu nueva contraseña de minimo ocho caracteres</Text>
                    <View style={styles.principalContainer}>
                        <View style={styles.input}>
                            <Input style={styles.InputContainer}
                                label="Escribe una contraseña"
                                labelStyle={[commonStyles.titleInput, { marginLeft: 0 }]}
                                placeholder="Tu nueva contraseña"
                                value={password}
                                secureTextEntry={iconVisibility}
                                onChangeText={verifyPassword}
                                leftIcon={
                                    <Icon name="md-key-outline" type="ionicon" size={25} color={colors.blue} />
                                }

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
                                label="Confirma una contraseña"
                                labelStyle={[commonStyles.titleInput, { marginLeft: 0, marginTop: '10%' }]}
                                placeholder="Confirma tu contraseña"
                                value={confirmPassword}
                                onChangeText={confirmOfPassword}
                                leftIcon={
                                    <Icon name="md-key-outline" type="ionicon" size={25} color={colors.blue} />
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
                                title={"Confirmar"}
                                buttonStyle={commonStyles.buttonStyle}
                                containerStyle={commonStyles.introButton}
                                titleStyle={commonStyles.fontButton}
                                onPress={resetPassword}
                            />
                        </View>
                        <ModalC
                            modalVisible={modalVisibleError}
                            setModalVisible={setModalVisibleError}
                            onAccept={buttonAceptError}
                            modalText="Verifica las contraseñas ingresadas"
                            showCancelButton={false}
                            imageModal={require('../../assets/attention.png')}
                            acceptButtonText="Aceptar"
                        />
                    </View>
                </View>
            </ScrollView>
            <ReturnButton onPress={() => navigation.goBack()} />
        </Principal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textTile1: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.blue,
        textAlign: 'center',
        maxWidth: '100%',
        //backgroundColor: 'yellow'
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
        marginTop: 50,
        padding: 25,
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '15%'
    },

    principalContainer: {
        //backgroundColor:'blue',
        flex: 1,
        justifyContent: 'center',
        marginTop: '20%'
    }
});

export default NewPassword;