// src/components/TaskModal.js
import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native';

const TaskModal = ({ isVisible, onClose, onSave, columnTitle }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [reminder, setReminder] = useState(''); // Для напоминания

    const handleSave = () => {
        if (title.trim()) { // Проверяем, что заголовок не пуст
            onSave(title, description, reminder);
            // Сброс формы после сохранения
            setTitle('');
            setDescription('');
            setReminder('');
        } else {
            Alert.alert('Task title cannot be empty!');
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.centeredView}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Creating a task</Text>
                    <Text style={styles.columnNameText}>for: {columnTitle}</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        placeholderTextColor="#888"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        style={[styles.input, styles.descriptionInput]}
                        placeholder="Description"
                        placeholderTextColor="#888"
                        multiline
                        numberOfLines={4}
                        value={description}
                        onChangeText={setDescription}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Reminder (optional)"
                        placeholderTextColor="#888"
                        value={reminder}
                        onChangeText={setReminder}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onClose}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.saveButton]}
                            onPress={handleSave}
                        >
                            <Text style={styles.buttonText}>Save Task</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Затемнение фона
    },
    modalView: {
        width: '90%',
        backgroundColor: '#1a1a1a', // Темный фон модалки
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#FFD700', // Золотая рамка
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFD700', // Золотой заголовок
        marginBottom: 10,
    },
    columnNameText: {
        fontSize: 16,
        color: '#CCCCCC',
        marginBottom: 20,
        fontStyle: 'italic',
    },
    input: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Полупрозрачный фон для инпутов
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        color: '#FFFFFF', // Белый текст
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#FFD700', // Золотая рамка
    },
    descriptionInput: {
        minHeight: 100, // Высота для описания
        textAlignVertical: 'top', // Выравнивание текста вверху для multiline
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    button: {
        borderRadius: 20,
        padding: 12,
        elevation: 2,
        flex: 1,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#8B0000', // Темно-красный
    },
    saveButton: {
        backgroundColor: '#FFD700', // Золотой
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default TaskModal;
