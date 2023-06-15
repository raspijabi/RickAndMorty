import { createStackNavigator } from "@react-navigation/stack"
import { Episode } from "../screens/Episode"
import { Location } from "../screens/Location"
import { Location as LocationType } from "../interfaces/Locations"
import { Locations } from "../screens/Locations"


export type RootStackParams = {
    Home: {}
    // Location: {location: LocationType}
}

const Stack = createStackNavigator<RootStackParams>()

export const TabLocationStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    // backgroundColor: 'red'
                    backfaceVisibility: "hidden"
                }
            }}
        >
            <Stack.Screen
                name="Home"
                component={Locations}
            />
            {/* <Stack.Screen
                name="Location"
                component={Location}
            /> */}
            
        </Stack.Navigator>
    )
}
