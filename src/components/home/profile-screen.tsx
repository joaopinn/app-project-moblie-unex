import Feather from '@expo/vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useState, type ComponentProps } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type IconName = ComponentProps<typeof Feather>['name'];
type ProfileAction =
  | 'Portal acadêmico'
  | 'Documentos'
  | 'Notificações'
  | 'Privacidade'
  | 'Ajuda e atendimento';
type Notice = { title: string; description: string };

type ProfileScreenProps = {
  /** Opcional: permite abrir a tela real de cada item do perfil. */
  onOpenAction?: (action: ProfileAction) => void;
};

const colors = {
  ink: '#171a2c',
  muted: '#818697',
  subtle: '#a0a5b3',
  line: '#e7eaf1',
  navy: '#151936',
  lime: '#d5ec63',
  white: '#ffffff',
  background: '#fbfbfc',
};

const profileGroups: {
  heading: string;
  items: { title: ProfileAction; description: string; icon: IconName }[];
}[] = [
  {
    heading: 'CONTA E ACESSO',
    items: [
      {
        title: 'Portal acadêmico',
        description: 'Abrir o ambiente institucional oficial',
        icon: 'grid',
      },
      {
        title: 'Documentos',
        description: 'Consultar acessos e solicitações acadêmicas',
        icon: 'file-text',
      },
    ],
  },
  {
    heading: 'PREFERÊNCIAS',
    items: [
      {
        title: 'Notificações',
        description: 'Escolha quais tipos de comunicados deseja receber',
        icon: 'bell',
      },
      {
        title: 'Privacidade',
        description: 'Preferências e controles relacionados aos dados',
        icon: 'lock',
      },
    ],
  },
  {
    heading: 'SUPORTE',
    items: [
      {
        title: 'Ajuda e atendimento',
        description: 'Encontre os canais oficiais de suporte',
        icon: 'help-circle',
      },
    ],
  },
];

function Icon({
  name,
  color = colors.muted,
  size = 20,
}: {
  name: IconName;
  color?: string;
  size?: number;
}) {
  return <Feather name={name} size={size} color={color} />;
}

