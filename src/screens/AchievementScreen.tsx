import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import AchievementModal from "../component/AchievementModal";

const { width, height } = Dimensions.get('window');

// Данные для карточек (достижений)
const achievements = [
    {
        id: '1',
        title: 'Page',
        description: 'You\'ve started your journey! Complete 1 task to become a Page.',
        image: require('../assets/img/ffbecb8cdffc0b0aee55fc7c34339381ed9ece71.png'),
        requiredTasks: 1,
    },
    {
        id: '2',
        title: 'Squire',
        description: 'You are now a Squire. Keep up the good work!',
        image: require('../assets/img/ffbecb8cdffc0b0aee55fc7c34339381ed9ece71.png'),
        requiredTasks: 5,
    },
    {
        id: '3',
        title: 'Knight',
        description: 'You have earned your knighthood! You are a true Knight of the kingdom.',
        image: require('../assets/img/ffbecb8cdffc0b0aee55fc7c34339381ed9ece71.png'),
        requiredTasks: 10,
    },
    {
        id: '4',
        title: 'Lord',
        description: 'You are now a Lord, a noble of the realm. Many tasks await your command!',
        image: require('../assets/img/ffbecb8cdffc0b0aee55fc7c34339381ed9ece71.png'),
        requiredTasks: 20,
    },
    {
        id: '5',
        title: 'King',
        description: 'You have mastered all challenges and are now the King of your kingdom!',
        image: require('../assets/img/ffbecb8cdffc0b0aee55fc7c34339381ed9ece71.png'),
        requiredTasks: 30,
    },
];

const AchievementScreen = () => {
    // Получаем все задачи из Redux Store
    const allTasks = useSelector((state) => ({
        ...state.tasks.orderOfTheDay,
        ...state.tasks.knightsMission,
        ...state.tasks.royalChallenge,
    }));

    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedAchievement, setSelectedAchievement] = useState(null);

    const totalTasks = Object.keys(allTasks).length;

    const [unlockedAchievements, setUnlockedAchievements] = useState([]);

    useEffect(() => {
        const checkAchievements = () => {
            const unlocked = achievements.filter(achievement => totalTasks >= achievement.requiredTasks);
            setUnlockedAchievements(unlocked);
        };
        checkAchievements();
    }, [totalTasks]);

    const handleReadMore = (achievement) => {
        setSelectedAchievement(achievement);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedAchievement(null);
    };


        const renderCard = (achievement, index) => {
            const isUnlocked = totalTasks >= achievement.requiredTasks;

            return (
                <View key={achievement.id} style={styles.cardContainer}>
                    <ImageBackground
                        source={isUnlocked ? achievement.image : require('../assets/img/Vectoqwfwqf.png')}
                        style={styles.cardBackground}
                        imageStyle={styles.cardImage}
                        resizeMode="cover"
                    >
                        <View style={styles.cardOverlay}>
                            {!isUnlocked && (
                                <View style={styles.lockedContent}>
                                    <Text style={styles.lockedText}>Locked</Text>
                                    <Text style={styles.lockedProgress}>
                                        Completed tasks: {totalTasks} of {achievement.requiredTasks}
                                    </Text>
                                </View>
                            )}
                            {isUnlocked && (
                                <View style={styles.unlockedContent}>
                                    <Text style={styles.unlockedTitle}>{achievement.title}</Text>
                                    <Text style={styles.unlockedDescription}>{achievement.description}</Text>
                                    <TouchableOpacity
                                        style={styles.readMoreButton}
                                        onPress={() => handleReadMore(achievement)}>
                                        <Text style={styles.readMoreText}>Read more</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </ImageBackground>
                </View>
            );
        };

    return (
        <ImageBackground
            source={require('../assets/img/ffbecb8cdffc0b0aee55fc7c34339381ed9ece71.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay} />
            <Text style={styles.title}>Your Path to Glory</Text>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardsScrollView}
            >
                {achievements.map((achievement, index) => renderCard(achievement, index))}
            </ScrollView>
            <AchievementModal
                isVisible={isModalVisible}
                onClose={handleCloseModal}
                achievement={selectedAchievement}
            />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFD700',
        textAlign: 'center',
        marginTop: 60,
        marginBottom: 20,
    },
    cardsScrollView: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    cardContainer: {
        width: width * 0.75,
        height: height * 0.65,
        marginHorizontal: width * 0.05,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#FFD700',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 15,
    },
    cardBackground: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    cardBackgroundLok: {
        flex: 0.7,
        marginTop: 50,
        justifyContent: 'center',

    },


    cardImage: {
        borderRadius: 18,
    },
    cardOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    lockedContent: {
        alignItems: 'center',
    },
    lockedText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    lockedProgress: {
        fontSize: 16,
        color: 'white',
        marginTop: 10,
    },
    unlockedContent: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: '100%',
    },
    unlockedTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFD700',
        marginBottom: 5,
    },
    unlockedDescription: {
        fontSize: 14,
        color: '#CCCCCC',
        textAlign: 'center',
        marginBottom: 15,
    },
    readMoreButton: {
        backgroundColor: '#FFD700',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 20,
    },
    readMoreText: {
        color: 'black',
        fontWeight: 'bold',
    },
});

export default AchievementScreen;
