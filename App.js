import "react-native-gesture-handler";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/Screens/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './src/Screens/RegisterScreen';
import RecoverPassword from './src/Screens/RecoverPasswordScreen';
import Code from './src/Screens/CodeScreen';
import NewPassword from './src/Screens/NewPasswordScreen';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MenuNavForm } from "./src/Screens/MenuForm";
import {Schedule} from "./src/Screens/ScheduleScreen";
import Information from "./src/Screens/InformationScreen";
import { Profile } from "./src/Screens/ProfileScreen";
import Cancelar from "./src/Screens/CancelarScreen";


const Stack = createStackNavigator();
const StackLogin = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

////////////////////////// ----------------------- Navegación Drawer -------------------------------------------
const DrawerNav = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#E1F8EE',
          width: 240,
        },
      }}
    >
      <Drawer.Screen
        name='  '
        component={Schedule}
        options={{ title: 'Horario', headerShown: true, drawerItemStyle: { display: 'none' }}} />
      <Drawer.Screen
        name='DrawerHorario'
        component={Schedule}
        options={{ title: 'Citas', headerShown: true, }} />
        <Drawer.Screen
        name='DrawerInfo'
        component={Information}
        options={{ title: 'Informacion', headerShown: true, }} />
      <Drawer.Screen
        name='DrawerProfile'
        component={Profile}
        options={{ title: 'Perfil', headerShown: true, }} />
        <Drawer.Screen
        name='DrawerCancelar'
        component={Cancelar}
        options={{ title: 'Lista de citas', headerShown: true, }} />
      {/*<Drawer.Screen
        name='CerrarSesion'
        component={FinalizarSesion}
        options={{ title: 'Cerrar Sesión', headerShown: true, }} /> */}
    </Drawer.Navigator>
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
    </StackLogin.Navigator>
  );
}

/////////////////-------------------  MENU ---------------------------------------------------- 
const MenuNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#BA611F',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}>
      <Stack.Screen name='Menus' component={MenuNavForm}
        options={{ title: 'Menú Principal', headerShown: true, headerTitleAlign: 'center', }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      {/* {flag ? <DrawerNav /> : <RegistroNav />} */}
      <RegistroNav />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
