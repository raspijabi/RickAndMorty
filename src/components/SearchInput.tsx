import React, {useEffect, useState} from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDebouncedValue} from '../hooks/useDebouncedValue';
import {useAppSelector} from '../hooks/useStore';

interface Props {
  onDebounce: (value: string) => void;
}

export const SearchInput = ({onDebounce}: Props) => {
  const [textValue, setTextValue] = useState('');

  const debouncedValue = useDebouncedValue(textValue);

  const {isSearchingEpisode, termToSearch} = useAppSelector(state => state.ui);

  useEffect(() => {
    onDebounce(debouncedValue);
  }, [debouncedValue]);

  // useEffect(() => {
  //   if(termToSearch === '') {
  //     setTextValue('')
  //   }
  // }, [termToSearch])

  return (
    <View style={{}}>
      <TextInput
        placeholderTextColor={'black'}
        placeholder={
          isSearchingEpisode ? 'Buscar episodio' : 'Buscar localización'
        }
        style={{
          backgroundColor: 'white',
          height: 40,
          width: 300,
          paddingHorizontal: 20,
          borderRadius: 50,
          fontSize: 18,
          color: 'black',
        }}
        autoCapitalize="none"
        autoCorrect={false}
        value={textValue}
        onChangeText={setTextValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  textBackground: {
    backgroundColor: '#F3F1F3',
    borderRadius: 50,
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    color: 'black',
  },
});
