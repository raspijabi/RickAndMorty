import { createStackNavigator } from "@react-navigation/stack"
import { Episode } from "../screens/Episode"
import { Episode as EpisodeType } from "../interfaces/Episodes"
import { Episodes } from "../screens/Episodes"


export type RootStackParams = {
    Home: {}
    // Episode: { episode: EpisodeType}
}

const Stack = createStackNavigator<RootStackParams>()

export const TabEpisodeStack = () => {
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
                component={Episodes}
            />
            {/* <Stack.Screen
                name="Episode"
                component={Episode}
            /> */}
            
        </Stack.Navigator>
    )
}
