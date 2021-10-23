import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import axios from "axios";
import * as Location from "expo-location";
import Weather from "./Weather";
import getEnvVars from "./environment";

const { API_KEY } = getEnvVars();

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) setOk(false);

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({ accuracy: 5 });

      const userLocation = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });
      const { city } = userLocation[0];
      setCity(city);

      const {
        data: { daily }
      } = await axios.get(
        `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
      );
      setDays(daily)

    } catch (error) {
      Alert.alert("Need location access!", "So sad");
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  return <Weather days={days} city={city} />
}