export function ProfileScreen({ onOpenAction }: ProfileScreenProps = {}) {
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState<Notice | null>(null);

  const visibleGroups = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR');
    if (!normalizedQuery) return profileGroups;

    return profileGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          `${item.title} ${item.description} ${group.heading}`
            .toLocaleLowerCase('pt-BR')
            .includes(normalizedQuery),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [query]);

  const openAction = (action: ProfileAction) => {
    if (onOpenAction) {
      onOpenAction(action);
      return;
    }

    const descriptions: Record<ProfileAction, string> = {
      'Portal acadêmico':
        'O acesso ao portal acadêmico oficial será conectado aqui. Nenhuma página externa foi configurada neste protótipo.',
      Documentos:
        'As consultas e solicitações de documentos acadêmicos serão conectadas quando os destinos oficiais estiverem definidos.',
      Notificações:
        'As preferências de notificações poderão ser configuradas aqui quando essa funcionalidade estiver implementada.',
      Privacidade:
        'As opções de privacidade e gerenciamento de dados serão exibidas aqui quando a funcionalidade estiver implementada.',
      'Ajuda e atendimento':
        'Os canais oficiais de suporte serão conectados aqui quando os contatos da instituição forem definidos.',
    };

    setNotice({ title: action, description: descriptions[action] });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.shell}>
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <View accessibilityLabel="Nexa, by UNEX">
              <Text style={styles.logo}>
                ne<Text style={styles.logoAccent}>x</Text>a
              </Text>
              <Text style={styles.byline}>by UNEX</Text>
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Ver notificações"
              hitSlop={8}
              onPress={() =>
                setNotice({
                  title: 'Notificações',
                  description:
                    'Os comunicados e avisos institucionais serão exibidos aqui quando a integração estiver disponível.',
                })
              }
              style={styles.bell}
            >
              <Icon name="bell" color="#596078" size={22} />
              <View style={styles.notificationDot} />
            </Pressable>
          </View>

          <View style={styles.searchBox}>
            <Icon name="search" size={20} color="#858995" />
            <TextInput
              accessibilityLabel="Buscar opções do perfil"
              placeholder="Busque cursos, serviços, notícias ou eventos..."
              placeholderTextColor="#9b9da6"
              value={query}
              onChangeText={setQuery}
              returnKeyType="search"
              style={styles.searchInput}
            />
            {query.length > 0 ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Limpar busca"
                onPress={() => setQuery('')}
                hitSlop={8}
              >
                <Icon name="x" size={17} />
              </Pressable>
            ) : null}
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.pageHeading}>
            <Text style={styles.eyebrow}>PERFIL</Text>
            <Text accessibilityRole="header" style={styles.pageTitle}>
              Área do aluno
            </Text>
          </View>

          <LinearGradient
            colors={['#171a3a', '#202950']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.studentCard}
          >
            <View style={styles.studentTopRow}>
              <View style={styles.studentNameBlock}>
                <Text style={styles.studentName} numberOfLines={2}>
                  Murillo dos Santos Marinho Ferreira
                </Text>
                <Text style={styles.studentCourse}>
                  Sistemas de Informação · 6º semestre
                </Text>
              </View>
              <View style={styles.studentIdBlock}>
                <Text style={styles.fieldLabel}>Matrícula</Text>
                <Text style={styles.studentId}>20240103</Text>
              </View>
            </View>

            <View style={styles.studentBottomRow}>
              <View style={styles.unitBlock}>
                <Text style={styles.fieldLabel}>Unidade</Text>
                <Text style={styles.unitValue}>Feira de Santana • Noturno</Text>
              </View>
              <View style={styles.statusBlock}>
                <Text style={styles.fieldLabel}>Status</Text>
                <Text style={styles.statusValue}>Ativo</Text>
              </View>
            </View>
          </LinearGradient>

          <View style={styles.optionsCard}>
            {visibleGroups.map((group, groupIndex) => (
              <View key={group.heading} style={styles.group}>
                <Text style={styles.groupHeading}>{group.heading}</Text>
                {group.items.map((item, itemIndex) => (
                  <View key={item.title}>
                    <Pressable
                      accessibilityRole="button"
                      onPress={() => openAction(item.title)}
                      style={({ pressed }) => [
                        styles.optionRow,
                        pressed && styles.pressed,
                      ]}
                    >
                      <View style={styles.optionIconTile}>
                        <Icon name={item.icon} color="#65708d" size={20} />
                      </View>
                      <View style={styles.optionCopy}>
                        <Text style={styles.optionTitle}>{item.title}</Text>
                        <Text style={styles.optionDescription}>
                          {item.description}
                        </Text>
                      </View>
                      <Icon name="chevron-right" color="#252b41" size={20} />
                    </Pressable>
                    {itemIndex < group.items.length - 1 ? (
                      <View style={styles.rowDivider} />
                    ) : null}
                  </View>
                ))}
                {groupIndex < visibleGroups.length - 1 ? (
                  <View style={styles.groupSpacing} />
                ) : null}
              </View>
            ))}

            {visibleGroups.length === 0 ? (
              <Text style={styles.emptyText} accessibilityLiveRegion="polite">
                Nenhuma opção encontrada para “{query}”.
              </Text>
            ) : null}
          </View>
        </ScrollView>

        <SafeAreaView edges={['bottom']} style={styles.bottomBar}>
          <View style={styles.navigation}>
            {navigation.map((item) => {
              const isActive = item.label === 'Perfil';
              return (
                <Pressable
                  key={item.label}
                  accessibilityRole="button"
                  accessibilityLabel={item.label}
                  accessibilityState={{ selected: isActive }}
                  onPress={() => navigateToScreen(item.label)}
                  style={styles.navItem}
                >
                  <View
                    style={[
                      styles.navIcon,
                      isActive && styles.activeNavIcon,
                    ]}
                  >
                    <Icon
                      name={item.icon}
                      size={27}
                      color={isActive ? colors.navy : '#9299ad'}
                    />
                  </View>
                  <Text
                    style={[
                      styles.navLabel,
                      isActive && styles.activeNavLabel,
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </SafeAreaView>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.white },
  shell: {
    flex: 1,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f1f5',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
    paddingHorizontal: 0,
  },
  logo: {
    color: colors.navy,
    fontSize: 32,
    lineHeight: 34,
    fontWeight: '900',
    letterSpacing: -2,
  },
  logoAccent: { color: '#a5bf38' },
  byline: { fontSize: 11, color: colors.muted, marginTop: -2 },
  bell: { padding: 11 },
  notificationDot: {
    position: 'absolute',
    right: 9,
    top: 7,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#b5d83e',
    borderWidth: 1,
    borderColor: colors.white,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    minHeight: 50,
    borderRadius: 16,
    backgroundColor: colors.white,
    boxShadow: '0px 5px 18px rgba(25, 30, 50, 0.07)',
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 12,
    fontSize: 12,
    color: colors.ink,
  },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 30, gap: 22 },
  pageHeading: { paddingHorizontal: 0, gap: 6, marginBottom: 0 },
  eyebrow: {
    fontSize: 9,
    lineHeight: 12,
    letterSpacing: 1.2,
    color: '#858da6',
    fontWeight: '800',
  },
  pageTitle: {
    color: colors.ink,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  studentCard: { borderRadius: 22, paddingHorizontal: 22, paddingVertical: 20, gap: 18 },
  studentTopRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  studentNameBlock: { flex: 1, minWidth: 0, gap: 5 },
  studentName: { color: colors.white, fontSize: 17, lineHeight: 22, fontWeight: '700' },
  studentCourse: { color: '#c4c9da', fontSize: 10, lineHeight: 15 },
  studentIdBlock: { alignItems: 'flex-end', minWidth: 64, gap: 5 },
  fieldLabel: { color: '#a0a7c0', fontSize: 10, lineHeight: 13 },
  studentId: { color: colors.white, fontSize: 11, fontWeight: '700' },
  studentBottomRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10 },
  unitBlock: { flex: 1, gap: 5 },
  unitValue: { color: colors.white, fontSize: 10, lineHeight: 15, fontWeight: '600' },
  statusBlock: { alignItems: 'flex-end', gap: 5 },
  statusValue: { color: colors.lime, fontSize: 11, fontWeight: '700' },
  optionsCard: {
    backgroundColor: colors.white,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 18,
  },
  group: { gap: 0 },
  groupHeading: {
    color: '#929ab1',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 9,
    marginTop: 1,
  },
  optionRow: { flexDirection: 'row', alignItems: 'center', minHeight: 78, gap: 14, paddingVertical: 12, paddingHorizontal: 1, borderRadius: 9 },
  optionIconTile: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f2f7',
  },
  optionCopy: { flex: 1, minWidth: 0, gap: 5 },
  optionTitle: { color: colors.ink, fontSize: 13, lineHeight: 18, fontWeight: '700' },
  optionDescription: { color: '#959bad', fontSize: 10, lineHeight: 15 },
  rowDivider: { height: 1, backgroundColor: '#e4e6ec', marginLeft: 0, marginRight: 1 },
  groupSpacing: { height: 22 },
  emptyText: { color: colors.muted, fontSize: 12, lineHeight: 18, paddingVertical: 12 },
  pressed: { opacity: 0.65 },
  bottomBar: { backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.line },
  navigation: { flexDirection: 'row', paddingTop: 8, paddingBottom: 9, paddingHorizontal: 8 },
  navItem: { flex: 1, alignItems: 'center', gap: 6, minHeight: 62 },
  navIcon: { width: 48, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 12 },
  activeNavIcon: { backgroundColor: '#cde62f' },
  navLabel: { fontSize: 10, color: colors.muted, fontWeight: '600' },
  activeNavLabel: { color: colors.ink, fontWeight: '800' },
  modalBackdrop: { flex: 1, backgroundColor: '#10142a70', alignItems: 'center', justifyContent: 'center', padding: 24 },
  modalCard: { width: '100%', maxWidth: 360, backgroundColor: colors.white, borderRadius: 22, padding: 24, gap: 18 },
  modalTitle: { color: colors.ink, fontSize: 18, fontWeight: '800' },
  modalDescription: { color: colors.muted, fontSize: 14, lineHeight: 21 },
  modalButton: { minHeight: 46, alignItems: 'center', justifyContent: 'center', borderRadius: 13, backgroundColor: colors.lime, paddingHorizontal: 18 },
  modalButtonLabel: { color: colors.navy, fontSize: 13, fontWeight: '800' },
});
