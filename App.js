import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      // Send to API and get weather
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Need location access!", "So sad");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return isLoading ? <Loading /> : null;
}
