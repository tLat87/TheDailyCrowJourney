// App.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';

// Импортируем Redux store и Provider
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import {loadCharacter} from "./src/redux/slices/characterSlice";
import WelcomeScreen from "./src/screens/WellcomeScreen.tsx";
import DashboardScreen from "./src/screens/DashboardScreen.tsx";
import {persistor, store} from "./src/redux/store";
import {PersistGate} from "redux-persist/integration/react";
import HomeScreen from "./src/screens/HomeScreen.tsx";
import MainTabNavigator from "./src/navigation/MainTabNavigator";


const Stack = createStackNavigator();

// Создадим компонент, который будет ждать загрузки персонажа из Redux
function AppContent() {
    const dispatch = useDispatch();
    const characterStatus = useSelector((state) => state.character.status);
    const selectedCharacter = useSelector((state) => state.character.selectedCharacter);

    useEffect(() => {
        // Загружаем персонажа при монтировании AppContent (т.е. при запуске приложения)
        if (characterStatus === 'idle') {
            dispatch(loadCharacter());
        }
    }, [characterStatus, dispatch]);

    if (characterStatus === 'loading') {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FFD700" />
                <Text style={styles.loadingText}>Loading game data...</Text>
            </View>
        );
    }

    // Определяем начальный маршрут на основе загруженного персонажа
    const initialRoute = selectedCharacter ? 'Dashboard' : 'Welcome';

    return (
        <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{ headerShown: false }}
            />
            {/*<Stack.Screen*/}
            {/*    name="Home"*/}
            {/*    component={HomeScreen}*/}
            {/*    options={{ headerShown: false }}*/}
            {/*/>*/}
            <Stack.Screen
                name="MainTabNavigator"
                component={MainTabNavigator}
                options={{ headerShown: false }}
            />
            {/* Добавьте другие экраны здесь */}
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
                <AppContent />
            </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
    },
    loadingText: {
        marginTop: 10,
        color: '#FFD700',
        fontSize: 18,
    },
});
