import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import {
  ProfileSubscreenLayout,
  profileColors,
} from '@/components/home/profile-subscreen-layout';

export default function PrivacidadeScreen() {
  const [prefs, setPrefs] = useState({
    biometricLock: true,
    shareDirectory: false,
    usageAnalytics: true,
  });
  const [lgpdModalVisible, setLgpdModalVisible] = useState(false);

  const toggle = (key: keyof typeof prefs) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ProfileSubscreenLayout
      title="Privacidade"
      description="Preferências e controles relacionados aos dados"
    >
      <View style={styles.card}>
        <Text style={styles.groupHeading}>CONTROLE DE DADOS E SEGURANÇA</Text>

        <View style={styles.switchRow}>
          <View style={styles.copy}>
            <Text style={styles.title}>Bloqueio por biometria / PIN</Text>
            <Text style={styles.subtitle}>
              Exigir autenticação do dispositivo ao abrir documentos e notas
            </Text>
          </View>
          <Switch
            value={prefs.biometricLock}
            onValueChange={() => toggle('biometricLock')}
            trackColor={{ false: '#d8dce6', true: profileColors.navy }}
            thumbColor={prefs.biometricLock ? profileColors.lime : profileColors.white}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.switchRow}>
          <View style={styles.copy}>
            <Text style={styles.title}>Visibilidade em grupos de turma</Text>
            <Text style={styles.subtitle}>
              Permitir que colegas de disciplina vejam seu nome e curso
            </Text>
          </View>
          <Switch
            value={prefs.shareDirectory}
            onValueChange={() => toggle('shareDirectory')}
            trackColor={{ false: '#d8dce6', true: profileColors.navy }}
            thumbColor={prefs.shareDirectory ? profileColors.lime : profileColors.white}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.switchRow}>
          <View style={styles.copy}>
            <Text style={styles.title}>Diagnóstico de desempenho</Text>
            <Text style={styles.subtitle}>
              Enviar relatórios anônimos de falhas para melhoria do Nexa
            </Text>
          </View>
          <Switch
            value={prefs.usageAnalytics}
            onValueChange={() => toggle('usageAnalytics')}
            trackColor={{ false: '#d8dce6', true: profileColors.navy }}
            thumbColor={prefs.usageAnalytics ? profileColors.lime : profileColors.white}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.groupHeading}>LGPD E PORTABILIDADE</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => setLgpdModalVisible(true)}
          style={({ pressed }) => [styles.optionRow, pressed && styles.pressed]}
        >
          <View style={styles.iconTile}>
            <Feather name="shield" color="#65708d" size={20} />
          </View>
          <View style={styles.copy}>
            <Text style={styles.title}>Solicitar cópia dos meus dados</Text>
            <Text style={styles.subtitle}>
              Relatório consolidado conforme Lei Geral de Proteção de Dados
            </Text>
          </View>
          <Feather name="chevron-right" color="#252b41" size={20} />
        </Pressable>
      </View>

      <Modal
        visible={lgpdModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLgpdModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View accessibilityViewIsModal style={styles.modalCard}>
            <Text accessibilityRole="header" style={styles.modalTitle}>
              Exportação de dados (LGPD)
            </Text>
            <Text style={styles.modalDescription}>
              Geramos um relatório completo com seus dados cadastrais e histórico de acessos. O link será enviado para seu e-mail acadêmico.
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => setLgpdModalVisible(false)}
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
    paddingBottom: 14,
  },
  groupHeading: {
    color: '#929ab1',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 8,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
    paddingVertical: 14,
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