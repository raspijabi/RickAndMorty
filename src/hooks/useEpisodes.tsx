import {useState} from 'react';
import {Episode} from '../interfaces/Episodes';
import {paginatedLoad} from '../helpers/PaginatedLoad';
import {useAppSelector} from './useStore';

export const useEpisodes = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastLoadIndex, setLastLoadIndex] = useState(11);

  const {termToSearch} = useAppSelector(state => state.ui);

  const getEpisodes = async (clearEpisodes?: boolean) => {
    setIsLoading(true);
    if (clearEpisodes !== undefined && clearEpisodes) {
      setEpisodes([]);
    }
    try {
      const resp = await fetch(
        'https://rickandmortyapi.com/api/episode/1,2,3,4,5,6,7,8,9,10',
      );
      const episodesResp = await resp.json();
      setEpisodes([...episodes, ...episodesResp]);
    } catch (error) {
      console.log('Error en la api: ', error);
    }

    setIsLoading(false);
  };

  const loadMoreEpisodes = async () => {
    try {
      const {finalArray, start} = paginatedLoad(lastLoadIndex);
      setLastLoadIndex(start);
      const resp = await fetch(
        `https://rickandmortyapi.com/api/episode/${finalArray.join(',')}`,
      );
      const episodesResp = await resp.json();
      setEpisodes([...episodes, ...episodesResp]);
    } catch (error) {
      console.log('Error en la api: ', error);
    }
  };

  const getSearchedEpisodes = async () => {
    try {
      const resp = await fetch(
        `https://rickandmortyapi.com/api/episode/?name=${termToSearch}`,
      );
      const episodesResp = await resp.json();
      setEpisodes(episodesResp.results);
    } catch (error) {
      console.log('Error en la api: ', error);
    }
  };

  return {
    episodes,
    getEpisodes,
    isLoading,
    loadMoreEpisodes,
    getSearchedEpisodes,
    setLastLoadIndex,
  };
};
