import React from 'react';
import {View, Text} from 'react-native';
import {Episode} from '../interfaces/Episodes';

interface Props {
  episode: Episode;
}
export const EpisodesComponent = ({episode}: Props) => {
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
        }}>{episode.episode}</Text>
      </View>
      <View style={{
        paddingVertical: 5,
      }}>
        <Text style={{
            fontSize: 16,
            color: 'black',
        }}>{episode.name}</Text>
      </View>
      <View style={{
        paddingVertical: 5,
      }}>
        <Text style={{
            color: 'gray',
        }}>{episode.air_date}</Text>
      </View>
    </View>
  );
};
