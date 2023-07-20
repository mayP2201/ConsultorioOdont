import React from 'react';
import { Text } from 'react-native';
import { View, StyleSheet } from 'react-native';
import Principal from '../components/Principal';
import { ScrollView } from 'react-native-gesture-handler';
import { colors, commonStyles } from '../common/globalStyle';
import { Row, Table, Cell, Rows } from 'react-native-table-component';
import { Button } from 'react-native-elements';
import { useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { CContext } from '../context/CContext';
import { useState } from 'react';
import ModalC from '../components/ModalC';


const Cancelar = ({ navigation }) => {

  const { token, userDataContext } = useContext(CContext);
  const [appointment, setAppointment] = useState([]);
  const [idAppointment, setIdAppointment] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessege] = useState(null);

  const getAppointmentAll = async () => {
    console.log("----userData", userDataContext);
    try {
      const response = await axios.get(
        'https://endpointsco-production.up.railway.app/api/getAppointmentsUser',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("---->DATOS GENERALES DE CITA--->", response.data);
      const allAppointments = response.data.flat(); // Aplanar el array anidado
      const patientAppointments = allAppointments.filter(
        (appointment) => appointment.id_patient == userDataContext.identity_card_user &&
          appointment.id_status == 2
      );
      console.log("cita de miiiii perfil ", patientAppointments);
      setAppointment(patientAppointments);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAppointmentAll();
  }, []);

  const cancelAppointment = async (id_cita) => {
    try {
      const response = await axios.post(
        `https://endpointsco-production.up.railway.app/api/cancelAppointment/${id_cita}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("cancelar cita -->", response.data);
      setMessege(response.data.message);
    } catch (error) {
      console.log("error tomar citas", error);

    }
  };

  const tableHead = ['Fecha', 'Hora', 'Acción'];
  const tableData = appointment.map((appoint) => [
    appoint.date,
    appoint.start_time,
    <View style={commonStyles.containerButton}>
      <Button
        title={"Cancelar"}
        buttonStyle={[commonStyles.buttonStyle, { backgroundColor: colors.violet }]}
        containerStyle={[commonStyles.introButton, { width: '95%', marginTop: '5%', }]}
        titleStyle={[commonStyles.fontButton, { fontWeight: 800, fontSize: 13, marginTop: '5%', marginBottom: '5%' }]}
        onPress={() => {
          setIdAppointment(appoint.id);
          setModalVisible(true);
        }}
      />
    </View>
  ]);

  
  buttonAceptModal = () =>{
    cancelAppointment(idAppointment);
    setModalVisible(false);

  }
  console.log("id de la cita para cancelar", idAppointment);

  const showMessage = () => {
    setTimeout(() => {
      setMessege('');
    }, 5000);
  };

  const buttonAppointmentModal = (navigate) => {
    cancelAppointment(idAppointment);
    navigation.navigate("Schedule");
  }

  return (
    <Principal>
      <ScrollView>
        <View>
          <Text style={commonStyles.textTile}>LISTA DE CITAS</Text>
          <Text style={commonStyles.textDescription}>Cancela tu cita aqui</Text>
          <Text>{message} {showMessage()}</Text>
          <View style={styles.containerTable}>
            <Table borderStyle={{ borderWidth: 2, borderRadius: 15 }}>
              <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
              {tableData.map((rowData, index) => (
                <Row key={index} data={rowData} style={styles.row} textStyle={styles.text} />
              ))}
            </Table>
          </View>
          <ModalC
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            onAccept={buttonAceptModal}
            onCancel={buttonAppointmentModal}
            modalText={"¿ Estás seguro de cancelar o deseas reagendar tu cita odontológica?"}
            showCancelButton={true}
            imageModal={require('../../assets/checked.png')}
            acceptButtonText="Aceptar"
            cancelButtonText="Reagendar"
          />
        </View>
      </ScrollView>
    </Principal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  containerTable: {
    marginTop: '10%',
    marginHorizontal: '5%',
  },
  head: {
    height: 40,
    backgroundColor: colors.light,

  },
  headText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.base
  },
  row: {
    height: 70,
  },
  text: {
    margin: '5%',
    textAlign: 'center',
  },
})

export default Cancelar;
