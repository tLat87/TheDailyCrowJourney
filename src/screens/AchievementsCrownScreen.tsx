import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Image,
    FlatList,
    Dimensions,
    ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storiesData = [
    {
        id: 1,
        title: 'Crown of Dawn',
        description: 'Achievement: Complete the first task.',
        quote: 'Every path begins with a single step. Your crown is the first and most important.',
        image: require('../assets/img/Thfqwfqwf/image.png'),
    },
    {
        id: 2,
        title: 'Steel Crown',
        description: 'Achievement: Complete tasks for 7 days in a row.',
        quote: 'True strength is in consistency. Your endurance is worthy of steel.',
        image: require('../assets/img/Thfqwfqwf/image11.png'),
    },
    {
        id: 3,
        title: 'Crown of Three Missions',
        description: 'Achievement: Complete in one day: “Order of the Day”, “Knight’s Mission” and “Royal Challenge”.',
        quote: 'A wise ruler does not choose between tasks - he completes them all.',
        image: require('../assets/img/Thfqwfqwf/image12.png'),
    },
    {
        id: 4,
        title: 'Crown of Morning Dawn',
        description: 'Achievement: Complete tasks by 7:00 AM.',
        quote: 'Woke up before the sun - and already crowned.',
        image: require('../assets/img/Thfqwfqwf/image8.png'),
    },
    {
        id: 5,
        title: 'Crown of Stability',
        description: 'Achievement: Complete at least one task for 30 consecutive days.',
        quote: 'Your constancy creates empires. Your crown is golden and eternal.',
        image: require('../assets/img/Thfqwfqwf/image6.png'),
    },
    {
        id: 6,
        title: 'Crown of Rebirth',
        description: 'Achievement: Return to the app after a 7+ day break and complete the task.',
        quote: 'And even when fallen, the monarch returns with dignity. Your crown is for courage.',
        image: require('../assets/img/Thfqwfqwf/CroDawn.png'),
    },
    {
        id: 7,
        title: 'Crown of Fire',
        description: 'Achievement: Complete 10 tasks in one day.',
        quote: 'Your determination burned brighter than doubts. Your crown is burning.',
        image: require('../assets/img/Thfqwfqwf/fqwfytgui.png'),
    },
    {
        id: 8,
        title: 'Crown of Shadow',
        description: 'Achievement: Complete the task between 00:00 and 04:00.',
        quote: 'When the kingdom sleeps, you act. Your night crown is yours.',
        image: require('../assets/img/Thfqwfqwf/image7.png'),
    },
    {
        id: 9,
        title: 'Crown of First Blood',
        description: 'Achievement: Complete the “Royal Challenge” for the first time.',
        quote: 'Brave is the one who takes on greatness. Your first battle is your first crown.',
        image: require('../assets/img/Thfqwfqwf/image13.png'),
    },
    {
        id: 10,
        title: 'Crown of the Empty Throne',
        description: 'Achievement: Delete a quest that is no longer relevant for the first time.',
        quote: 'Sometimes it’s worth letting go. A crown for wisely freeing up space.',
        image: require('../assets/img/Thfqwfqwf/SteelCrown.png'),
    },
];

const { width } = Dimensions.get('window');
const cardWidth = (width - 40) / 2;

const AppcheckStories = () => {
    const [unlockedStories, setUnlockedStories] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedStory, setSelectedStory] = useState(null);

    useEffect(() => {
        checkStories();
    }, []);

    const checkStories = async () => {
        try {
            const lastOpenDate = await AsyncStorage.getItem('lastOpenDate');
            const savedUnlockedStories = await AsyncStorage.getItem('unlockedStories');
            let unlockedIds = savedUnlockedStories ? JSON.parse(savedUnlockedStories) : [1];

            const today = new Date().toISOString().split('T')[0];

            if (lastOpenDate !== today) {
                if (unlockedIds.length < storiesData.length) {
                    const nextStoryId = unlockedIds.length + 1;
                    unlockedIds.push(nextStoryId);
                    await AsyncStorage.setItem('unlockedStories', JSON.stringify(unlockedIds));
                    await AsyncStorage.setItem('lastOpenDate', today);
                }
            }

            setUnlockedStories(unlockedIds);
        } catch (e) {
            console.error('Failed to load/save data', e);
        }
    };

    const renderItem = ({ item }) => {
        const isUnlocked = unlockedStories.includes(item.id);

        const handlePress = () => {
            if (isUnlocked) {
                setSelectedStory(item);
                setModalVisible(true);
            }
        };




        return (
            <TouchableOpacity
                style={styles.cardContainer}
                onPress={handlePress}
                disabled={!isUnlocked}
            >
                {isUnlocked ? (
                    <Image source={item.image} style={styles.cardImage} />
                ) : (
                    <View style={styles.lockedCard}>
                        <Image source={item.image} style={styles.cardImage} />
                        <View style={styles.blurOverlay} />
                        <Image
                            source={require('../assets/img/Vectoqwfwqf.png')}
                            style={styles.lockIcon}
                        />
                    </View>
                )}
                <Text style={styles.cardTitle}>{item.title}</Text>
                {/*<TouchableOpacity style={styles.infoIcon}>*/}
                {/*    <Text style={{ color: 'white', fontWeight: 'bold' }}>i</Text>*/}
                {/*</TouchableOpacity>*/}
            </TouchableOpacity>
        );
    };

    const handleShare = async () => {
        if (!selectedStory) return;

        try {
            await Share.open({
                title: selectedStory.title,
                message: `${selectedStory.title}\n\n${selectedStory.description}\n\n"${selectedStory.quote}"`,
                url: '', // можно указать ссылку на сайт или изображение, если нужно
            });
        } catch (err) {
            console.error('Error sharing:', err);
        }
    };

    return (
        <ImageBackground
            source={require('../assets/img/ffbecb8cdffc0b0aee55fc7c34339381ed9ece71.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <FlatList
                    data={storiesData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                />

                {selectedStory && (
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.closeText}>X</Text>
                                </TouchableOpacity>
                                <Image source={selectedStory.image} style={styles.modalImage} />
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalTitle}>{selectedStory.title}</Text>
                                    <Text style={styles.modalDescription}>{selectedStory.description}</Text>
                                    <Text style={styles.modalQuote}>"{selectedStory.quote}"</Text>
                                    <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                                        <Text style={styles.shareText}>Share</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                )}
            </View>
            <View style={{marginBottom: 100}}/>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    cardContainer: {
        width: cardWidth,
        height: cardWidth * 1.5,
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    cardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },
    lockedCard: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    blurOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    lockIcon: {
        width: 50,
        height: 50,
        tintColor: '#fff',
        opacity: 0.8,
        zIndex: 1,
    },
    cardTitle: {
        position: 'absolute',
        bottom: 15,
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 4,
    },
    infoIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    modalView: {
        width: '90%',
        backgroundColor: 'black',
        borderRadius: 20,
        overflow: 'hidden',
    },
    modalImage: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    modalContent: {
        padding: 20,
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    modalTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalDescription: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    modalQuote: {
        color: 'white',
        fontSize: 14,
        fontStyle: 'italic',
        textAlign: 'center',
        marginBottom: 20,
    },
    shareButton: {
        backgroundColor: 'gold',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 30,
    },
    shareText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default AppcheckStories;
