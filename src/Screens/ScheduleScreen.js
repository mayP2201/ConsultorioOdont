import { View, Text, StyleSheet, Alert, Modal, Pressable } from 'react-native'
import React, { useState } from 'react'
import Calendar from 'react-native-big-calendar'
import Principal from '../components/Principal';
import { SelectList } from 'react-native-dropdown-select-list';
import { colors, commonStyles } from '../common/globalStyle';
import { ScrollView } from 'react-native-gesture-handler';
import ModalC from '../components/ModalC';

export const Schedule = ({ navigation }) => {
  const [selectDoctor, setSelectDoctor] = useState(null);
  const [isEvent, setIsEvent] = useState(false);
  const [event, setEvent] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);

  const data = [
    { key: '1', value: 'Pablo Arias' },
    { key: '2', value: 'Lily Arias' },
    { key: '3', value: 'Maria Perez' },
  ]

  const events = [
    {
      start: new Date(2023, 5, 19, 9, 0),
      end: new Date(2023, 5, 19, 11, 0),
    },
    {
      start: new Date(2023, 5, 20, 10, 0),
      end: new Date(2023, 5, 20, 12, 0),
    },
  ]

  const selectAppointment = (event) => {
    setSelectedCell(event.start.toString());
    // console.log(event.start.toString());
    setModalVisible(true);
  };

  const doctorSelector = (selectDoctor) => {
    setSelectDoctor(selectDoctor);
  };

  const eventCellStyleGetter = ({ event, start, end }) => {

    if (selectedCell && start.toString() === selectedCell) {
      return { backgroundColor: colors.blue };
    }
    return { backgroundColor: colors.green };
  };

  const buttonAceptModal = () => {
    // setIsEvent(true);
    setModalVisible(!modalVisible);
  }

  const buttonCancelModal = () => {
    setModalVisible(!modalVisible);
  }


  return (
    <Principal>
      <ScrollView>
        <View>
          <Text style={commonStyles.textTile}>CITAS</Text>
          <Text style={commonStyles.textDescription}>Selecciona una cita odontológica</Text>
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
              onPressEvent={selectAppointment}
              height={530}
              dayHeaderHighlightColor="lightblue"
              eventCellStyle={eventCellStyleGetter}
              hourRowHeight={50}
              style={{ backgroundColor: 'white', borderWidth: 1, borderColor: 'gray' }}
              headerContentStyle={{ paddingHorizontal: '5%', position: 'absolute' }}
              mode="week"
              weekStartsOn={1}
            />
          </View>
          <ModalC
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            onAccept={buttonAceptModal}
            onCancel={buttonCancelModal}
            modalText={`¿Estás seguro de tomar la cita con el doctor ${selectDoctor}? `}
            showCancelButton={true}
            imageModal={require('../../assets/question-mark.png')}
          />
        </View>
      </ScrollView>
    </Principal>
  )
}

const styles = StyleSheet.create({

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
    color: colors.blue,
  },
  calendar: {
    borderWidth: 1,
    borderColor: colors.blue,
    margin: '3%',
    borderWidth: 2,
    borderRadius: 15
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
    marginTop: '5%',
    margin: '7%'
  }
})