// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, ScrollView, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {addTask} from "../redux/slices/taskSlice";
import TaskModal from "../component/TaskModal";
import InfoModal from "../component/InfoModal";
// Импортируем компонент модального окна

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const selectedCharacter = useSelector((state) => state.character.selectedCharacter);
    const characterStatus = useSelector((state) => state.character.status);
    const tasks = useSelector((state) => state.tasks); // Получаем все задачи из Redux

    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedColumnId, setSelectedColumnId] = useState(null); // Для отслеживания, какая колонка нажала '+'


    const [isInfoModalVisible, setInfoModalVisible] = useState(false);
    const [infoModalContent, setInfoModalContent] = useState({ title: '', description: '' });


    const handleOpenInfoModal = (title, description) => {
        setInfoModalContent({ title, description });
        setInfoModalVisible(true);
    };

    useEffect(() => {
        if (characterStatus === 'succeeded' && !selectedCharacter) {
            console.warn('No character found on HomeScreen, redirecting to WelcomeScreen.');
            navigation.replace('Welcome');
        }
    }, [characterStatus, selectedCharacter, navigation]);


    if (characterStatus === 'loading') {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#FFD700" />
                <Text style={styles.loadingText}>Loading your kingdom...</Text>
            </View>
        );
    }

    if (!selectedCharacter) {
        return null;
    }

    const handleAddTaskPress = (columnId) => {
        setSelectedColumnId(columnId);
        setModalVisible(true);
    };

    const handleSaveTask = (title, description, reminder) => {
        if (selectedColumnId) {
            dispatch(addTask(selectedColumnId, title, description, reminder));
            setModalVisible(false); // Закрываем модальное окно после сохранения
        }
    };

    const getColumnTitle = (columnId) => {
        switch (columnId) {
            case 'orderOfTheDay': return 'Order of the Day';
            case 'knightsMission': return 'Knight\'s Mission';
            case 'royalChallenge': return 'Royal Challenge';
            default: return 'Unknown Column';
        }
    };

    // Компонент для отображения одной задачи
    const renderTaskItem = ({ item }) => (
        <View style={styles.taskCard}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            {item.description ? <Text style={styles.taskDescription}>{item.description}</Text> : null}
            {item.reminder ? <Text style={styles.taskReminder}>Reminder: {item.reminder}</Text> : null}
        </View>
    );

    return (
        <ImageBackground
            source={require('../assets/img/ffbecb8cdffc0b0aee55fc7c34339381ed9ece71.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay} />

            {/* Top Header Section */}
            <View style={styles.headerContainer}>

                <ScrollView style={styles.headerTabs} horizontal={true}>
                    <TouchableOpacity
                        style={styles.headerTab}
                        onPress={() => handleOpenInfoModal('Order of the Day', 'In this column, mark all the easy tasks you plan to start with. This is your initial to-do list.')}>
                        <Text style={styles.headerTabText}>📜</Text>
                        <Text style={styles.headerTabText}>To Do</Text>
                        <Text style={styles.infoIcon}>ⓘ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.headerTab}
                        onPress={() => handleOpenInfoModal('Knight\'s Mission', 'Here you can move tasks that are currently in progress. Focus on one mission at a time to complete your quests!')}>
                        <Text style={styles.headerTabText}>🏹</Text>
                        <Text style={styles.headerTabText}>In progress</Text>
                        <Text style={styles.infoIcon}>ⓘ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.headerTab}
                        onPress={() => handleOpenInfoModal('Royal Challenge', 'Use this column to celebrate your victories! Mark tasks you have already completed. Great job!')}>
                        <Text style={styles.headerTabText}>👑</Text>
                        <Text style={styles.headerTabText}>Done</Text>
                        <Text style={styles.infoIcon}>ⓘ</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>

            {/* Main Content: Columns */}
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.columnsContainer}
            >
                {/* Column 1: Order of the Day */}
                <View style={styles.column}>
                    <TouchableOpacity style={styles.addColumnButton} onPress={() => handleAddTaskPress('orderOfTheDay')}>
                        <Text style={styles.plusText}>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.columnDescription}>is an easy task to start</Text>
                    <FlatList
                        data={tasks.orderOfTheDay}
                        renderItem={renderTaskItem}
                        keyExtractor={(item) => item.id}
                        ListEmptyComponent={<Text style={styles.placeholderText}>No tasks yet.</Text>}
                        contentContainerStyle={styles.tasksListContainer}
                    />
                </View>

                {/* Column 2: Knight's Mission */}
                <View style={styles.column}>
                    <TouchableOpacity style={styles.addColumnButton} onPress={() => handleAddTaskPress('knightsMission')}>
                        <Text style={styles.plusText}>+</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={tasks.knightsMission}
                        renderItem={renderTaskItem}
                        keyExtractor={(item) => item.id}
                        ListEmptyComponent={<Text style={styles.placeholderText}>No tasks yet.</Text>}
                        contentContainerStyle={styles.tasksListContainer}
                    />
                </View>

                {/* Column 3: Royal Challenge */}
                <View style={styles.column}>
                    <TouchableOpacity style={styles.addColumnButton} onPress={() => handleAddTaskPress('royalChallenge')}>
                        <Text style={styles.plusText}>+</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={tasks.royalChallenge}
                        renderItem={renderTaskItem}
                        keyExtractor={(item) => item.id}
                        ListEmptyComponent={<Text style={styles.placeholderText}>No tasks yet.</Text>}
                        contentContainerStyle={styles.tasksListContainer}
                    />
                </View>
            </ScrollView>
            <View style={{marginBottom: 20,}}/>
            {/* Модальное окно создания задачи */}

            <InfoModal
                isVisible={isInfoModalVisible}
                onClose={() => setInfoModalVisible(false)}
                title={infoModalContent.title}
                description={infoModalContent.description}
            />

            <TaskModal
                isVisible={isModalVisible}
                onClose={() => setModalVisible(false)}
                onSave={handleSaveTask}
                columnTitle={getColumnTitle(selectedColumnId)}
            />
        </ImageBackground>
    );
};

