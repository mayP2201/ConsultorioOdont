import React from 'react';
import { View, StyleSheet, Text, Modal, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { commonStyles, colors } from '../common/globalStyle';



const ModalC = ({ modalVisible, setModalVisible, onAccept, onCancel, modalText, showCancelButton, imageModal }) => {
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
                        <View style={styles.imageModal}>
                            <Image source={imageModal} style={styles.image} />
                        </View>
                        <View style={[commonStyles.containerButton, { flexDirection: 'row' }]}>
                            {showCancelButton ? <Button
                                title={"Cancelar"}
                                buttonStyle={commonStyles.buttonStyle}
                                titleStyle={[commonStyles.fontButton, { fontSize: 16, marginHorizontal:'5%' }]}
                                containerStyle={styles.modalButton}
                                onPress={onCancel}
                            /> : <></>
                            }
                            <Button
                                title={"Aceptar"}
                                buttonStyle={[commonStyles.buttonStyle, { backgroundColor: colors.lightViolet }]}
                                titleStyle={[commonStyles.fontButton, { fontSize: 16, marginHorizontal:'5%' }]}
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
        marginBottom: 18,
        textAlign: 'center',
        color: colors.blue,
        fontWeight: '700'
    },
    modalButton: {
        //backgroundColor:'yellow',
        marginHorizontal: '10%',
        marginVertical: '2%'
    },
    image: {
        //backgroundColor: 'yellow',
        marginVertical:'5%',
    },
    imageModal: {
        //backgroundColor: 'yellow',
        //margin:'10%'
    }
})

export default ModalC;
