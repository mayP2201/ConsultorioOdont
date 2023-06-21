import React from 'react';
import { View, StyleSheet, Text, Modal } from 'react-native';
import { Button } from 'react-native-elements';
import { commonStyles, colors } from '../common/globalStyle';


const ModalC = ({ modalVisible, setModalVisible, onAccept, onCancel, modalText }) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{modalText}</Text>
                        <View style={[commonStyles.containerButton, { flexDirection: 'row' }]}>
                            <Button
                                title={"Cancelar"}
                                buttonStyle={commonStyles.buttonStyle}
                                titleStyle={[commonStyles.fontButton, { fontSize: 16 }]}
                                containerStyle={styles.modalButton}
                                onPress={onCancel}
                            />
                            <Button
                                title={"Aceptar"}
                                buttonStyle={[commonStyles.buttonStyle, { backgroundColor: colors.green }]}
                                titleStyle={[commonStyles.fontButton, { fontSize: 16 }]}
                                containerStyle={styles.modalButton}
                                onPress={onAccept}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
      modalButton: {
        //backgroundColor:'yellow',
        marginHorizontal: '10%',
        marginVertical: '2%'
      },
})

export default ModalC;
