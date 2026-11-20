import { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import {
  ProfileSubscreenLayout,
  profileColors,
} from '@/components/home/profile-subscreen-layout';

export default function NotificacoesScreen() {
  const [prefs, setPrefs] = useState({
    academic: true,
    financial: true,
    events: true,
    emailDigest: false,
  });

  const toggle = (key: keyof typeof prefs) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ProfileSubscreenLayout
      title="Notificações"
      description="Escolha quais tipos de comunicados deseja receber"
    >
      <View style={styles.card}>
        <Text style={styles.groupHeading}>CANAIS E ALERTAS</Text>

        <View style={styles.switchRow}>
          <View style={styles.copy}>
            <Text style={styles.title}>Notas, faltas e avaliações</Text>
            <Text style={styles.subtitle}>
              Avisos imediatos quando professores lançarem notas ou frequência
            </Text>
          </View>
          <Switch
            value={prefs.academic}
            onValueChange={() => toggle('academic')}
            trackColor={{ false: '#d8dce6', true: profileColors.navy }}
            thumbColor={prefs.academic ? profileColors.lime : profileColors.white}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.switchRow}>
          <View style={styles.copy}>
            <Text style={styles.title}>Secretaria e financeiro</Text>
            <Text style={styles.subtitle}>
              Lembretes de rematrícula, boletos e prazos de documentos
            </Text>
          </View>
          <Switch
            value={prefs.financial}
            onValueChange={() => toggle('financial')}
            trackColor={{ false: '#d8dce6', true: profileColors.navy }}
            thumbColor={prefs.financial ? profileColors.lime : profileColors.white}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.switchRow}>
          <View style={styles.copy}>
            <Text style={styles.title}>Eventos e extensão UNEX</Text>
            <Text style={styles.subtitle}>
              Seminários, workshops, vagas de estágio e horas complementares
            </Text>
          </View>
          <Switch
            value={prefs.events}
            onValueChange={() => toggle('events')}
            trackColor={{ false: '#d8dce6', true: profileColors.navy }}
            thumbColor={prefs.events ? profileColors.lime : profileColors.white}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.switchRow}>
          <View style={styles.copy}>
            <Text style={styles.title}>Resumo semanal por e-mail</Text>
            <Text style={styles.subtitle}>
              Receber compilado toda segunda-feira no e-mail institucional
            </Text>
          </View>
          <Switch
            value={prefs.emailDigest}
            onValueChange={() => toggle('emailDigest')}
            trackColor={{ false: '#d8dce6', true: profileColors.navy }}
            thumbColor={prefs.emailDigest ? profileColors.lime : profileColors.white}
          />
        </View>
      </View>
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
  copy: { flex: 1, minWidth: 0, gap: 4 },
  title: { color: profileColors.ink, fontSize: 13, lineHeight: 18, fontWeight: '700' },
  subtitle: { color: '#959bad', fontSize: 11, lineHeight: 15 },
  divider: { height: 1, backgroundColor: '#e4e6ec' },
});