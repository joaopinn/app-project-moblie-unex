import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import {
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  ProfileSubscreenLayout,
  profileColors,
} from '@/components/home/profile-subscreen-layout';

const ACADEMIC_PORTAL_URL = 'https://aluno.unex.edu.br/#/login';

export default function AjudaScreen() {
  const [message, setMessage] = useState('');
  const [notice, setNotice] = useState<{ title: string; description: string } | null>(null);

  const openPortal = async () => {
    try {
      const supported = await Linking.canOpenURL(ACADEMIC_PORTAL_URL);
      if (!supported) {
        setNotice({
          title: 'Portal do Aluno',
          description: `Não foi possível abrir ${ACADEMIC_PORTAL_URL} neste dispositivo.`,
        });
        return;
      }
      await Linking.openURL(ACADEMIC_PORTAL_URL);
    } catch {
      setNotice({
        title: 'Erro de conexão',
        description: 'Verifique sua internet e tente novamente.',
      });
    }
  };

  const handleSendTicket = () => {
    const trimmed = message.trim();
    if (trimmed.length < 10) {
      setNotice({
        title: 'Mensagem muito curta',
        description: 'Descreva sua dúvida ou solicitação com pelo menos 10 caracteres.',
      });
      return;
    }

    setMessage('');
    setNotice({
      title: 'Chamado enviado à secretaria',
      description:
        'Sua solicitação foi encaminhada para a central de atendimento UNEX Feira de Santana.',
    });
  };

  return (
    <ProfileSubscreenLayout
      title="Ajuda e atendimento"
      description="Encontre os canais oficiais de suporte"
    >
      <View style={styles.card}>
        <Text style={styles.groupHeading}>CANAIS OFICIAIS UNEX</Text>

        <Pressable
          accessibilityRole="link"
          onPress={() => void openPortal()}
          style={({ pressed }) => [styles.optionRow, pressed && styles.pressed]}
        >
          <View style={styles.iconTile}>
            <Feather name="globe" color="#65708d" size={20} />
          </View>
          <View style={styles.copy}>
            <Text style={styles.title}>Portal do Aluno (Web)</Text>
            <Text style={styles.subtitle}>
              Abertura de requerimentos, financeiro e secretaria digital
            </Text>
          </View>
          <Feather name="external-link" color="#252b41" size={20} />
        </Pressable>

        <View style={styles.divider} />

        <Pressable
          accessibilityRole="button"
          onPress={() =>
            setNotice({
              title: 'Atendimento Presencial — Feira de Santana',
              description:
                'Secretaria Acadêmica (Bloco Principal): Segunda a Sexta, das 08h às 21h.',
            })
          }
          style={({ pressed }) => [styles.optionRow, pressed && styles.pressed]}
        >
          <View style={styles.iconTile}>
            <Feather name="map-pin" color="#65708d" size={20} />
          </View>
          <View style={styles.copy}>
            <Text style={styles.title}>Secretaria Presencial</Text>
            <Text style={styles.subtitle}>
              Unidade Feira de Santana • Seg a Sex, 08h às 21h
            </Text>
          </View>
          <Feather name="chevron-right" color="#252b41" size={20} />
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.groupHeading}>ABRIR CHAMADO RÁPIDO</Text>
        <TextInput
          accessibilityLabel="Descreva sua dúvida ou problema"
          placeholder="Ex: Preciso atualizar meu e-mail institucional ou validar horas..."
          placeholderTextColor="#9b9da6"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={message}
          onChangeText={setMessage}
          style={styles.textArea}
        />
        <Pressable
          accessibilityRole="button"
          onPress={handleSendTicket}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
        >
          <Feather name="send" color={profileColors.navy} size={17} />
          <Text style={styles.primaryButtonLabel}>Enviar solicitação</Text>
        </Pressable>
      </View>

      <Modal
        visible={notice !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setNotice(null)}
      >
        <View style={styles.modalBackdrop}>
          <View accessibilityViewIsModal style={styles.modalCard}>
            <Text accessibilityRole="header" style={styles.modalTitle}>
              {notice?.title}
            </Text>
            <Text style={styles.modalDescription}>{notice?.description}</Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => setNotice(null)}
              style={({ pressed }) => [styles.modalButton, pressed && styles.pressed]}
            >
              <Text style={styles.modalButtonLabel}>Entendi</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ProfileSubscreenLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: profileColors.white,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: profileColors.line,
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 18,
  },
  groupHeading: {
    color: '#929ab1',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 8,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 12,
  },
  iconTile: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: profileColors.tileBg,
  },
  copy: { flex: 1, minWidth: 0, gap: 4 },
  title: { color: profileColors.ink, fontSize: 13, lineHeight: 18, fontWeight: '700' },
  subtitle: { color: '#959bad', fontSize: 11, lineHeight: 15 },
  divider: { height: 1, backgroundColor: '#e4e6ec' },
  textArea: {
    minHeight: 104,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: profileColors.line,
    backgroundColor: profileColors.background,
    padding: 14,
    fontSize: 13,
    color: profileColors.ink,
    marginTop: 4,
  },
  primaryButton: {
    minHeight: 50,
    borderRadius: 15,
    backgroundColor: profileColors.lime,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 18,
    marginTop: 14,
  },
  primaryButtonLabel: { color: profileColors.navy, fontSize: 13, fontWeight: '800' },
  pressed: { opacity: 0.65 },
  modalBackdrop: {
    flex: 1,
    backgroundColor: '#10142a70',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: profileColors.white,
    borderRadius: 22,
    padding: 24,
    gap: 18,
  },
  modalTitle: { color: profileColors.ink, fontSize: 18, fontWeight: '800' },
  modalDescription: { color: profileColors.muted, fontSize: 14, lineHeight: 21 },
  modalButton: {
    minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: profileColors.lime,
    paddingHorizontal: 18,
  },
  modalButtonLabel: { color: profileColors.navy, fontSize: 13, fontWeight: '800' },
});