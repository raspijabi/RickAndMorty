import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {Episode as EpisodeType} from '../interfaces/Episodes';
import {useCharacters} from '../hooks/useCharacters';
import {CharacterComponent} from '../components/CharacterComponent';
import {useForm} from '../hooks/useForm';
import { RootStackParams } from '../navigator/Navigator';

interface Props extends StackScreenProps<RootStackParams, 'Episode'> {}
export const Episode = ({route, navigation}: Props) => {
  const {episode} = route.params;

  const {characters, getCharacters, isLoading} = useCharacters();

  const {name, email, comment, onChange} = useForm({
    name: '',
    email: '',
    comment: '',
  });

  useEffect(() => {
    getCharacters(episode.characters);
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{
        backgroundColor: 'white',
    }}>
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
              color: 'black'
            }}>
            {episode.episode}: {episode.name}
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
            {episode.air_date}
          </Text>
        </View>
        <View
          style={{
            paddingVertical: 10,

            paddingHorizontal: 20,
          }}>
          <Text style={{
                fontSize: 16,
            color: 'black'
          }}>
            {episode.characters.length} personajes en este episodio
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
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 20,
          }}>
          <View>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
              }}>
              Comentarios
            </Text>
          </View>
          <View
            style={{
              paddingVertical: 10,
            }}>
            <TextInput
              keyboardType="default"
              placeholder="Tu nombre"
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                height: 40,
                paddingHorizontal: 10,
                fontSize: 16,
              }}
              onChangeText={value => onChange(value, 'name')}
              placeholderTextColor={'black'}
            />
          </View>
          <View
            style={{
              paddingVertical: 10,
            }}>
            <TextInput
              keyboardType="email-address"
              placeholder="Email"
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                height: 40,
                paddingHorizontal: 10,
                fontSize: 16,
              }}
              onChangeText={value => onChange(value, 'email')}
              placeholderTextColor={'black'}
            />
          </View>
          <View
            style={{
              paddingVertical: 10,
            }}>
            <TextInput
              placeholder="Comentario (máx. 500 carácteres)"
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                height: 160,
                paddingHorizontal: 10,
                fontSize: 16,
                paddingTop: 10,
              }}
              placeholderTextColor={'black'}
              multiline
              maxLength={500}
              onChangeText={value => onChange(value, 'comment')}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                backgroundColor: '#86b3fc',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                width: '30%',
              }}
              onPress={() => {
                // fetch to send comment to the url https://flat101.es/api/entrevista/comentarios with the body: {name, email, comment} and the method POST
                fetch('https://flat101.es/api/entrevista/comentarios', {
                  method: 'POST',
                  body: JSON.stringify({
                    name,
                    email,
                    comment,
                  }),
                })
                  .then(resp => {
                    Alert.alert(
                      'Comentario enviado',
                      'Gracias por tu comentario',
                    );
                  })
                  .catch(err => {
                    Alert.alert(
                      'Error',
                      'Se ve que la api no está en marcha aún',
                    );
                  });
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                }}>
                ENVIAR
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
