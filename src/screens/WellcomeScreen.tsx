// WelcomeScreen.js
import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, ImageBackground, Alert} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {saveCharacter} from "../redux/slices/characterSlice"; // Импортируем хуки Redux

const WelcomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const selectedCharacterFromRedux = useSelector((state) => state.character.selectedCharacter);
    const characterStatus = useSelector((state) => state.character.status);

    const [localSelectedCharacter, setLocalSelectedCharacter] = useState(selectedCharacterFromRedux);

    // Если персонаж уже выбран и загрузка завершена, переходим на Dashboard
    useEffect(() => {
        if (characterStatus === 'succeeded' && selectedCharacterFromRedux) {
            navigation.replace('Dashboard'); // Или 'Home'
        }
    }, [characterStatus, selectedCharacterFromRedux, navigation]);

    // Обработка выбора персонажа
    const handleCharacterSelect = (character) => {
        setLocalSelectedCharacter(character);
    };

    // Обработка кнопки "Choose"
    const handleChoosePress = () => {
        if (localSelectedCharacter) {
            dispatch(saveCharacter(localSelectedCharacter)); // Диспетчеризуем thunk для сохранения
            // Навигация произойдет в useEffect, когда статус станет 'succeeded' и персонаж будет сохранен
        } else {
            Alert.alert('Please select a character!');
        }
    };

    // Отображаем индикатор загрузки, если данные еще не загружены из AsyncStorage
    if (characterStatus === 'loading') {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading game data...</Text>
            </View>
        );
    }

    return (
        <ImageBackground
            source={require('../assets/img/ffbecb8cdffc0b0aee55fc7c34339381ed9ece71.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay} />

            <View style={styles.contentContainer}>
                <Text style={styles.title}>To get started, choose:</Text>

                <View style={styles.characterSelectionContainer}>
                    {/* Man Character Option */}
                    <TouchableOpacity
                        style={[
                            styles.characterOption,
                            localSelectedCharacter === 'man' && styles.selectedOption,
                        ]}
                        onPress={() => handleCharacterSelect('man')}
                    >
                        <Image
                            source={require('../assets/img/ThefCrovvnfDailyPath/image-Photoro2.png')}
                            style={styles.characterImage}
                        />
                        <Text style={styles.characterText}>Man</Text>
                    </TouchableOpacity>

                    {/* Woman Character Option */}
                    <TouchableOpacity
                        style={[
                            styles.characterOption,
                            localSelectedCharacter === 'woman' && styles.selectedOption,
                        ]}
                        onPress={() => handleCharacterSelect('woman')}
                    >
                        <Image
                            source={require('../assets/img/ThefCrovvnfDailyPath/imagffff1.png')}
                            style={styles.characterImage}
                        />
                        <Text style={styles.characterText}>Woman</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.chooseButton}
                    onPress={handleChoosePress}
                    disabled={!localSelectedCharacter || characterStatus === 'loading'} // Отключаем кнопку во время сохранения
                >
                    <Text style={styles.chooseButtonText}>Choose</Text>
                </TouchableOpacity>

                {localSelectedCharacter && (
                    <Text style={styles.statusText}>
                        Selected: {localSelectedCharacter.charAt(0).toUpperCase() + localSelectedCharacter.slice(1)}
                    </Text>
                )}
            </View>
        </ImageBackground>
    );
};

// ... (стили остаются теми же)
const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        width: '100%',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFD700',
        marginBottom: 40,
    },
    characterSelectionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 50,
    },
    characterOption: {
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'transparent',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    selectedOption: {
        borderColor: '#FFD700',
    },
    characterImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#FFD700',
    },
    characterText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    chooseButton: {
        backgroundColor: '#FFD700',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 30,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    chooseButtonText: {
        color: '#1a1a1a',
        fontSize: 18,
        fontWeight: 'bold',
    },
    statusText: {
        marginTop: 20,
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default WelcomeScreen;
