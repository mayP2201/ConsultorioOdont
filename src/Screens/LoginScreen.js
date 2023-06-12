import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity } from 'react-native';
import Principal from '../components/Principal';
import { colors, commonStyles } from '../common/globalStyle';
import { Input } from '@rneui/base';
import { Icon, Button } from '@rneui/themed';
import { useState } from 'react';
import { letter, number, specialCaracter, validateCorrectEmail, validateCorrectPassword, validateEmail1 } from '../services/validations';
import { messages } from '../common/messages';

const Login = ({ navigation }) => {

    const [email, setEmail] = useState();
    const [errorEmail, setErrorEmail] = useState();
    const [password, setPassword] = useState();
    const [errorPassword, setErrorPassword] = useState();
    const [iconVisibility, setIconVisibility] = useState(true);

    passwordVisibility = () => {
        setIconVisibility(!iconVisibility);
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

    return (
        <Principal>
            <ScrollView>
                <View style={styles.img}>
                    <Image
                        source={require('../../assets/img.png')}
                    />
                </View>
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
                        errorStyle={commonStyles.errorStyle}
                        errorMessage={(errorEmail ? errorEmail : "")}
                    />
                    <Input style={styles.InputContainer}
                        label="Contraseña"
                        labelStyle={[commonStyles.titleInput, { marginLeft: 0 }]}
                        placeholder="Tu contraseña"
                        value={password}
                        onChangeText={verifyPassword}
                        leftIcon={
                            <Icon name="md-key-outline" type="ionicon" size={30} color={colors.blue} />
                        }
                        maxLength={25}
                        secureTextEntry={iconVisibility}
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
                     <TouchableOpacity
                        onPress={() => navigation.navigate("RecoverPassword")}
                    >
                        <Text style={[styles.textLogin,{fontWeight : 'bold',fontSize:12}]}>¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>
                </View>
                <View style={commonStyles.containerButton}>
                    <Button
                        title={"Ingresar"}
                        buttonStyle={commonStyles.buttonStyle}
                        containerStyle={commonStyles.introButton}
                        titleStyle={commonStyles.fontButton}
                        onPress={this.register}
                    />
                    <Button
                        title={"Registrarse"}
                        buttonStyle={{ backgroundColor: colors.violet }}
                        containerStyle={commonStyles.introButton}
                        titleStyle={commonStyles.fontButton}
                        onPress={() => navigation.navigate("Register")}
                    />
                </View>
                <View style={styles.textLog}>
                    <Text
                        style={[styles.textLogin, { textDecorationLine: "none", fontSize:12 }]}
                    >
                        ¿Aún no tienes una cuenta?
                    </Text>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("Register")}
                    >
                        <Text style={[styles.textLogin,{fontWeight : 'bold'}]}>¡Registrate!</Text>
                    </TouchableOpacity>
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
        marginTop: 20

    },
    img: {
        //backgroundColor:'yellow',
        marginTop: 100,
        alignItems: 'center'
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
        marginTop: 25,
        padding: 25,
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
});

export default Login;