import "react-native-gesture-handler";
import { Dimensions, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/Screens/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './src/Screens/RegisterScreen';
import RecoverPassword from './src/Screens/RecoverPasswordScreen';
import Code from './src/Screens/CodeScreen';
import NewPassword from './src/Screens/NewPasswordScreen';
import { DrawerContentScrollView, createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Schedule } from "./src/Screens/ScheduleScreen";
import Information from "./src/Screens/InformationScreen";
import { Profile } from "./src/Screens/ProfileScreen";
import Cancelar from "./src/Screens/CancelarScreen";
import { CStates } from "./src/context/CStates";
import UpdatePassword from "./src/Screens/updatePasswordScreen";
import InformationAppointment from "./src/Screens/InformationAppointmentScreen";
import React, { useContext, useState } from 'react';
import { NotificationsScreen } from "./src/Screens/NotificationsScreen";
import ButtonLogOut from "./src/components/ButtonLogOut";
import MenuButtons from "./src/components/MenuButtons";
import { Image } from "@rneui/themed";
import { colors, commonStyles } from "./src/common/globalStyles";
import { CContext } from "./src/context/CContext";
import { useEffect } from "react";

const Stack = createStackNavigator();
const StackLogin = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const StackAuthenticated = createNativeStackNavigator();


const MenuItems = ({ navigation }) => {
  return (
    <DrawerContentScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerArea}>
      </View>
      <Image
        source={require("./assets/logo.png")}
        style={{
          width: Dimensions.get("window").width * (450 / 1000),
          height: Dimensions.get("window").height * (100 / 1000) + StatusBar.currentHeight,
          margin: '5%',

        }}
      />

      <MenuButtons
        text={"Citas"}
        onPress={() => navigation.navigate("DrawerHorario")}
        name={"calendar-month-outline"}
        type={"material-community"}
      />

      <MenuButtons
        text="Información"
        onPress={() => navigation.navigate("DrawerInfo")}
        name={"tooth-outline"}
        type={"material-community"}
      />

      <MenuButtons
        text="Perfil"
        onPress={() => navigation.navigate("DrawerProfile")}
        name={"user"}
        type={"antdesign"}
      />

      <MenuButtons
        text="Lista de Citas"
        onPress={() => navigation.navigate("DrawerCancelar")}
        name={"clipboard-text-outline"}
        type={"material-community"}
        size={26}
      />

      {/*<MenuButtons
        text="Notificaciones"
        onPress={() => navigation.navigate("DrawerNotofications")}
        name={"trophy"}
        type={"foundation"}
        size={26}
      />*/}

      <ButtonLogOut text={'Cerrar Sesión'} onPress={() => navigation.replace('Login')}
        name={'deleteuser'} type={'antdesign'} />

    </DrawerContentScrollView>
  );
}

const MenuItems1 = ({ navigation }) => {
  return (
    <DrawerContentScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerArea}>
      </View>
      <Image
        source={require("./assets/logo.png")}
        style={{
          width: Dimensions.get("window").width * (450 / 1000),
          height: Dimensions.get("window").height * (100 / 1000) + StatusBar.currentHeight,
          margin: '5%',

        }}
      />


      <MenuButtons
        text="Perfil"
        onPress={() => navigation.navigate("DrawerProfile")}
        name={"user"}
        type={"antdesign"}
      />

      <MenuButtons
        text="Lista de Citas"
        onPress={() => navigation.navigate("DrawerInfoApp")}
        name={"clipboard-text-outline"}
        type={"material-community"}
        size={26}
      />

      {/*<MenuButtons
        text="Notificaciones"
        onPress={() => navigation.navigate("DrawerNotofications")}
        name={"trophy"}
        type={"foundation"}
        size={26}
      />*/}

      <ButtonLogOut text={'Cerrar Sesión'} onPress={() => navigation.replace('Login')}
        name={'deleteuser'} type={'antdesign'} />

    </DrawerContentScrollView>
  );
}

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <MenuItems {...props} />}
      screenOptions={{
        drawerStyle: {
          // marginTop: -15,
          width: Dimensions.get("window").width / 2,
        },
      }}
    >
      <Drawer.Screen
        name='  '
        component={Schedule}
        // options={{ title: 'Horario', headerShown: true, drawerItemStyle: { display: 'none' } }} 
        options={commonStyles.containerMenuItems} />
      <Drawer.Screen
        name='DrawerHorario'
        component={Schedule}
        // options={{ title: 'Citas', headerShown: true, }} 
        options={commonStyles.containerMenuItems}
      />
      <Drawer.Screen
        name='DrawerInfo'
        component={Information}
        // options={{ title: 'Informacion', headerShown: true, }} 
        options={commonStyles.containerMenuItems}
      />
      <Drawer.Screen
        name='DrawerProfile'
        component={ProfileView}
        // options={{ title: 'Perfil', headerShown: true, }} 
        options={commonStyles.containerMenuItems}
      />
      <Drawer.Screen
        name='DrawerCancelar'
        component={CitesView}
        // options={{ title: 'Lista de citas', headerShown: true, }}
        options={commonStyles.containerMenuItems} />
      <Drawer.Screen
        name='DrawerNotofications'
        component={NotificationsScreen}
        // options={{ title: 'Notificaciones', headerShown: true, }}
        options={commonStyles.containerMenuItems} />
      <Drawer.Screen
        name='DrawerInfoApp'
        component={InformationAppointment}
        // options={{ title: 'InfoApp', headerShown: true, }}
        options={commonStyles.containerMenuItems} />
    </Drawer.Navigator>
  );
}

