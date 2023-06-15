import { View, Text, StyleSheet, Alert, Modal, Pressable } from 'react-native'
import React, { useState } from 'react'
import Calendar from 'react-native-big-calendar'
import Principal from '../components/Principal';
import { SelectList } from 'react-native-dropdown-select-list';
import { colors, commonStyles } from '../common/globalStyle';
import { Button } from 'react-native-elements';


export const Schedule = ({ navigation }) => {
  const [selectDoctor, setSelectDoctor] = useState(null);
  const [isEvent, setIsEvent] = useState(false);
  const [event, setEvent] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const data = [
    { key: '1', value: 'Pablo Arias' },
    { key: '2', value: 'Lily Arias' },
    { key: '3', value: 'Maria Perez' },

  ]
  const handleAppointmentPress = (event) => {
    setEvent(event);
    setModalVisible(true);
  };
  const doctorSelector = (selectDoctor) => {
    setSelectDoctor(selectDoctor);
  }

  const events = [
    {
      start: new Date(2023, 5, 14, 9, 0),
      end: new Date(2023, 5, 14, 11, 0),
    },
    {
      start: new Date(2023, 5, 15, 10, 0),
      end: new Date(2023, 5, 15, 12, 0),
    },
  ]

  const colorEvent = () => {
    setIsEvent(true);
    setModalVisible(!modalVisible);
  }
  return (
    <Principal>
      <View>
        <Text style={styles.textTile}>CITAS</Text>
        <Text style={styles.textDescription}>Selecciona una cita odontológica</Text>
        <SelectList
          data={data}
          setSelected={doctorSelector}
          searchPlaceholder='Buscar'
          boxStyles={styles.boxStyles}
          inputStyles={{ color: colors.blue }}
          dropdownStyles={styles.boxListStyles}
          placeholder='- Selecciona un odontólogo'
        />
        <View style={styles.containerBox}>
          <View style={styles.colorContainer}>
            <View style={[styles.colorBox, { backgroundColor: colors.green }]} />
            <Text style={styles.textBox}>Disponible</Text>
          </View>
          <View style={styles.colorContainer}>
            <View style={[styles.colorBox, { backgroundColor: colors.blue }]} />
            <Text style={styles.textBox}>No disponible</Text>
          </View>
        </View>
        <View style={styles.calendar}>
          <Calendar
            events={events}
            onPressEvent={handleAppointmentPress}
            height={100}
            dayHeaderHighlightColor="lightblue"
            eventCellStyle={isEvent ? { backgroundColor: colors.blue } : { backgroundColor: colors.green }}
            minTime={9}
            maxTime={18}
          />
        </View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>¿Esta seguro de tomar la cita? </Text>
                <View style={[commonStyles.containerButton, { flexDirection: 'row' }
                ]}>
                  <Button
                    title={"Cancelar"}
                    buttonStyle={commonStyles.buttonStyle}
                    titleStyle={[commonStyles.fontButton, { fontSize: 16 }]}
                    containerStyle={styles.modalButton}
                    onPress={() => setModalVisible(!modalVisible)}
                  />
                  <Button
                    title={"Aceptar"}
                    buttonStyle={[commonStyles.buttonStyle, { backgroundColor: colors.green }]}
                    titleStyle={[commonStyles.fontButton, { fontSize: 16 }]}
                    containerStyle={styles.modalButton}
                    onPress={colorEvent}
                  />

                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </Principal>
  )
}

const styles = StyleSheet.create({
  textTile: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.blue,
    textAlign: 'center',
    maxWidth: '100%',
    marginTop: 20

  },
  boxStyles: {
    backgroundColor: colors.base,
    marginHorizontal: '10%',
    marginTop: '10%',
    borderColor: colors.blue,
    color: colors.blue
  },

  boxListStyles: {
    backgroundColor: colors.base,
    marginHorizontal: '10%',
    marginTop: '5%',
    marginBottom: '3%',
    borderColor: colors.blue,
    color: colors.blue
  },
  calendar: {
    //backgroundColor: 'yellow',
    height: 400,
    width: 400,
    borderColor: 'blue',
    marginTop: '10%'
  },
  textDescription: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.lightBlue,
    textAlign: 'center',
    maxWidth: '100%',
    marginTop: 10
  },
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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
  colorContainer: {
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    //backgroundColor: 'yellow',
    flexDirection: 'row'
  },
  colorBox: {
    width: 30,
    height: 30,
    borderRadius: 8,
    marginVertical: '2%',
  },
  textBox: {
    //backgroundColor:'blue',
    padding: '3%',
    marginLeft: '2%',
    color: colors.blue,
    fontWeight: 'bold'
  },
  containerBox: {
    marginTop: '5%'
  }
})