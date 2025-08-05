import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import Share from 'react-native-share';

const AchievementModal = ({ isVisible, onClose, achievement }) => {
    if (!achievement) {
        return null;
    }

    const onShare = async () => {
        try {
            const shareOptions = {
                title: 'Check out my new achievement!',
                message: `I just unlocked the "${achievement.title}" achievement in Kingdom of Quests!`,
                url: achievement.image, // URL изображения, если доступно
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
                    <Image source={achievement.image} style={styles.modalImage} />
                    <Text style={styles.modalTitle}>{achievement.title}</Text>
                    <Text style={styles.modalDescription}>{achievement.description}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.shareButton]}
                            onPress={onShare} // <-- Здесь вызываем новую функцию
                        >
                            <Text style={styles.buttonText}>Share</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.closeButton]}
                            onPress={onClose}
                        >
                            <Text style={styles.buttonText}>Close</Text>
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
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalImage: {
        width: '100%',
        height: 250,
        borderRadius: 18,
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFD700',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalDescription: {
        fontSize: 16,
        color: '#CCCCCC',
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        borderRadius: 25,
        padding: 12,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    shareButton: {
        backgroundColor: '#FFD700',
    },
    closeButton: {
        backgroundColor: '#8B0000',
    },
    buttonText: {
        color: '#1a1a1a',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default AchievementModal;
