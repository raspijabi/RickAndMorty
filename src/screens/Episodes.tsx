import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useEpisodes} from '../hooks/useEpisodes';
import {EpisodesComponent} from '../components/EpisodesComponent';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/Navigator';
import {useAppDispatch, useAppSelector} from '../hooks/useStore';
import {setNameForHeader} from '../store/ui/uiSlice';

interface Props extends StackScreenProps<RootStackParams, 'Episode'> {}

export const Episodes = ({navigation}: Props) => {
  const {
    episodes,
    getEpisodes,
    isLoading,
    loadMoreEpisodes,
    getSearchedEpisodes,
    setLastLoadIndex,
  } = useEpisodes();

  const {termToSearch, isSearchingEpisode} = useAppSelector(state => state.ui);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('TERM TO SEARCH: ', termToSearch);
    if (termToSearch !== '' && isSearchingEpisode) {
      getSearchedEpisodes();
    } else {
      getEpisodes(true);
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
        data={episodes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              dispatch(setNameForHeader(item.name));
              navigation.navigate('Episode', {episode: item});
            }}
            style={{
              backgroundColor: 'white',
            }}>
            <EpisodesComponent episode={item} />
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
        onEndReached={termToSearch === '' ? loadMoreEpisodes : () => {}}
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
