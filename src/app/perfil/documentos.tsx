import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  ProfileSubscreenLayout,
  profileColors,
} from '@/components/home/profile-subscreen-layout';

type DocumentItem = {
  id: string;
  title: string;
  protocol: string;
  updatedAt: string;
  status: 'Disponível' | 'Em análise';
};

const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    title: 'Declaração de Matrícula (2026.2)',
    protocol: 'Protocolo #UNX-84920',
    updatedAt: 'Emitido em 10/11/2026',
    status: 'Disponível',
  },
  {
    id: 'doc-2',
    title: 'Histórico Escolar Parcial',
    protocol: 'Protocolo #UNX-84105',
    updatedAt: 'Atualizado em 02/11/2026',
    status: 'Disponível',
  },
  {
    id: 'doc-3',
    title: 'Atestado de Frequência — Estágio',
    protocol: 'Protocolo #UNX-85311',
    updatedAt: 'Solicitado em 15/11/2026',
    status: 'Em análise',
  },
];

export default function DocumentosScreen() {
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [notice, setNotice] = useState<{ title: string; description: string } | null>(null);

  const handleRequestNewDocument = () => {
    const nextProtocol = `#UNX-${Math.floor(86000 + Math.random() * 9000)}`;
    setDocuments((prev) => [
      {
        id: `doc-${Date.now()}`,
        title: 'Declaração de Vínculo Acadêmico',
        protocol: `Protocolo ${nextProtocol}`,
        updatedAt: 'Solicitado agora',
        status: 'Em análise',
      },
      ...prev,
    ]);
    setNotice({
      title: 'Solicitação registrada',
      description: `Seu pedido foi registrado sob o protocolo ${nextProtocol} e ficará disponível em até 24h úteis.`,
    });
  };

  return (
    <ProfileSubscreenLayout
      title="Documentos"
      description="Emita declarações e acompanhe protocolos acadêmicos"
    >
      <View style={styles.card}>
        <Text style={styles.groupHeading}>SOLICITAÇÕES E EMISSÕES</Text>
        {documents.map((doc, idx) => {
          const isReady = doc.status === 'Disponível';
          return (
            <View key={doc.id}>
              <View style={styles.docRow}>
                <View style={styles.iconTile}>
                  <Feather name="file-text" color="#65708d" size={20} />
                </View>
                <View style={styles.copy}>
                  <Text style={styles.title}>{doc.title}</Text>
                  <Text style={styles.subtitle}>
                    {doc.protocol} • {doc.updatedAt}
                  </Text>
                  <View
                    style={[
                      styles.badge,
                      {
                        backgroundColor: isReady
                          ? profileColors.successBg
                          : profileColors.warningBg,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.badgeText,
                        {
                          color: isReady
                            ? profileColors.successText
                            : profileColors.warningText,
                        },
                      ]}
                    >
                      {doc.status}
                    </Text>
                  </View>
                </View>

                {isReady ? (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Baixar ${doc.title}`}
                    onPress={() =>
                      setNotice({
                        title: 'Documento validado',
                        description: `${doc.title} (${doc.protocol}) autenticado com assinatura digital UNEX.`,
                      })
                    }
                    style={({ pressed }) => [styles.downloadBtn, pressed && styles.pressed]}
                  >
                    <Feather name="download" color={profileColors.navy} size={18} />
                  </Pressable>
                ) : null}
              </View>
              {idx < documents.length - 1 ? <View style={styles.divider} /> : null}
            </View>
          );
        })}
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={handleRequestNewDocument}
        style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
      >
        <Feather name="plus" color={profileColors.navy} size={18} />
        <Text style={styles.primaryButtonLabel}>Solicitar nova declaração</Text>
      </Pressable>

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
    paddingBottom: 14,
  },
  groupHeading: {
    color: '#929ab1',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 8,
  },
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
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
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 2,
  },
  badgeText: { fontSize: 10, fontWeight: '700' },
  downloadBtn: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: profileColors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: { height: 1, backgroundColor: '#e4e6ec' },
  primaryButton: {
    minHeight: 50,
    borderRadius: 15,
    backgroundColor: profileColors.lime,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 18,
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