import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ControlPanel2 = ({ cityName = 'Montreal' }) => {
    const [city, setCity] = useState(cityName);
    const [weatherData, setWeatherData] = useState(null);
    const [localTime, setLocalTime] = useState('');

    const fetchInterval = 5400000;  // 90 minutes in milliseconds

    useEffect(() => {
      setCity(cityName); 
    }, [cityName]);

    const saveWeatherData = async (data) => {
        try {
            await AsyncStorage.setItem(`weather_${city}`, JSON.stringify(data));
        } catch (error) {
            console.error("Error saving weather data locally:", error);
        }
    };

    const getStoredWeatherData = async () => {
        try {
            const storedData = await AsyncStorage.getItem(`weather_${city}`);
            if (storedData !== null) {
                setWeatherData(JSON.parse(storedData));
            }
        } catch (error) {
            console.error("Error retrieving stored weather data:", error);
        }
    };

    useEffect(() => {
        getStoredWeatherData();

        const fetchWeather = async () => {
            try {
                const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=214bcc7cd373419da76173110232208&q=${city}`);
                const data = await response.json();
                saveWeatherData(data);
                setWeatherData(data);

                // Set the local time directly from the weather API response
                if (data && data.location && data.location.localtime) {
                    setLocalTime(data.location.localtime);
                }

            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        fetchWeather();
        const intervalId = setInterval(fetchWeather, fetchInterval);

        return () => clearInterval(intervalId); 
    }, [city]);

    const getWeatherIcon = () => {
        if (!weatherData) return 'weather-cloudy'; 
        const condition = weatherData.current.condition.text.toLowerCase();
        if (condition.includes('rain')) return 'weather-rainy';
        if (condition.includes('cloud')) return 'weather-cloudy';
        return 'weather-sunny';
    };

    const format12HourTime = (timeStr) => {
      if (!timeStr) return ''; 
      const timeOnly = timeStr.split(' ')[1];
      const [hour, minute] = timeOnly.split(':');
      let formattedHour = parseInt(hour, 10);
      const ampm = formattedHour >= 12 ? 'PM' : 'AM';
      if (formattedHour > 12) {
          formattedHour -= 12;
      } else if (formattedHour === 0) {
          formattedHour = 12;
      }
      return `${formattedHour}:${minute} ${ampm}`;
    };

    return (
      <View style={styles.chip}>
          <Text style={styles.locationText}>{city}</Text>
          <View style={styles.detailsContainer}>
              <Icon name={getWeatherIcon()} size={24} color="#ffffff" />
              <Text style={styles.detailsText}>
    {weatherData?.current.temp_c}°C | {format12HourTime(localTime)}
</Text>
          </View>
      </View>
    );
};

const styles = StyleSheet.create({
    chip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    locationText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    detailsText: {
        color: '#ffffff',
        fontSize: 14,
        marginLeft: 5,
    },
});

export default ControlPanel2;
