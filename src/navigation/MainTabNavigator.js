import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import AchievementScreen from "../screens/AchievementScreen";
import AchievementsCrownScreen from "../screens/AchievementsCrownScreen";
import AppcheckStories from "../screens/AchievementsCrownScreen";



const Tab = createBottomTabNavigator();

const ICONS = {
    Home: require('../assets/img/Vector.png'),
    AchievementScreen: require('../assets/img/Vectorfwqfqw.png'),
    AppcheckStories: require('../assets/img/Vector999.png'),
};

const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarLabel: '',
    tabBarIcon: () => (
        <Image
            source={ICONS[route.name] || ICONS.Home}
            resizeMode="contain"
        />
    ),
    tabBarStyle: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        elevation: 5,
        backgroundColor: '#000000',
        borderRadius: 20,
        borderWidth: 4,
        borderColor: '#B8996A',
        width: '90%',
        marginLeft: '5%',
        height: 70,
        paddingTop: 10,
        paddingBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
    },
    headerTitleStyle: {
        color: 'white',
        fontFamily: 'Quantico-BoldItalic',
        fontSize: 40,
    },
});

const MainTabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="AchievementScreen" component={AchievementScreen} />
            <Tab.Screen name="AppcheckStories" component={AppcheckStories} />

        </Tab.Navigator>
    );
};

export default MainTabNavigator;
