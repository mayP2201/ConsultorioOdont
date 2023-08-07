import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity } from 'react-native';
import Principal from '../components/Principal';
import { colors, commonStyles } from '../common/globalStyle';
import { Input } from '@rneui/base';
import { Icon, Button } from '@rneui/themed';
import { validateEmail1 } from '../services/validations';
import { messages } from '../common/messages';
import { useState } from 'react';
import axios from 'axios';
import ModalC from '../components/ModalC';
import { useContext } from 'react';
import { CContext } from '../context/CContext';
import ReturnButton from '../components/ReturnButton';

const RecoverPassword = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleError, setModalVisibleError] = useState(false);
    const { handleChangevisibleModal } = useContext(CContext);

    const verifyEmail = (email) => {
        if (validateEmail1(email)) {
            setErrorEmail(null);
        }
        else {
            setErrorEmail(messages.EMAIL_INCORRECT);
        }
        setEmail(email);
    }

    const verify = () => {

        if (email.trim() === "") {
            setErrorEmail(messages.EMAIL_INCORRECT);
        }
        else {
            setEmail(null);
        }
        if (validate()) {
            console.log("Guardando....");
            setErrorEmail("");
            setModalVisible(true);

        }
        else {
            console.log("error");
            setModalVisibleError(true);

        }
    };

    const validate = () => {
        if (!email) {
            setErrorEmail(messages.EMAIL_INCORRECT);
            return false;
        }
        return true;
    };

    buttonAcept = () => {
        navigation.navigate('Code');
        setModalVisible(false);
        handleChangevisibleModal(false);
    }

    buttonAceptError = () => {
        setModalVisibleError(false);
    }
    const handleForgotPassword = async () => {
        handleChangevisibleModal(true);
        try {
            const response = await axios.post('https://endpointsco-production.up.railway.app/api/forgot-password',
                { email }
            );
            verify();
            handleChangevisibleModal(false);
        } catch (error) {
            setModalVisibleError(true);
        }
    };

    return (
        <Principal>
            <ScrollView>
                <View>
                    <Text style={commonStyles.textTile}>REESTABLECER</Text>
                    <Text style={styles.textTile1}>CONTRASEÑA</Text>
                    <Text style={commonStyles.textDescription}>Escribe tu correo electrónico para cambiar tu contraseña</Text>
                    <View style={styles.principalContainer}>
                        <View style={styles.input}>
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
                        </View>
                        <View style={commonStyles.containerButton}>
                            <Button
                                title={"Enviar Código"}
                                buttonStyle={commonStyles.buttonStyle}
                                containerStyle={commonStyles.introButton}
                                titleStyle={commonStyles.fontButton}
                                onPress={handleForgotPassword}
                            />
                            <Button
                                title={"Ingresar"}
                                buttonStyle={{ backgroundColor: colors.violet }}
                                containerStyle={commonStyles.introButton}
                                titleStyle={commonStyles.fontButton}
                                onPress={() => navigation.navigate("Login")}
                            />
                        </View>
                        <View style={styles.textLog}>
                            <Text
                                style={[styles.textLogin, { textDecorationLine: "none" }]}
                            >
                                ¿Ya estas registrado?
                            </Text>

                            <TouchableOpacity
                                onPress={() => navigation.navigate("Login")}
                            >
                                <Text style={[styles.textLogin, { fontWeight: 'bold' }]}>¡Inicia sesión!</Text>
                            </TouchableOpacity>
                        </View>
                        <ModalC
                            modalVisible={modalVisible}
                            setModalVisible={setModalVisible}
                            onAccept={buttonAcept}
                            modalText="El código se envió con exito, por favor revisa tu correo"
                            showCancelButton={false}
                            imageModal={require('../../assets/mensaje.png')}
                            acceptButtonText="Aceptar"
                        />
                        <ModalC
                            modalVisible={modalVisibleError}
                            setModalVisible={setModalVisibleError}
                            onAccept={buttonAceptError}
                            modalText="Verifica el correo ingresado"
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
    textLog: {
        marginTop: 30,
        //backgroundColor:'red',
        marginBottom: 20,
    },
    textLogin: {
        textAlign: "center",
        fontSize: 14,
        fontStyle: "italic",
        color: colors.light,
        textDecorationLine: "underline",
    },
    principalContainer: {
        //backgroundColor:'blue',
        flex: 1,
        justifyContent: 'center',
        marginTop: '35%'
    }
});

export default RecoverPassword;