const DrawerNav1 = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <MenuItems1 {...props} />}
      screenOptions={{
        drawerStyle: {
          // marginTop: -15,
          width: Dimensions.get("window").width / 2,
        },
      }}
    >
      <Drawer.Screen
        name='DrawerInfoApp'
        component={InformationAppointment}
        // options={{ title: 'InfoApp', headerShown: true, }}
        options={commonStyles.containerMenuItems} />
      <Drawer.Screen
        name='DrawerProfile'
        component={ProfileView}
        // options={{ title: 'Perfil', headerShown: true, }} 
        options={commonStyles.containerMenuItems}
      />
    </Drawer.Navigator>
  );
}

const ProfileView = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="DrawerProfile" component={Profile} />
      <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
    </Stack.Navigator>
  );
}

const CitesView = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="DrawerCancelar" component={Cancelar} />
      <Stack.Screen name="Schedule" component={Schedule} />
      <Stack.Screen name="HorarioDetalle" component={Schedule} />
    </Stack.Navigator>
  );
}

const RegistroNav = () => {
  return (
    <StackLogin.Navigator>
      <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
      <Stack.Screen name='Horario' component={DrawerNav} options={{ headerShown: false }} />
      <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
      <Stack.Screen name='RecoverPassword' component={RecoverPassword} options={{ headerShown: false }} />
      <Stack.Screen name='Code' component={Code} options={{ headerShown: false }} />
      <Stack.Screen name='NewPassword' component={NewPassword} options={{ headerShown: false }} />
      <Stack.Screen name='UpdatePassword' component={UpdatePassword} options={{ headerShown: false }} />
      <Stack.Screen name='Schedule' component={Schedule} options={{ headerShown: false }} />
    </StackLogin.Navigator>
  );
}
const UnAtentication = () => {
  return (
    <StackLogin.Navigator>
      <StackLogin.Screen name='Login' component={Login} options={{ headerShown: false }} />
      <StackLogin.Screen name='Register' component={Register} options={{ headerShown: false }} />
      <StackLogin.Screen name='RecoverPassword' component={RecoverPassword} options={{ headerShown: false }} />
      <StackLogin.Screen name='Code' component={Code} options={{ headerShown: false }} />
      <StackLogin.Screen name='NewPassword' component={NewPassword} options={{ headerShown: false }} />
    </StackLogin.Navigator>
  )
}

const Autenticator = () => {
  return (
    <StackAuthenticated.Navigator>
      <StackAuthenticated.Screen name='Horario' component={DrawerNav} options={{ headerShown: false }} />
      <StackAuthenticated.Screen name='UpdatePassword' component={UpdatePassword} options={{ headerShown: false }} />
      <StackAuthenticated.Screen name='Schedule' component={Schedule} options={{ headerShown: false }} />
      <StackAuthenticated.Screen name='Login' component={Login} options={{ headerShown: false }} />
    </StackAuthenticated.Navigator>
  )
}

const AutenticatorPatient = () => {
  return (
    <StackAuthenticated.Navigator>
      <StackAuthenticated.Screen name='Horario' component={DrawerNav} options={{ headerShown: false }} />
      <StackAuthenticated.Screen name='Schedule' component={Schedule} options={{ headerShown: false }} />
      <StackAuthenticated.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
      <StackAuthenticated.Screen name='Información' component={Information} options={{ headerShown: false }} />
      <StackAuthenticated.Screen name='CancelarApp' component={Cancelar} options={{ headerShown: false }} />
      <StackAuthenticated.Screen name='UpdatePassword' component={UpdatePassword} options={{ headerShown: false }} />
      <StackAuthenticated.Screen name='Login' component={Login} options={{ headerShown: false }} />
    </StackAuthenticated.Navigator>
  )
}

const AutenticatorDoctor = () => {
  return (
    <StackAuthenticated.Navigator>
      <StackAuthenticated.Screen name='Horario' component={DrawerNav1} options={{ headerShown: false }} />
      <StackAuthenticated.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
      <StackAuthenticated.Screen name='UpdatePassword' component={UpdatePassword} options={{ headerShown: false }} />
      <StackAuthenticated.Screen name='Login' component={Login} options={{ headerShown: false }} />
    </StackAuthenticated.Navigator>
  )
}

const InitFunction = () => {
  const { userDataContext } = useContext(CContext);
  useEffect(() => {
    console.log("user Context -->", userDataContext);
  }, [userDataContext]);

  if (!userDataContext) {
    return (

      <NavigationContainer>
        {/* {flag ? <DrawerNav /> : <RegistroNav />} */}
        <UnAtentication></UnAtentication>
      </NavigationContainer>

    )
  }
  if (userDataContext.rol_id == 2) {
    return (

      <NavigationContainer>
        {/* {flag ? <DrawerNav /> : <RegistroNav />} */}
        <AutenticatorDoctor></AutenticatorDoctor>
      </NavigationContainer>

    )
  }
  return (

    <NavigationContainer>
      {/* {flag ? <DrawerNav /> : <RegistroNav />} */}
      <AutenticatorPatient></AutenticatorPatient>
    </NavigationContainer>


  );
}
export default function App() {

  return (
    <CStates>
      <InitFunction></InitFunction>
    </CStates>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base,
    //marginTop: -3.9,
    height: Dimensions.get("window").height + StatusBar.currentHeight,
  },
  headerArea: {
    backgroundColor: colors.light,
    height: Dimensions.get("window").height * (99 / 1000),
    marginTop: -34,
  },
  logo: {
    marginLeft: 10,
  },
});
