import {createStackNavigator} from '@react-navigation/stack';
import {Tabs} from './Tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Text, View} from 'react-native';
import {Header} from '../components/Header';
import {Episode} from '../screens/Episode';
import {Episode as EpisodeType} from '../interfaces/Episodes';
import {Location as LocationType} from '../interfaces/Locations';
import {Location} from '../screens/Location';

export type RootStackParams = {
  Tabs: {};
  Episode: {episode: EpisodeType};
  Location: {location: LocationType};
};

const Stack = createStackNavigator<RootStackParams>();

export const Navigator = () => {
  const {top} = useSafeAreaInsets();

  // return (
  //   <Stack.Navigator
  //     screenOptions={{
  //       header(props) {
  //         return <Header props={props} />;
  //       },
  //       cardStyle: {
  //         backgroundColor: '#86b3fc',
  //       },
  //     }}>
  //     <Stack.Screen name="Home" component={Tabs} options={{

  //     }} />
  //     <Stack.Screen name="Episode" component={Episode}/>
  //     <Stack.Screen name="Location" component={Location}/>
  //   </Stack.Navigator>
  // );
  return (
    <Stack.Navigator
      screenOptions={{
        header(props) {
          return <Header props={props} />;
        },
        cardStyle: {
          backgroundColor: '#86b3fc',
        },
      }}>
      <Stack.Screen name="Tabs" component={Tabs} options={{}} />
      <Stack.Screen name="Episode" component={Episode} options={{}} />
      <Stack.Screen name="Location" component={Location} options={{}} />
    </Stack.Navigator>
  );
};
