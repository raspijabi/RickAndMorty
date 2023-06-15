import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {LocationComponent} from '../components/LocationComponent';
import {useLocations} from '../hooks/useLocations';
import {RootStackParams} from '../navigator/Navigator';
import {useAppDispatch, useAppSelector} from '../hooks/useStore';
import {setNameForHeader} from '../store/ui/uiSlice';

interface Props extends StackScreenProps<RootStackParams, 'Location'> {}

export const Locations = ({navigation}: Props) => {
  const {
    locations,
    getLocations,
    isLoading,
    loadMoreLocations,
    getSearchedLocations,
    setLastLoadIndex,
  } = useLocations();

  const {termToSearch, isSearchingEpisode} = useAppSelector(state => state.ui);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('TERM TO SEARCH: ',termToSearch)
    if (termToSearch !== '' && !isSearchingEpisode) {
      getSearchedLocations();
    } else {
      getLocations(true);
      setLastLoadIndex(11);
    }
  }, [termToSearch]);

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
      }}>
      <FlatList
        data={locations}
        style={{
          paddingBottom: 40,
        }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              dispatch(setNameForHeader(item.name));
              navigation.navigate('Location', {location: item});
            }}
            style={{
              backgroundColor: 'white',
            }}>
            <LocationComponent location={item} />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'gray',
              marginHorizontal: 20,
            }}></View>
        )}
        onEndReached={termToSearch === '' ? loadMoreLocations : () => {}}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          termToSearch !== '' ? null : (
            <ActivityIndicator style={{height: 100}} size={20} color={'grey'} />
          )
        }
      />
    </View>
  );
};
