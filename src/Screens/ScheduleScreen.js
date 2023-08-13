import { View, Text, StyleSheet, Platform } from 'react-native'
import React, { useState, useRef, useEffect, useContext } from 'react'
import Calendar from 'react-native-big-calendar'
import Principal from '../components/Principal';
import { SelectList } from 'react-native-dropdown-select-list';
import { colors, commonStyles } from '../common/globalStyle';
import { ScrollView } from 'react-native-gesture-handler';
import ModalC from '../components/ModalC';
import { CContext } from '../context/CContext';
import axios from 'axios';
import ReturnButton from '../components/ReturnButton';

export const Schedule = ({ navigation }) => {
  const [selectDoctor, setSelectDoctor] = useState(null);
  const {
    token, appointmentContext, doctorDataContext, handleChangeappointmentContext, handleChangevisibleModal, handleChangedoctorDataContext
  } = useContext(CContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [appointmentData, setAppointmentData] = useState([]);
  const [data, setData] = useState([]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [message, setMessege] = useState('');

  const getDoctorData = async () => {
    handleChangevisibleModal(true);
    try {
      const response = await axios.get(
        `https://endpointsco-production.up.railway.app/api/get-users/${2}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      handleChangedoctorDataContext(response.data);
      //console.log(response.data);
      const doctor = response.data[0];
      const opcionDoctor = doctor.map(
        doctor => ({
          key: doctor.identity_card_user,
          value: `${doctor.names} ${doctor.surnames}`
        })
      );
      //console.log(opcionDoctor);
      setData(opcionDoctor);
      handleChangevisibleModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDoctorData();
    handleChangeappointmentContext(appointmentData);
  }, []);

  const getAppointment = async (idDoctor) => {
    handleChangevisibleModal(true);
    try {
      const response = await axios.get(
        `https://endpointsco-production.up.railway.app/api/getAppointmentsByDentist/${idDoctor}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAppointmentData(response.data);
      //console.log(response.data);
      handleChangevisibleModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const takeAppointment = async (id_cita) => {
    try {
      console.log("token", token);
      console.log("id_cita", id_cita);
      const response = await axios.post(
        `https://endpointsco-production.up.railway.app/api/scheduleAppointment/${id_cita}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("tomar cita actualizacion -->", response.data);
    } catch (error) {
      console.log("error tomar citas", error);

    }
  };

  const selectAppointment = (event) => {
    if (event.id_status == 1) {
      setModalVisible(true);
      setSelectedAppointmentId(event.id);
    }
    else {
      setMessege("Cita no disponible");
    }
  };

  const showMessage = () => {
    setTimeout(() => {
      setMessege('');
    }, 8000);
  };

  const doctorSelector = (selectDoctor) => {
    setSelectDoctor(selectDoctor);
    getAppointment(selectDoctor);
  };

  const structureEvents = () => {
    let events = [];
    if (appointmentData && appointmentData.length > 0) {
      events = appointmentData[0].map((appointment) => {
        const startDate = new Date(appointment.date + "T" + appointment.start_time);
        const endDate = new Date(appointment.date + "T" + appointment.end_time);
        return { start: startDate, end: endDate, id_status: appointment.id_status, id: appointment.id };
      });
    } else {
      console.log("citas no disponibles")
    }

    return events;
  };

  const eventsArray = structureEvents();

  const eventCellStyleGetter = (props) => {
    if (props.id_status === 1) {
      return { backgroundColor: colors.green };
    } else if (props.id_status === 2) {
      return { backgroundColor: colors.blue };
    }
  };
  const buttonAceptModal = async () => {
    setModalVisible(true);
    let result = Object.assign([], appointmentData);
    //console.log("result", result);
    result = result.map((item) => {
      return item.map((item) => {
        return {
          ...item,
          ...{
            id_status: selectedAppointmentId == item.id ? 2 : item.id_status
          }
        }
      })
    });
    takeAppointment(selectedAppointmentId);
    setAppointmentData(result);
    setModalVisible(false);
  };

  const buttonCancel = () => {
    setModalVisible(false);
  }

  return (
    <Principal>
      <ScrollView>
        <View>
          <Text style={commonStyles.textTile}>CITAS</Text>
          <Text style={commonStyles.textDescription}>Selecciona una cita odontológica</Text>
          <Text style={styles.cancel}>{message} {showMessage()}</Text>
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
              events={eventsArray}
              onPressEvent={selectAppointment}
              height={530}
              dayHeaderHighlightColor="lightblue"
              eventCellStyle={eventCellStyleGetter}
              hourRowHeight={50}
              style={{ backgroundColor: 'white', borderWidth: 1, borderColor: 'gray' }}
              headerContentStyle={{ paddingHorizontal: '5%', position: 'absolute' }}
              mode="custom"
              weekStartsOn={1}
              scrollOffsetMinutes={420}
            />
          </View>
          <ModalC
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            onAccept={buttonAceptModal}
            onCancel={buttonCancel}
            modalText="¿Esta seguro de tomar la cita odontológica?"
            showCancelButton={true}
            imageModal={require('../../assets/checked.png')}
            acceptButtonText="Aceptar"
            cancelButtonText="Cancelar"
          />
        </View>
      </ScrollView>
      <ReturnButton onPress={() => navigation.navigate("DrawerCancelar")}></ReturnButton>
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
  },
  cancel: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'red',
    fontSize: 12,
    marginTop: '5%'
  }

})