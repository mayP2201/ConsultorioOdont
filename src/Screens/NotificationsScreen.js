import React from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Button, Text } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { CContext } from '../context/CContext';

export const NotificationsScreen = () => {
    const [activeDate, setActiveDate] = useState(new Date());
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const { token, userDataContext } = useContext(CContext);
    const [appointment, setAppointment] = useState([]);
    const [idAppointment, setIdAppointment] = useState(null);

    const getAppointmentAll = async () => {
        try {
            const response = await axios.get(
                'https://endpointsco-production.up.railway.app/api/getAppointmentsUser',
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log("---->DATOS GENERALES DE CITA--->", response.data); //todas las citas 
            const allAppointments = response.data.flat();
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


    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });
    // Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
    async function sendPushNotification(expoPushToken) {
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'Recordatorio cita odontológica',
            body: 'Usted tiene una cita mañan xd',
            data: { someData: 'goes here' },
        };

        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
    }

    async function registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            // Agrega el projectId en el segundo parámetro de getExpoPushTokenAsync
            token = (await Notifications.getExpoPushTokenAsync({ projectId: 'e063b1df-cfaa-4e26-9303-65ba225954e3' })).data;
            console.log('Expo Push Token:', token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }

    function getDateTwoDaysBefore(dateString) {
        const date = new Date(dateString);
        date.setDate(date.getDate() - 2);
        date.setHours(18);
        date.setMinutes(26);
        return date;
      }
      
      useEffect(() => {
        // Obtener el token de notificaciones y configurar los listeners
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // Agregar los listeners para recibir notificaciones entrantes y manejar las respuestas de notificaciones
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        // Enviar las notificaciones automáticamente
        const dateArray = appointment.map(app => ({
            id: app.id,
            date: getDateTwoDaysBefore(app.date),
        }));
          
        const today = new Date();
        console.log("Día de hoy:", today);
        console.log("Datos para enviar notificación:", dateArray);
        
        dateArray.forEach(dates => {
            if (today.getTime() === dates.date.getTime()) {
                sendPushNotification(expoPushToken);
            }
        });

        // Importante: Limpiar los listeners cuando el componente se desmonte
        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

   
    return (
        <View style={{ flex: 1 }}>
            <Text>NotificationsScreen</Text>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
                <Text>Your expo push token: {expoPushToken}</Text>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Title: {notification && notification.request.conrtent.title} </Text>
                    <Text>Body: {notification && notification.request.content.body}</Text>
                    <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
                </View>
                <Button
                    title="Press to Send Notification"
                    
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})


