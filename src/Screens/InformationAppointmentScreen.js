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

const InformationAppointment = () => {

  const { token, userDataContext } = useContext(CContext);
  const [appointment, setAppointment] = useState([]);
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
        (appointment) => appointment.identity_card_user == userDataContext.identity_card_user &&
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
  const tableHead = ['Fecha', 'Hora', 'Acción'];
  const tableData = appointment.map((appoint) => [
    appoint.id,
    appoint.id_patient,
    appoint.date,
    appoint.start_time,
  ]);

  return (
    <Principal>
    <ScrollView>
      <View>
        <Text style={commonStyles.textTile}>LISTA DE CITAS</Text>
        <Text style={commonStyles.textDescription}>Listado de citas pendientes</Text>
        <Text>{userDataContext.names} {userDataContext.surnames}</Text>
        <View style={styles.containerTable}>
          <Table borderStyle={{ borderWidth: 2, borderRadius: 15 }}>
            <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
            {tableData.map((rowData, index) => (
              <Row key={index} data={rowData} style={styles.row} textStyle={styles.text} />
            ))}
          </Table>
        </View>
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

export default InformationAppointment;
