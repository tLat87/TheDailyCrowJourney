// DashboardScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux'; // Импортируем хук Redux

const DashboardScreen = ({ navigation }) => {
    const selectedCharacter = useSelector((state) => state.character.selectedCharacter);
    const characterStatus = useSelector((state) => state.character.status);

    // Эффект для навигации, если персонаж не выбран после загрузки
    useEffect(() => {
        if (characterStatus === 'succeeded' && !selectedCharacter) {
            console.warn('No character found on Dashboard, redirecting to WelcomeScreen.');
            navigation.replace('Welcome');
        }
    }, [characterStatus, selectedCharacter, navigation]);

    if (characterStatus === 'loading') {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#FFD700" />
                <Text style={styles.loadingText}>Loading your destiny...</Text>
            </View>
        );
    }

    // Если персонаж не выбран (после загрузки, т.е. characterStatus === 'succeeded' и !selectedCharacter),
    // то AppContent уже перенаправит, но на всякий случай тут можно вернуть null
    if (!selectedCharacter) {
        return null;
    }

    // Определяем приветствие и изображение в зависимости от выбранного персонажа
    const characterGreeting = selectedCharacter === 'woman' ? 'Greetings, future Queen!' : 'Greetings, future King!';
    const characterImageSource =
        selectedCharacter === 'woman'
            ? require('../assets/img/ThefCrovvnfDailyPath/imagffff1.png') // Ваше изображение женского персонажа
            : require('../assets/img/ThefCrovvnfDailyPath/image-Photoro2.png'); // Ваше изображение мужского персонажа

    return (
        <ImageBackground
            source={require('../assets/img/ffbecb8cdffc0b0aee55fc7c34339381ed9ece71.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay} />

            <View style={styles.container}>
                {/* Левая секция: Приветствие */}
                <View style={styles.section}>
                    <Text style={styles.greetingTitle}>{characterGreeting}</Text>
                    <Text style={styles.advisorText}>I am the Page, your first advisor.</Text>
                    <Text style={styles.decreeText}>
                        Here, tasks become decrees, and the day is the path to greatness.
                    </Text>
                    <View style={styles.characterDisplay}>
                        <Image source={characterImageSource} style={styles.characterImage} />
                        <TouchableOpacity
                            style={styles.arrowButton}
                            onPress={() => navigation.navigate('MainTabNavigator')}
                        >
                            <Text style={styles.arrowText}>→</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/*/!* Правая секция: Выберите, как действовать сегодня *!/*/}
                {/*<View style={styles.section}>*/}
                {/*    <Text style={styles.actionTitle}>Choose how to act today:</Text>*/}
                {/*    <TouchableOpacity style={styles.actionOption} onPress={() => navigation.navigate('Home')}>*/}
                {/*        <Text style={styles.actionIcon}>⬛</Text>*/}
                {/*        <Text style={styles.actionText}>The order of the day is an easy task</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*    <TouchableOpacity style={styles.actionOption} onPress={() => navigation.navigate('Home')}>*/}
                {/*        <Text style={styles.actionIcon}>⚔️</Text>*/}
                {/*        <Text style={styles.actionText}>The knight's mission is a serious task</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*    <TouchableOpacity style={styles.actionOption} onPress={() => navigation.navigate('Home')}>*/}
                {/*        <Text style={styles.actionIcon}>👑</Text>*/}
                {/*        <Text style={styles.actionText}>The royal challenge is the main goal</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*    <Text style={styles.decreeHintText}>Every decree is a step towards the throne.</Text>*/}
                {/*    <View style={styles.actionCharacterDisplay}>*/}
                {/*        <Image source={characterImageSource} style={styles.characterImage} />*/}
                {/*        <TouchableOpacity*/}
                {/*            style={styles.arrowButton}*/}
                {/*            onPress={() => navigation.navigate('Home')}*/}
                {/*        >*/}
                {/*            <Text style={styles.arrowText}>→</Text>*/}
                {/*        </TouchableOpacity>*/}
                {/*    </View>*/}
                {/*</View>*/}
            </View>
        </ImageBackground>
    );
};

// ... (стили остаются такими же)
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
    },
    loadingText: {
        color: '#FFD700',
        marginTop: 10,
        fontSize: 16,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
    },
    section: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 15,
        padding: 25,
        marginHorizontal: 10,
        minHeight: '80%',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFD700',
    },
    greetingTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFD700',
        marginBottom: 15,
        textAlign: 'center',
    },
    advisorText: {
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 10,
        textAlign: 'center',
    },
    decreeText: {
        fontSize: 16,
        color: '#CCCCCC',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 20,
    },
    characterDisplay: {
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: -10,
    },
    characterImage: {
        width: 200,
        height: 300,
        // borderRadius: 100,
        // borderWidth: 3,
        borderBottomWidth: 2,
        borderColor: '#FFD700',
        marginBottom: 20,
    },
    arrowButton: {
        backgroundColor: '#FFD700',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    arrowText: {
        color: '#1a1a1a',
        fontSize: 35,
        fontWeight: 'bold',
        lineHeight: 50,
    },
    actionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFD700',
        marginBottom: 30,
        textAlign: 'center',
    },
    actionOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
        paddingHorizontal: 10,
    },
    actionIcon: {
        fontSize: 25,
        marginRight: 15,
    },
    actionText: {
        fontSize: 18,
        color: '#FFFFFF',
        flexShrink: 1,
    },
    decreeHintText: {
        fontSize: 14,
        color: '#AAAAAA',
        textAlign: 'center',
        marginTop: 20,
        fontStyle: 'italic',
    },
    actionCharacterDisplay: {
        alignItems: 'center',
        marginTop: 'auto',
    },
});

export default DashboardScreen;
