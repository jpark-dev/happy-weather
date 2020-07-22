import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const weatherOptions = {
  Haze: {
    iconName: "weather-hail",
    gradient: ["#4DA0B0", "#D39D38"],
  },
  Thundestorm: {
    iconName: "",
    gradient: [],
  },
  Drizzle: {
    iconName: "",
    gradient: [],
  },
  Rain: {
    iconName: "",
    gradient: [],
  },
  Snow: {
    iconName: "",
    gradient: [],
  },
  Atmosphere: {
    iconName: "",
    gradient: [],
  },
  Clear: {
    iconName: "",
    gradient: [],
  },
  Clouds: {
    iconName: "",
    gradient: [],
  },
  Dust: {
    iconName: "",
    gradient: [],
  },
  Mist: {
    iconName: "",
    gradient: [],
  },
};

export default function Weather({ temp, condition }) {
  console.log(temp);
  return (
    <LinearGradient
      // Button Linear Gradient
      colors={weatherOptions["Haze"].gradient}
      style={styles.container}
    >
      <StatusBar barStyle='white-content' />
      <View style={styles.halfContainer}>
        <MaterialCommunityIcons
          size={90}
          name={weatherOptions["Haze"].iconName}
          color='white'
        />
        <Text style={styles.temp}>{temp} C</Text>
      </View>
      <View style={styles.halfContainer} />
    </LinearGradient>
  );
}

Weather.propTypes = {
  temp: PropTypes.number.isRequired,
  condition: PropTypes.oneOf([
    "Thundestorm",
    "Drizzle",
    "Rain",
    "Snow",
    "Atmosphere",
    "Clear",
    "Clouds",
    "Haze",
    "Dust",
    "Mist",
  ]).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  temp: {
    fontSize: 32,
    color: "white",
  },
  halfContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
