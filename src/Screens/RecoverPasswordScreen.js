import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity } from 'react-native';
import Principal from '../components/Principal';
import { colors, commonStyles } from '../common/globalStyle';
import { Input } from '@rneui/base';
import { Icon, Button } from '@rneui/themed';
import { validateEmail1 } from '../services/validations';
import { messages } from '../common/messages';
import { useState } from 'react';

const RecoverPassword = ({ navigation }) => {

    const [email, setEmail] = useState();
    const [errorEmail, setErrorEmail] = useState();

    const verifyEmail = (email) => {
        if (validateEmail1(email)) {
            setErrorEmail(null);
        }
        else {
            setErrorEmail(messages.EMAIL_INCORRECT);
        }
        setEmail(email);
    }

    return (
        <Principal>
            <ScrollView>
                <View>
                    <Text style={styles.textTile}>RECUPERAR</Text>
                    <Text style={styles.textTile1}>CONTRASEÑA</Text>
                    <Text style={styles.textDescription}>Escribe tu correo electrónico para cambiar tu contraseña</Text>
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
                                onPress={() => navigation.navigate("Code")}
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
    textTile: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.blue,
        textAlign: 'center',
        maxWidth: '100%',
        marginTop: '15%'

    },
    textTile1: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.blue,
        textAlign: 'center',
        maxWidth: '100%',
        

    },

    textDescription: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.lightBlue,
        textAlign: 'center',
        maxWidth: '100%',
        marginTop: 10


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
        marginBottom:'15%'
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
    principalContainer:{
        //backgroundColor:'blue',
        flex:1,
        justifyContent:'center',
        marginTop:'35%'
    }
});

export default RecoverPassword;