import {StackHeaderProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {SearchInput} from './SearchInput';
import {useAppDispatch, useAppSelector} from '../hooks/useStore';
import {setNameForHeader, setTermToSearch} from '../store/ui/uiSlice';

interface Props {
  props: StackHeaderProps;
}

export const Header = ({props}: Props) => {
  const {top} = useSafeAreaInsets();
  const [term, setTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const dispatch = useAppDispatch();
  const {nameForHeader} = useAppSelector(state => state.ui);

  useEffect(() => {
    dispatch(setTermToSearch(term));
  }, [term]);

  useEffect(() => {
    props.navigation.addListener('beforeRemove', () => {
      dispatch(setNameForHeader(''));
    });
  }, []);

  return (
    <View
      style={{
        marginTop: Platform.OS === 'ios' ? top : top ,
        height: 60,
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {nameForHeader !== '' ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              dispatch(setNameForHeader(''));
              props.navigation.goBack();
            }}
            style={{
              position: 'absolute',
              left: 0,
            }}>
            <Icon name="arrow-back-outline" color={'black'} size={30} />
          </TouchableOpacity>
          <View style={{

          }}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              {nameForHeader}
            </Text>
          </View>
        </View>
      ) : (
        <>
          {isSearching ? (
            <View
              style={{
                justifyContent: 'center',
              }}>
              <SearchInput onDebounce={setTerm} />
            </View>
          ) : (
            <Text
              style={{
                fontSize: 18,
                color: 'black',
              }}>
              Rick and Morty
            </Text>
          )}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setIsSearching(!isSearching);
            }}
            style={{
              position: 'absolute',
              right: 20,
              top: 15,
            }}>
            <Icon name="search-outline" color={'black'} size={30} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
