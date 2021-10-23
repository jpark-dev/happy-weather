import React from "react";
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { format } from "date-fns";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width:SCREEN_WIDTH } = Dimensions.get("window");

const icons = {
  "Clouds": "weather-cloudy",
  "Rain": "weather-rainy",
};

const DayFormatter = (props) => {
  const date = format(new Date(props.date * 1000), "dd MMM yyyy");

  return (
    <Text style={props.style}>
      {date}
    </Text>
  )
};


export default function Weather({ days, city }) {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={[styles.cityName, styles.defaultFontColor]}>{city}</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.weather}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator color="white" size="large" />
          </View>
        ) : (
          days.map((day, index) =>
            <View style={styles.day} key={index}>
              <DayFormatter date={day.dt} style={[styles.date, styles.defaultFontColor]} />
              <View style={styles.dayVisual}>
                <Text style={[styles.dayTemp, styles.defaultFontColor]}>{parseFloat(day.temp.day).toFixed(1)}°</Text>
                <MaterialCommunityIcons name={icons[day.weather[0].main]} size={60} color="white" />
              </View>
              <Text style={[styles.dayMain, styles.defaultFontColor]}>{day.weather[0].main}</Text>
              <Text style={[styles.dayDesc, styles.defaultFontColor]}>{day.weather[0].description}</Text>
            </View>
          )
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightskyblue",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 50,
    fontWeight: "600",
  },
  date: {
    fontSize: 20,
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: SCREEN_WIDTH * 0.1,
  },
  dayDesc: {
    fontSize: 20,
  },
  dayMain: {
    fontSize: 60,
  },
  dayTemp: {
    fontSize: 80,
  },
  dayVisual: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  defaultFontColor: {
    color: "white",
  },
});
