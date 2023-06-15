import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Episodes} from '../screens/Episodes';
import {Locations} from '../screens/Locations';
import {TabEpisodeStack} from './TabEpisode';
import {TabLocationStack} from './TabLocations';
import { useAppDispatch } from '../hooks/useStore';
import { setIsSearchingEpisode, setTermToSearch } from '../store/ui/uiSlice';

export type RootStackParams = {
  Episodes: {};
  Locations: {};
};

const Tab = createMaterialTopTabNavigator<RootStackParams>();

export const Tabs = () => {
  const dispatch = useAppDispatch()
  return (
    <Tab.Navigator sceneContainerStyle={{}}>
      <Tab.Screen
        name="Episodes"
        component={TabEpisodeStack}
        options={{
          title: 'Episodios',
        }}
        listeners={{
          tabPress: e => {
            dispatch(setTermToSearch(''))
            dispatch(setIsSearchingEpisode(true))
          }
        }}
      />
      <Tab.Screen
        name="Locations"
        component={TabLocationStack}
        options={{
          title: 'Localizaciones',
        }}
        listeners={{
          tabPress: e => {
            dispatch(setTermToSearch(''))
            dispatch(setIsSearchingEpisode(false))
          }
        }}
      />
    </Tab.Navigator>
  );
};
