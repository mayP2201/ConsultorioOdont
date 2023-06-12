import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../common/globalStyle';

const Principal = ({ children }) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#D6ECF5', '#97DEFC']}
                start={{ x: 0, y: 0.20 }}
                end={{ x: 0, y: 0.80 }}
                style={styles.gradient}>
                <View style={styles.contentContainer}>
                    {children}
                </View>
            </LinearGradient>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
      },
      contentContainer: {
        flex: 1,
      },



});

export default Principal;
