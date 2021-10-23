import React from "react";
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { format } from "date-fns";

const { width:SCREEN_WIDTH } = Dimensions.get("window");

const DayFormatter = (props) => {
  const date = format(new Date(props.date * 1000), "dd MMM yyyy");
  return (
    <Text style={styles.date}>
      {date}
    </Text>
  )
};

export default function Weather({ days, city }) {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
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
              <DayFormatter date={day.dt} />
              <Text style={styles.dayTemp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
              <Text style={styles.dayMain}>{day.weather[0].main}</Text>
              <Text style={styles.dayDesc}>{day.weather[0].description}</Text>
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
    backgroundColor: "tomato",
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
  },
  dayDesc: {
    fontSize: 20,
  },
  dayMain: {
    fontSize: 60,
  },
  dayTemp: {
    fontSize: 150,
  },
  weather: {
  }
});
