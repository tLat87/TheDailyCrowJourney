// src/components/DailyStoryModal.js

import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const DailyStoryModal = ({ isVisible, onClose, story }) => {
    if (!story) {
        return null;
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                    <Image source={story.image} style={styles.modalImage} resizeMode="cover" />
                    <View style={styles.contentContainer}>
                        <Text style={styles.modalTitle}>{story.title}</Text>
                        <Text style={styles.modalText}>{story.text}</Text>
                        <TouchableOpacity style={styles.okButton} onPress={onClose}>
                            <Text style={styles.okButtonText}>Continue the journey</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
    },
    modalView: {
        width: width * 0.9,
        maxHeight: height * 0.8,
        backgroundColor: '#1a1a1a',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#FFD700',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#8B0000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalImage: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
    },
    contentContainer: {
        padding: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFD700',
        textAlign: 'center',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        color: '#CCCCCC',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 22,
    },
    okButton: {
        backgroundColor: '#FFD700',
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 30,
        marginTop: 10,
    },
    okButtonText: {
        color: '#1a1a1a',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default DailyStoryModal;
