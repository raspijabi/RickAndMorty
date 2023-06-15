import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {RootStackParams} from '../navigator/Navigator';
import {useLocations} from '../hooks/useLocations';
import {useCharacters} from '../hooks/useCharacters';
import {CharacterComponent} from '../components/CharacterComponent';

interface Props extends StackScreenProps<RootStackParams, 'Location'> {}
export const Location = ({route}: Props) => {
  const {location} = route.params;

  const {characters, getCharacters, isLoading} = useCharacters();

  useEffect(() => {
    getCharacters(location.residents);
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        paddingTop: 10,
      }}>
      <View
        style={{
          paddingVertical: 10,

          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: 'black',
          }}>
          {location.name}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            color: 'gray',
          }}>
          {location.type}
        </Text>
      </View>
      {location.residents.length > 0 ? (
        <View>
          <View
            style={{
              paddingVertical: 10,

              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
              }}>
              Habitantes
            </Text>
          </View>
          <View>
            <FlatList
              data={characters}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View
                  style={{
                    height: 120,
                    width: 70,
                    marginHorizontal: 3,
                  }}>
                  <CharacterComponent character={item} />
                </View>
              )}
              horizontal
            />
          </View>
        </View>
      ) : (
        <View>
          <Text style={{
            paddingHorizontal: 20,
            color: 'black',
            fontSize: 16
          }}>Madremia este planeta está desierto</Text>
        </View>
      )}
    </View>
  );
};
