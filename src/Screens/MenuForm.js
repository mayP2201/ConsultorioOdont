import { Button, Divider, FAB } from "@rneui/themed";
import { StyleSheet, View } from "react-native";


export const MenuNavForm = ({ navigation }) => {

    const FinalizarSesion = () => {
        console.log("CERRAR");
    }

    return (
        <View style={styles.container}>
            <Divider width={20} color='white' />
            <Button
                title='Trivias'
                onPress={() => {
                    console.log('Page');
                }}
                icon={{
                    name: 'cards-playing-spade-outline',
                    type: 'material-community',
                    size: 15,
                    color: 'white'
                }}
                buttonStyle={styles.saveButton}
                uppercase
            />

            <Divider width={20} color='white' />
            <FAB
                title=''
                placement="left"
                onPress={FinalizarSesion}
                icon={{ name: 'log-out', color: 'white', type: 'entypo', }}
                color='red'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButton: {
        backgroundColor: '#1981C6',
        borderRadius: 10,
    },
});