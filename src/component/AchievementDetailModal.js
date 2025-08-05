// src/components/AchievementDetailModal.js

import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Share from 'react-native-share';

const AchievementDetailModal = ({ isVisible, onClose, achievement }) => {
    if (!achievement) {
        return null;
    }

    const onShare = async () => {
        try {
            const shareOptions = {
                title: `I unlocked the "${achievement.title}" achievement!`,
                message: `${achievement.quote}\n\nJoin me in the Kingdom of Quests!`,
            };
            await Share.open(shareOptions);
        } catch (error) {
            console.log('Error sharing:', error.message);
        }
    };

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
                    <Image source={achievement.image} style={styles.modalImage} />
                    <View style={styles.contentContainer}>
                        <Text style={styles.modalTitle}>{achievement.title}</Text>
                        <Text style={styles.achievementText}>Achievement: {achievement.description}</Text>
                        <Text style={styles.quoteText}>"{achievement.quote}"</Text>
                        <TouchableOpacity style={styles.shareButton} onPress={onShare}>
                            <Text style={styles.shareButtonText}>Share</Text>
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
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalView: {
        width: '90%',
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
        color: 'white',
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
        width: '100%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFD700',
        marginBottom: 10,
        textAlign: 'center',
    },
    achievementText: {
        fontSize: 16,
        color: '#CCCCCC',
        textAlign: 'center',
        marginBottom: 15,
    },
    quoteText: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#999999',
        textAlign: 'center',
        marginBottom: 20,
    },
    shareButton: {
        backgroundColor: '#FFD700',
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 30,
    },
    shareButtonText: {
        color: '#1a1a1a',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default AchievementDetailModal;
