import React from 'react';
import { Text } from 'react-native';
import { View, StyleSheet } from 'react-native';
import Principal from '../components/Principal';
import { ScrollView } from 'react-native-gesture-handler';
import { colors, commonStyles } from '../common/globalStyle';
import { Row, Table, Cell, Rows } from 'react-native-table-component';
import { useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { CContext } from '../context/CContext';
import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import { color } from 'react-native-reanimated';


const InformationAppointment = () => {

  const { token, userDataContext, handleChangevisibleModal } = useContext(CContext);
  const [appointment, setAppointment] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const getAppointmentAll = async () => {
    handleChangevisibleModal(true);
    try {
      const response = await axios.get(
        'https://endpointsco-production.up.railway.app/api/getAppointmentsUser',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (Array.isArray(response.data) && response.data.length > 0) {
        const allAppointments = response.data.flat();
        const patientAppointments = allAppointments.filter(
          (appointment) =>
            appointment.identity_card_user == userDataContext.identity_card_user &&
            appointment.id_status == 2
        );
        patientAppointments.sort((a, b) => new Date(a.date) - new Date(b.date));
        // Obtener los IDs de los pacientes de las citas
        const patientIds = patientAppointments.map((appointment) => appointment.id_patient);

        // Realizar una consulta para obtener los nombres y apellidos de los pacientes
        const patientNamesPromises = patientIds.map((id) =>
          axios.get(`https://endpointsco-production.up.railway.app/api/get-user/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        );
        const patientNamesResponses = await Promise.all(patientNamesPromises);
        const patientNames = patientNamesResponses.map((response) => {
          const patientData = response.data;
          return `${patientData.names} ${patientData.surnames}`;
        });

        // Combinar los datos de las citas con los nombres de los pacientes
        const combinedData = patientAppointments.map((appointment, index) => ({
          id: appointment.id,
          id_patient: appointment.id_patient,
          patientName: patientNames[index],
          date: appointment.date,
          time: appointment.start_time,
        }));

        setAppointment(combinedData);
        handleChangevisibleModal(false);
      }
      else {
        handleChangevisibleModal(false);
      }
    } catch (error) {
      handleChangevisibleModal(false);
      console.log(error);

    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Hacer algo cuando la pantalla está enfocada
      console.log('La pantalla está enfocada');
      getAppointmentAll();

      return () => {
        // Hacer algo cuando la pantalla se desenfoca
        console.log('La pantalla se desenfoca');
      };
    }, [])
  );

  useEffect(() => {
    getAppointmentAll();
  }, []);

  const handleSearch = (query) => {

    setSearchQuery(query);
    const queryNumber = parseInt(query);
    if (Array.isArray(appointment) && appointment.length > 0) {
      const filteredResults = appointment.filter(
        (appoint) =>
          appoint.id_patient == queryNumber
      );

      const tableData = filteredResults.map((appoint) => [
        appoint.id_patient,
        appoint.patientName,
        appoint.date,
        appoint.time,
      ]);

      setFilteredData(tableData);
    } else {
      setFilteredData(appointment);
    }
  };

  const tableHead = ['Cédula', 'Nombre del Paciente', 'Fecha', 'Hora'];
  const tableData = appointment.map((appoint) => [
    appoint.id_patient,
    appoint.patientName,
    appoint.date,
    appoint.time,
  ]);

  return (
    <Principal>
      <ScrollView>
        <View>
          <View style={{
            marginHorizontal: '8%',
            marginTop: '5%'
          }}>
            <Searchbar
              placeholder="Buscar por cédula"
              style={{
                backgroundColor: 'white',
              }}
              inputStyle={{
                color: colors.blue,
              }}
              iconColor={colors.blue}
              placeholderTextColor={colors.lightBlue}
              value={searchQuery}
              onChangeText={handleSearch}
              mode='view'
            />
          </View>
          <Text style={commonStyles.textTile}>LISTA DE CITAS</Text>
          <Text style={commonStyles.textDescription}>Listado de citas pendientes</Text>
          <View style={styles.contentPatient}>
            <Text style={styles.patient}>Odont: </Text>
            <Text style={styles.namePatient}>{userDataContext.names} {userDataContext.surnames}</Text>
          </View>
          <View style={styles.containerTable}>
            <Table borderStyle={{ borderWidth: 1, borderColor: colors.blue }}>
              <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
              {
                filteredData.length > 0
                  ? filteredData.map((rowData, index) => (
                    <Row key={index} data={rowData} style={styles.row} textStyle={styles.text} />
                  ))
                  : tableData.map((rowData, index) => (
                    <Row key={index} data={rowData} style={styles.row} textStyle={styles.text} />
                  ))
              }
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
    color: colors.blue,
    fontSize: 12
  },
  contentPatient: {
    flex: 1,
    flexDirection: 'row',
    //backgroundColor:'yellow', 
    marginLeft: '5%',
    marginTop: '10%'
  },

  patient:
  {
    color: colors.blue,
    fontWeight: 'bold'
  },

  namePatient: {
    color: colors.lightBlue
  },
})

export default InformationAppointment;
