import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../common/globalStyle';
import Principal from '../components/Principal';
import { ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { useContext } from 'react';
import { CContext } from '../context/CContext';
import ReturnButton from '../components/ReturnButton';

const Information = ({navigation}) => {

  const { doctorDataContext } = useContext(CContext);
  console.log("--->>>datos doctores informacion -->", doctorDataContext);
  return (
    <Principal>
      <ScrollView>
        <View>
          <Text style={commonStyles.textTile}>BIENVENIDO A ODONTOARIAS</Text>
          <Text style={commonStyles.textDescription}>Presentación de nuestros profesionales</Text>
          <View style={styles.containerP}>
            {doctorDataContext.map((doctorArray, index) => (
              <View key={index}>
                {doctorArray.map((doctor, subIndex) => (
                  <Card containerStyle={styles.cardContainer} key={subIndex}>
                    <Card.Title style={styles.titleCard}>{doctor.names}</Card.Title>

                    <Card.Divider style={{ backgroundColor: colors.blue }} />
                    <Card.FeaturedSubtitle style={styles.subtitleCard}>Odontólogo</Card.FeaturedSubtitle>
                    <View style={styles.imgContainer}>
                      <Card.Image style={styles.img} resizeMode='center' source={{ uri: doctor.profile_picture_url }}></Card.Image>
                      <Text style={styles.desc}>{doctor.profesional_description}</Text>
                    </View>
                  </Card>
                ))}
              </View>
            ))}
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoTextContent}>
              <Text style={[styles.infoText, { textAlign: 'left', fontWeight: 'bold' }]}>Atención: </Text>
              <Text style={styles.infoText}>Lunes a Viernes </Text>
              <Text style={styles.infoText}>8:00 a 17:00</Text>
              <Text style={styles.infoText}>Para más información visita nuestra web</Text>
              <TouchableOpacity>
                <Text style={[styles.textWeb, { fontWeight: 'bold' }]}>www.odontoarias.com</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <ReturnButton onPress={() => navigation.goBack()} />
    </Principal>
  );
}


const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 15,
    borderColor: colors.lightBlue,
    margin: '3%'

  },
  containerP: {
    //backgroundColor:'yellow',
    margin: '5%'
  },

  img: {
    width: 200,
    height: 200,
  },
  imgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitleCard: {
    color: 'black',
    textAlign: 'center',
    fontSize: 14,
    color: colors.lightBlue
  },
  desc: {
    textAlign: 'justify',
    color: colors.blue
  },
  titleCard: {
    fontSize: 18,
    color: colors.blue
  },
  infoContainer: {
    backgroundColor: colors.base,
    flex:1,
    justifyContent:'flex-end',
    alignItems:'center',
  
  },
  infoTextContent: {
    //backgroundColor: 'yellow',
    margin: '2%',
    padding: '2%'
  },
  infoText: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.blue

  },
  textWeb: {
    textAlign: "center",
    fontSize: 14,
    fontStyle: "italic",
    color: colors.light,
    textDecorationLine: "underline",
    fontSize: 16,
    color: colors.blue
  },


})

export default Information;