// ... (стили)
const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
    },
    loadingText: {
        marginTop: 10,
        color: '#FFD700',
        fontSize: 16,
    },
    headerContainer: {
        flexDirection: 'row',
        paddingTop: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderBottomWidth: 1,
        borderBottomColor: '#FFD700',
        width: '100%',
    },
    profileIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFD700',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#fff',
    },
    profileText: {
        color: '#1a1a1a',
        fontSize: 20,
        fontWeight: 'bold',
    },
    menuIcon: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuText: {
        color: '#FFFFFF',
        fontSize: 24,
    },
    headerTabs: {
        flexDirection: 'row',
        // flex: 1,
        // justifyContent: 'space-around',
        marginLeft: 10,
    },
    headerTab: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#FFD700',
        backgroundColor: 'rgba(255, 215, 0, 0.2)',
        marginHorizontal: 4,
    },
    headerTabIcon: {
        width: 18,
        height: 18,
        marginRight: 5,
        tintColor: '#FFFFFF',
    },
    headerTabText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    infoIcon: {
        color: '#FFFFFF',
        fontSize: 12,
        marginLeft: 5,
    },
    columnsContainer: {
        flexGrow: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    column: {
        width: width * 0.9,
        // height: height * 0.8, // Можно убрать фиксированную высоту, если FlatList будет занимать оставшееся пространство
        flex: 1, // Позволяет колонке растягиваться
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FFD700',
        marginHorizontal: width * 0.02,
        padding: 15,
        alignItems: 'center',
    },
    addColumnButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFD700',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 7,
    },
    plusText: {
        color: '#1a1a1a',
        fontSize: 30,
        fontWeight: 'bold',
    },
    columnDescription: {
        color: '#CCCCCC',
        fontSize: 14,
        fontStyle: 'italic',
        marginBottom: 15,
        textAlign: 'center',
    },
    // Вместо taskPlaceholder теперь будет использоваться FlatList
    tasksListContainer: {
        flexGrow: 1, // Позволяет FlatList растягиваться
        width: '100%',

        paddingBottom: 10,

    },
    placeholderText: {
        color: '#AAAAAA',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    taskCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        width: width * 0.8,
     borderLeftWidth: 3,
        borderColor: '#FFD700',
    },
    taskTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    taskDescription: {
        color: '#CCCCCC',
        fontSize: 14,
        marginBottom: 5,
    },
    taskReminder: {
        color: '#FFD700',
        fontSize: 12,
        fontStyle: 'italic',
    },
});

export default HomeScreen;
