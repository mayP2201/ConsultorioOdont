import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../common/globalStyle';
import Principal from '../components/Principal';
import { ScrollView } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { color } from 'react-native-reanimated';
import { Touchable } from 'react-native';

const Information = () => {
    return (
        <Principal>
            <ScrollView>
                <View>
                    <Text style={commonStyles.textTile}>BIENVENIDO A ODONTOARIAS</Text>
                    <Text style={commonStyles.textDescription}>Presentación de nuestros profesionales</Text>
                    <View style={styles.containerP}>
                        <Card containerStyle={styles.cardContainer}>
                            <Card.Title style={styles.titleCard}>Dr. Pablo Arias</Card.Title>
                            <Card.Divider style={{ backgroundColor: colors.blue }} />
                            <Card.FeaturedSubtitle style={styles.subtitleCard}>Odontólogo</Card.FeaturedSubtitle>
                            <View style={styles.imgContainer}>
                                <Card.Image style={styles.img} resizeMode='center' source={require('../../assets/o1.jpg')}></Card.Image>
                                <Text style={styles.desc}>"Soy un odontólogo comprometido con la salud dental. Con experiencia
                                    en diagnóstico y tratamiento, ofrezco soluciones personalizadas para problemas dentales.
                                    Mi objetivo es brindar atención de calidad, educar a mis pacientes y ayudarles a mantener
                                    una sonrisa saludable. Utilizo tecnología avanzada y enfoques actualizados para garantizar
                                    resultados óptimos. ¡Estoy aquí para cuidar de tu sonrisa!"
                                </Text>
                            </View>
                        </Card>
                        <Card containerStyle={styles.cardContainer}>
                            <Card.Title style={styles.titleCard}>Dr. Pablo Arias</Card.Title>
                            <Card.Divider style={{ backgroundColor: colors.blue }} />
                            <Card.FeaturedSubtitle style={styles.subtitleCard}>Odontólogo</Card.FeaturedSubtitle>
                            <View style={styles.imgContainer}>
                                <Card.Image style={styles.img} resizeMode='center' source={require('../../assets/o1.jpg')}></Card.Image>
                                <Text style={styles.desc}>"Soy un odontólogo comprometido con la salud dental. Con experiencia
                                    en diagnóstico y tratamiento, ofrezco soluciones personalizadas para problemas dentales.
                                    Mi objetivo es brindar atención de calidad, educar a mis pacientes y ayudarles a mantener
                                    una sonrisa saludable. Utilizo tecnología avanzada y enfoques actualizados para garantizar
                                    resultados óptimos. ¡Estoy aquí para cuidar de tu sonrisa!"
                                </Text>
                            </View>
                        </Card>
                        <Card containerStyle={styles.cardContainer}>
                            <Card.Title style={styles.titleCard}>Dr. Pablo Arias</Card.Title>
                            <Card.Divider style={{ backgroundColor: colors.blue }} />
                            <Card.FeaturedSubtitle style={styles.subtitleCard}>Odontólogo</Card.FeaturedSubtitle>
                            <View style={styles.imgContainer}>
                                <Card.Image style={styles.img} resizeMode='center' source={require('../../assets/o1.jpg')}></Card.Image>
                                <Text style={styles.desc}>"Soy un odontólogo comprometido con la salud dental. Con experiencia
                                    en diagnóstico y tratamiento, ofrezco soluciones personalizadas para problemas dentales.
                                    Mi objetivo es brindar atención de calidad, educar a mis pacientes y ayudarles a mantener
                                    una sonrisa saludable. Utilizo tecnología avanzada y enfoques actualizados para garantizar
                                    resultados óptimos. ¡Estoy aquí para cuidar de tu sonrisa!"
                                </Text>
                            </View>
                        </Card>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoTextContent}>
                            <Text style={[styles.infoText,{textAlign:'left',fontWeight:'bold'}]}>Atención: </Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%'
    },
    infoTextContent: {
        //backgroundColor: 'yellow',
        margin: '2%',
        padding: '2%'
    },
    infoText: {
        textAlign: 'center',
        fontSize:14,
        color:colors.blue
        
    },
    textWeb: {
        textAlign: "center",
        fontSize: 14,
        fontStyle: "italic",
        color: colors.light,
        textDecorationLine: "underline",
        fontSize:16,
        color:colors.blue
    },


})

export default Information;
