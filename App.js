import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import axios from "axios";
import * as Location from "expo-location";
import Loading from "./Loading";
import Weather from "./Weather";
import getEnvVars from "./environment";

const { API_KEY } = getEnvVars();

export default function App() {
  const [city, setCity] = useState("");
  const [condition, setCondition] = useState("Clear");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [pressure, setPressure] = useState(0);
  const [realFeel, setRealFeel] = useState(0);
  const [temp, setTemp] = useState({});

  const getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    setIsLoading(false);

    setCity(data.name);
    setCondition(data.weather[0].main);
    setDescription(data.weather[0].description);
    setPressure(data.main.pressure);
    setRealFeel(data.main.feels_like);
    setTemp({
      temp: Math.round(data.main.temp),
      temp_max: Math.round(data.main.temp_max),
      temp_min: Math.round(data.main.temp_min),
    });
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
    <Weather temp={temp} condition={condition} city={city} description={description} realFeel={realFeel} pressure={pressure} />
  );
}
