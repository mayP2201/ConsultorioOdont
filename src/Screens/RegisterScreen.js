import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity } from 'react-native';
import Principal from '../components/Principal';
import { colors, commonStyles } from '../common/globalStyle';
import { Input } from '@rneui/base';
import { Icon, Button } from '@rneui/themed';
import { letter, number, specialCaracter, validateEmail1, validateId, validateLastName, validateName, validatePhone } from '../services/validations';
import { messages } from '../common/messages';
import { useState } from 'react';

const Register = ({ navigation }) => {
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

    passwordVisibility = () => {
        setIconVisibility(!iconVisibility);
    }

    passwordVisibility1 = () => {
        setIconVisibility1(!iconVisibility1);
    }
    verifyId = (id) => {
        if (!validateId(id)) {
            setErrorId(messages.INCORRECT_ID_ERROR)
        } else {
            const tercerDigito = parseInt(id.substring(2, 3));
            if (tercerDigito < 0 || tercerDigito > 5) {
                setErrorId(messages.INCORRECT_ID_ERROR);
            } else {
                let total = 0;
                const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
                const verificador = parseInt(id.substring(9, 10));
                for (let i = 0; i < coeficientes.length; i++) {
                    const valor = parseInt(id.substring(i, i + 1));
                    const producto = valor * coeficientes[i];
                    if (producto >= 10) {
                        total += producto - 9;
                    } else {
                        total += producto;
                    }
                }
                const residuo = total % 10;
                const resultado = residuo === 0 ? 0 : 10 - residuo;
                if (resultado !== verificador) {
                    setErrorId(messages.INCORRECT_ID_ERROR);
                } else {
                    setErrorId(null);
                }
            }
        }
        setId(id);
    };

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

    const register = () => {
        setErrorName("");
        setErrorLastName("");
        setErrorEmail("");
        setErrorPhone("");
        setErrorPassword("");
        setErrorMathPassword("");
        if (validate()) {
            console.log("Guardando....");
            goToLogin();
        } else {
            console.log("error");
        }
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



    const goToLogin = () => {
        // navigation.navigate("Login");
        console.log("Ir a Login");
    };

    return (
        <Principal>
            <ScrollView>
                <View>
                    <Text style={styles.textTile}>REGISTRAR</Text>
                    <Text style={styles.textDescription}>Ingresa tus datos para unirte a nuestra comunidad</Text>
                    <View style={styles.input}>
                        <Input style={styles.InputContainer}
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
                        />
                        <Input style={styles.InputContainer}
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
                        />
                        <Input style={styles.InputContainer}
                            label="Cédula"
                            labelStyle={[commonStyles.titleInput, { marginLeft: 0 }]}
                            placeholder="Tu cédula"
                            value={id}
                            onChangeText={verifyId}
                            leftIcon={
                                <Icon name="idcard" type="antdesign" size={30} color={colors.blue} />
                            }
                            keyboardType={"numeric"}
                            maxLength={10}
                            errorMessage={(errorId ? errorId : "")}
                            errorStyle={commonStyles.errorStyle}
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
                        <Input style={styles.InputContainer}
                            label="Contraseña"
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
                    <View style={[commonStyles.containerButton]}>
                        <Button
                            title={"Registrarse"}
                            buttonStyle={{ backgroundColor: colors.violet }}
                            containerStyle={commonStyles.introButton}
                            titleStyle={commonStyles.fontButton}
                            onPress={register}

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
        marginTop: 30

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
        marginTop: 10,
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

export default Register;