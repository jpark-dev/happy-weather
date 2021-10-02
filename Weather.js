import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const weatherOptions = {
  Haze: {
    iconName: "weather-hail",
    gradient: ["#89F7FE", "#66A6FF"],
  },
  Thundestorm: {
    iconName: "weather-lightning",
    gradient: ["#373B44", "#4286f4"],
  },
  Drizzle: {
    iconName: "weather-hail",
    gradient: ["#89F7FE", "#66A6FF"],
  },
  Rain: {
    iconName: "weather-rainy",
    gradient: ["#00C6FB", "#005BEA"],
  },
  Snow: {
    iconName: "weather-snowy",
    gradient: ["#7DE2FC", "#B9B6E5"],
  },
  Atmosphere: {
    iconName: "weather-hail",
    gradient: ["#89F7FE", "#66A6FF"],
  },
  Clear: {
    iconName: "weather-sunny",
    gradient: ["#FF7300", "#FEF253"],
  },
  Clouds: {
    iconName: "weather-cloudy",
    gradient: ["#D7D2CC", "#304352"],
  },
  Dust: {
    iconName: "weather-hail",
    gradient: ["#4DA0B0", "#D39D38"],
  },
  Mist: {
    iconName: "weather-hail",
    gradient: ["#4DA0B0", "#D39D38"],
  },
};

export default function Weather({ temp, condition, city, description, realFeel, pressure }) {
  return (
    <LinearGradient
      colors={weatherOptions[condition].gradient}
      style={styles.container}
    >
      <StatusBar barStyle='light-content' />
      <View style={styles.halfContainer}>
        <Text style={styles.city}>{city}</Text>
        <Text style={styles.temp}>{temp.temp}&deg;</Text>
        <Text style={styles.subtitle}>{description}</Text>
        <View style={styles.minMaxTemp}>
          <Text style={[styles.subtitle, styles.minTemp]}>H:{temp.temp_min}&deg;</Text>
          <Text style={styles.subtitle}>L:{temp.temp_max}&deg;</Text>
        </View>
        <MaterialCommunityIcons
          size={90}
          name={weatherOptions[condition].iconName}
          color='white'
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.subtitle}>
          RealFeel: {realFeel}
        </Text>
        <Text style={styles.subtitle}>
          Pressure: {pressure} kpa
        </Text>
      </View>
    </LinearGradient>
  );
}

Weather.propTypes = {
  temp: PropTypes.object.isRequired,
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
  },
  temp: {
    fontSize: 60,
    color: "white",
    fontWeight: "300",
  },
  city: {
    fontSize: 32,
    color: "white",
    fontWeight: "400",
  },
  halfContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  minMaxTemp: {
    flexDirection: "row",
  },
  minTemp: {
    marginRight: "10px",
  },
  subtitle: {
    fontSize: 20,
    textAlign: "left",
    fontWeight: "400",
    color: "white",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 40,
    alignItems: "flex-start",
  },
});
