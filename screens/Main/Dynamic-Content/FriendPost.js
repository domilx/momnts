import React from 'react';
import { View, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Card, Title, Paragraph } from 'react-native-paper';

const UserPostCard = ({ user, post, location }) => {
  return (
    <Card style={{ margin: 10, width: '70%', backgroundColor: '#D6E0D9', alignItems: 'center', justifyContent: 'center' }}>
      <Card.Content>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={{ uri: user.avatar }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
          <Title style={{ marginLeft: 10, fontWeight: 'bold' }}>{user.name}</Title>
        </View>
        <Paragraph>{post.content}</Paragraph>
        {location && (
          <View style={{ height: 200, marginTop: 10 }}>
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
              />
            </MapView>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

export default UserPostCard;
