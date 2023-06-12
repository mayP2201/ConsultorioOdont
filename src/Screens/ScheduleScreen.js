import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Calendar from 'react-native-big-calendar'
import Principal from '../components/Principal';

const events = [
  {
    title: 'Disponible',
    start: new Date(2023, 5, 12, 9, 0),
    end: new Date(2023, 5, 12, 10, 0),
  },
  {
    title: 'Disponible',
    start: new Date(2023, 5, 14, 10, 0),
    end: new Date(2023, 5, 14, 11, 0),
  },
  {
    title: 'Disponible',
    start: new Date(2023, 5, 15, 10, 0),
    end: new Date(2023, 5, 15, 11, 0),
  },
]

export const Schedule = ({ navigation }) => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleAppointmentPress = (event) => {
    setSelectedAppointment(event);
    // Realiza cualquier acción adicional que desees al seleccionar una cita
  };
  return (
    <Principal>
      <View>
        <Text>Schedule</Text>
        <Calendar events={events}  height={600}
        onPressEvent={handleAppointmentPress}/>
      </View>
    </Principal>
  )
}