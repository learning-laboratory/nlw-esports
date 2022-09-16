import React from 'react';
import { Modal, ModalProps, Text, View, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { THEME } from '../../theme';
import { CheckCircle } from 'phosphor-react-native';
import { Heading } from '../Heading';
import * as Clipboard from 'expo-clipboard';

interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {

    async function handleCopyDiscordIdToClipboard() {
        await Clipboard.setStringAsync(discord);
        Alert.alert("Discord", "O endereço do discord foi copiado.")
    }

    return (
        <Modal animationType='fade' transparent {...rest}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                        <MaterialIcons name='close' size={20} color={THEME.COLORS.CAPTION_500} />
                    </TouchableOpacity>

                    <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />

                    <Heading title="Let's play!" subtitle="Agora é só começar a jogar" style={{ alignItems: 'center', marginTop: 24 }} />

                    <Text style={styles.label}>Adicione o seu discord</Text>
                    <TouchableOpacity style={styles.discordBtn} onPress={handleCopyDiscordIdToClipboard}>
                        <Text style={styles.discord}>{discord}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}