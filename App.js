import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import axios from "axios";
import * as Location from "expo-location";
import Loading from "./Loading";
import Weather from "./Weather";
import getEnvVars from "./environment";

const { apiKey } = getEnvVars();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [temp, setTemp] = useState(0);
  const [condition, setCondition] = useState("Clear");
  const [city, setCity] = useState("");
  const [realFeel, setRealFeel] = useState(0);
  const [pressure, setPressure] = useState(0);

  const getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    );
    setIsLoading(false);
    setTemp(data.main.temp);
    setCity(data.name);
    setRealFeel(data.main.feels_like);
    setPressure(data.main.pressure);
    setCondition(data.weather[0].main);
  };

  const getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("Need location access!", "So sad");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <Weather temp={Math.round(temp)} condition={condition} city={city} realFeel={realFeel} pressure={pressure} />
  );
}
