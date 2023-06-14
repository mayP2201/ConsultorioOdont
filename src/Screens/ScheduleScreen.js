import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import Calendar from 'react-native-big-calendar'
import Principal from '../components/Principal';
import { SelectList } from 'react-native-dropdown-select-list';
import { colors } from '../common/globalStyle';


export const Schedule = ({ navigation }) => {
  const [selectDoctor, setSelectDoctor ]  = useState(null);
  const [isEvent, setIsEvent] = useState(false);
  const [event, setEvent] = useState(false);
  const data = [
    { key: '1', value: 'Pablo Arias' },
    { key: '2', value: 'Lily Arias' },
    { key: '3', value: 'Maria Perez' },

  ]
  const handleAppointmentPress = (event) => {
    console.log(event);
    if(setEvent(event)){
      setIsEvent(true);
    }else{
      setIsEvent(false);
    }

  };
  const doctorSelector = (selectDoctor) => {
    setSelectDoctor(selectDoctor);
  }

  const events = [
    {
      title: isEvent ? "Disponible" : "No disponible",
      start: new Date(2023, 5, 14, 9, 0),
      end: new Date(2023, 5, 14, 11, 0),
    },
    {
      title: 'Disponible',
      start: new Date(2023, 5, 15, 10, 0),
      end: new Date(2023, 5, 15, 12, 0),
    },
  ]
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