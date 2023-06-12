import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity } from 'react-native';
import Principal from '../components/Principal';
import { colors, commonStyles } from '../common/globalStyle';
import { Input } from '@rneui/base';
import { Icon, Button } from '@rneui/themed';
import { useState } from 'react';
import { letter, number, specialCaracter } from '../services/validations';
import { messages } from '../common/messages';


const NewPassword = ({ navigation }) => {

    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [errorPassword, setErrorPassword] = useState();
    const [errorConfirmPassword, setErrorConfirmPassword] = useState();
    const [iconVisibility, setIconVisibility] = useState(true);
    const [iconVisibility1, setIconVisibility1] = useState(true);

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
        if (confirmPassword.length < 8) {
            setErrorConfirmPassword(messages.PASSWORD_MIN);
        } else if (!number(confirmPassword)) {
            setErrorConfirmPassword(messages.PASSWORD_NUMBER);
        } else if (!letter(confirmPassword)) {
            setErrorConfirmPassword(messages.PASSWORD_LETTER);
        } else if (!specialCaracter(confirmPassword)) {
            setErrorConfirmPassword(messages.PASSWORD_CARACTER);
        } else {
            setErrorConfirmPassword(null);
        }
        setConfirmPassword(confirmPassword);
    }

    return (
        <Principal>
            <ScrollView>
                <View>
                    <Text style={styles.textTile}>RECUPERAR</Text>
                    <Text style={styles.textTile1}>CONTRASEÑA</Text>
                    <Text style={styles.textDescription}>Escribe tu nueva contraseña de minimo ocho caracteres</Text>
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
                                errorMessage={(errorConfirmPassword ? errorConfirmPassword : "")}
                                errorStyle={commonStyles.errorStyle}

                            />
                        </View>
                        <View style={commonStyles.containerButton}>
                            <Button
                                title={"Confirmar"}
                                buttonStyle={commonStyles.buttonStyle}
                                containerStyle={commonStyles.introButton}
                                titleStyle={commonStyles.fontButton}
                                onPress={() => navigation.navigate("Login")}
                            />
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