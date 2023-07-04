import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity } from 'react-native';
import Principal from '../components/Principal';
import { colors, commonStyles } from '../common/globalStyle';
import { Input } from '@rneui/base';
import { Icon, Button } from '@rneui/themed';
import { useState } from 'react';
import { messages } from '../common/messages';
import axios from 'axios';
import ModalC from '../components/ModalC';

const Code = ({ navigation }) => {

    const [code, setCode] = useState("");
    const [codeError, setCodeError] = useState();
    const [modalVisibleError, setModalVisibleError] = useState(false);

    const handleVerifyCode = async () => {
        try {
            const response = await axios.post('https://endpointsco-production.up.railway.app/api/check-code',
                { code }

            );
            verify();
            navigation.navigate('NewPassword', { code });
        } catch (error) {
            setModalVisibleError(true);
        }
    };

    const verify = () => {

        if (code.trim() === "") {
            setCodeError(messages.CODE_INCORRECT);
        }
        else {
            setCodeError(null);
        }
        if (validate()) {
            console.log("Guardando....");
            setCodeError("");
        }
        else {
            console.log("error");
            setModalVisibleError(true);

        }
    };

    const validate = () => {
        if (!code) {
            setCodeError(messages.CODE_INCORRECT);
            return false;
        }
        return true;
    };

    buttonAceptError = () => {
        setModalVisibleError(false);
    }

    return (
        <Principal>
            <ScrollView>
                <View>
                    <Text style={commonStyles.textTile}>RECUPERAR</Text>
                    <Text style={styles.textTile1}>CONTRASEÑA</Text>
                    <Text style={commonStyles.textDescription}>Escribe el código que hemos enviado a tu correo electrónico</Text>
                    <View style={styles.principalContainer}>
                        <View style={styles.input}>
                            <Input style={styles.InputContainer}
                                label="Código de recuperación"
                                labelStyle={[commonStyles.titleInput, { marginLeft: 0 }]}
                                placeholder="Código"
                                value={code}
                                onChangeText={setCode}
                                leftIcon={
                                    <Icon name="qrcode" type="antdesign" size={25} color={colors.blue} />
                                }
                                keyboardType={"email-address"}
                                maxLength={75}
                                errorMessage={(codeError ? codeError : "")}
                                errorStyle={commonStyles.errorStyle}

                            />
                        </View>
                        <View style={commonStyles.containerButton}>
                            <Button
                                title={"Aceptar"}
                                buttonStyle={commonStyles.buttonStyle}
                                containerStyle={commonStyles.introButton}
                                titleStyle={commonStyles.fontButton}
                                onPress={handleVerifyCode}
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
                            modalVisible={modalVisibleError}
                            setModalVisible={setModalVisibleError}
                            onAccept={buttonAceptError}
                            modalText="Verifica el código ingresado"
                            showCancelButton={false}
                            imageModal={require('../../assets/attention.png')}
                        />
                    </View>
                </View>
            </ScrollView>
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
        maxWidth: '100%'

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

export default Code;