// CustomMarker.js
import React from 'react';
import { View, Text } from 'react-native';

const MapPost = ({ label, color }) => (
  <View style={{ alignItems: 'center' }}>
    <View
      style={{
        backgroundColor: color,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: 'white', fontWeight: 'bold' }}>{label}</Text>
    </View>
  </View>
);

export default MapPost;
