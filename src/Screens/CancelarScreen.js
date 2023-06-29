import React from 'react';
import { Text } from 'react-native';
import { View, StyleSheet } from 'react-native';
import Principal from '../components/Principal';
import { ScrollView } from 'react-native-gesture-handler';
import { commonStyles } from '../common/globalStyle';
import { Row, Table } from 'react-native-table-component';
import { Button } from 'react-native-elements';

const Cancelar = () => {
    const tableHead = [ 'Fecha','Hora', 'Dentista',  'Cancelar'];
    const tableData = [ "12-12-2023",'10:00',"Lilian Arias",  <Button title='Cancelar'></Button>];
    return (
        <Principal>
            <ScrollView>
                <View>
                    <Text style={commonStyles.textTile}>LISTA DE CITAS</Text>
                    <Text style={commonStyles.textDescription}>Cancela tu cita aqui</Text>
                    <Table style={{ backgroundColor: 'yellow', margin: '2%', borderWidth: 2 }}>
                        <Row data={tableHead}  />
                        <Row
                            data={tableData}
                            onPress={(rowIndex) => handleCancelAppointment(rowIndex)}
                            
                        />

                    </Table>
                </View>
            </ScrollView>
        </Principal>
    );
}

const styles = StyleSheet.create({


})

export default Cancelar;
