import React from 'react';
import {View, Text} from 'react-native';
import { Location } from '../interfaces/Locations';

interface Props {
  location: Location;
}
export const LocationComponent = ({location}: Props) => {
  return (
    <View
      style={{
        height: 70,
        paddingHorizontal: 15,
        marginVertical: 10,
      }}>
      <View style={{
      }}>
        <Text style={{
            color: 'gray',
        }}>{location.type}</Text>
      </View>
      <View style={{
        paddingVertical: 5,
      }}>
        <Text style={{
            fontSize: 16,
            color: 'black',
        }}>{location.name}</Text>
      </View>
      <View style={{
        paddingVertical: 5,
      }}>
        <Text style={{
            color: 'gray',
        }}>{location.dimension}</Text>
      </View>
    </View>
  );
};
