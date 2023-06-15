import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {paginatedLoad} from '../helpers/PaginatedLoad';
import {Location} from '../interfaces/Locations';
import {useAppSelector} from './useStore';

export const useLocations = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastLoadIndex, setLastLoadIndex] = useState(11);

  const {termToSearch} = useAppSelector(state => state.ui);

  const getLocations = async (clearLocations?: boolean) => {
    setIsLoading(true);
    if (clearLocations !== undefined && clearLocations) {
      setLocations([]);
    }
    try {
      const resp = await fetch(
        'https://rickandmortyapi.com/api/location/1,2,3,4,5,6,7,8,9,10',
      );
      const locationsResp = await resp.json();
      setLocations([...locations, ...locationsResp]);
    } catch (error) {
      console.log('Error en la api: ', error);
    }
    setIsLoading(false);
  };

  const loadMoreLocations = async () => {
    try {
      const {finalArray, start} = paginatedLoad(lastLoadIndex);
      setLastLoadIndex(start);
      const resp = await fetch(
        `https://rickandmortyapi.com/api/location/${finalArray.join(',')}`,
      );
      const locationsResp = await resp.json();
      setLocations([...locations, ...locationsResp]);
    } catch (error) {
      console.log('Error en la api: ', error);
    }
  };

  const getSearchedLocations = async () => {
    try {
      const resp = await fetch(
        `https://rickandmortyapi.com/api/location/?name=${termToSearch}`,
      );
      const locationsResp = await resp.json();
      setLocations(locationsResp.results);
    } catch (error) {
      console.log('Error en la api: ', error);
    }
  };

  return {
    locations,
    isLoading,
    getLocations,
    loadMoreLocations,
    getSearchedLocations,
    setLastLoadIndex,
  };
};
