import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Calendar from 'react-native-big-calendar'
import Principal from '../components/Principal';
import { SelectList } from 'react-native-dropdown-select-list';
import { colors } from '../common/globalStyle';

const events = [
  {
    title: 'Disponible',
    start: new Date(2023, 5, 14, 9, 0),
    end: new Date(2023, 5, 14, 11, 0),
  },
  {
    title: 'Disponible',
    start: new Date(2023, 5, 15, 10, 0),
    end: new Date(2023, 5, 15, 12, 0),
  },
]


export const Schedule = ({ navigation }) => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const { selectDoctor, setSelectDoctor } = useState("");
  const data = [
    { key: '1', value: 'Juan' },
    { key: '2', value: 'Lily' },
    { key: '3', value: 'Maria' },

  ]
  const handleAppointmentPress = (event) => {
    setSelectedAppointment(event);
  };
  const doctorSelector = (selectDoctor) => {
    setSelectDoctor(selectDoctor);
  }
  return (
    <Principal>
      <View>
        <Text style={styles.textTile}>CITAS</Text>
        <Text style={styles.textDescription}>Selecciona una cita odontológica</Text>
        <SelectList
          data={data}
          setSelected={doctorSelector}
          boxStyles={styles.boxStyles}
          inputStyles={{ color: colors.blue }}
          onSelect={()=>alert(selectDoctor)}
          dropdownStyles={styles.boxListStyles}
          placeholder='Selecciona un odontólogo'
        />
        <View style={styles.calendar}>
          <Calendar
            events={events}
            onPressEvent={handleAppointmentPress}
            height={100}
            dayHeaderHighlightColor="lightblue"
            eventCellStyle={{ backgroundColor: colors.violet }}
          />
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

  boxListStyles:{    
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
    marginTop:'10%'
  },
  textDescription: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.lightBlue,
    textAlign: 'center',
    maxWidth: '100%',
    marginTop: 10


  },
})