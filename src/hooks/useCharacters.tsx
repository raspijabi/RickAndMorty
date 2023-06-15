import {useState} from 'react';
import {Character} from '../interfaces/Character';

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCharacters = async (charactersUrl: string[]) => {
    setIsLoading(true);
    const characterNumbers = charactersUrl.map(url => {
      return url.split('/')[5];
    });
    if (characterNumbers.length === 1) {
      const resp = await fetch(charactersUrl[0]);
      const charactersResp = await resp.json();
      setCharacters([charactersResp]);
    } else {
      const resp = await fetch(`https://rickandmortyapi.com/api/character/${characterNumbers.join(
        ',',
      )}`);
      
      const charactersResp = await resp.json();
      setCharacters(charactersResp);
    }
    setIsLoading(false);
  };

  return {getCharacters, characters, isLoading};
};
