import Feather from '@expo/vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useState, type ComponentProps, type PropsWithChildren } from 'react';
import {
  Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Valores compartilhados evitam cores diferentes para o mesmo papel visual.
const colors = {
  ink: '#171a2c', muted: '#797d89', background: '#f6f6f8', line: '#ededf1',
  navy: '#151936', lime: '#d5ec63', white: '#ffffff',
};
type IconName = ComponentProps<typeof Feather>['name'];
type Notice = { title: string; description: string };

const shortcuts: { title: string; description: string; icon: IconName; tint: string; background: string }[] = [
  { title: 'Portal do aluno', description: 'Acesso institucional', icon: 'grid', tint: '#7b8940', background: '#f0f4dd' },
  { title: 'Calendário', description: 'Datas importantes', icon: 'calendar', tint: '#747cae', background: '#eef0fc' },
  { title: 'Biblioteca', description: 'Acervo e pesquisa', icon: 'book-open', tint: '#aa8842', background: '#fbf3e1' },
  { title: 'Financeiro', description: 'Serviços oficiais', icon: 'credit-card', tint: '#a8698a', background: '#faedf4' },
  { title: 'Documentos', description: 'Solicitações e acesso', icon: 'file-text', tint: '#5a9380', background: '#eaf6f1' },
  { title: 'Cursos', description: 'Cursos matriculados', icon: 'hexagon', tint: '#7b8940', background: '#f0f4dd' },
];
const semester: { value: string; label: string; detail: string; badge: string; icon: IconName }[] = [
  { value: '6', label: 'Disciplinas', detail: 'Semestre atual', badge: 'Em curso', icon: 'book' },
  { value: '18:50', label: 'Próxima aula', detail: 'Desenvolvimento Mobile', badge: 'Hoje', icon: 'clock' },
  { value: '04', label: 'Atividades', detail: 'Próximos 15 dias', badge: '2 abertas', icon: 'file-text' },
  { value: '08', label: 'Mensagens', detail: 'Coordenação e comunicados', badge: '3 novas', icon: 'mail' },
];
const appointments = [
  { day: '18', title: 'Desenvolvimento Mobile e Híbrido', detail: '18:50 · Sala 39 · Bloco C', tag: 'Aula', tint: '#6d7b35', background: '#f0f4dd' },
  { day: '22', title: 'Gestão de dados', detail: '23:59 · Ambiente virtual', tag: 'Atividade', tint: '#586ab0', background: '#edf0ff' },
  { day: '25', title: 'Integra SI · Semana de Tecnologia', detail: '18:50 · Auditório principal', tag: 'Evento', tint: '#a17d35', background: '#fcf2df' },
];
const announcements: (Notice & { icon: IconName; background: string; tint: string })[] = [
  { title: 'Programa de Monitoria 2026.2', description: 'Consulte editais e resultados disponíveis para os cursos da unidade.', icon: 'star', background: '#f0f4dd', tint: '#7b8940' },
  { title: 'Novidades da comunidade', description: 'Veja notícias, projetos e iniciativas acadêmicas da UNEX.', icon: 'file-text', background: '#eef0fc', tint: '#747cae' },
  { title: 'Agenda acadêmica', description: 'Você tem três compromissos em destaque para os próximos dias.', icon: 'calendar', background: '#fbf3e1', tint: '#aa8842' },
];
const navigation: { label: string; icon: IconName }[] = [
  { label: 'Início', icon: 'home' }, { label: 'Serviços', icon: 'grid' },
  { label: 'Agenda', icon: 'calendar' }, { label: 'Mensagens', icon: 'mail' },
  { label: 'Perfil', icon: 'user' },
];

function Icon({ name, color = colors.muted, size = 20 }: { name: IconName; color?: string; size?: number }) {
  return <Feather name={name} size={size} color={color} />;
}

// Um mesmo cartão externo para todos os blocos brancos.
function Section({ title, subtitle, action, onAction, children }: PropsWithChildren<{
  title: string; subtitle?: string; action?: string; onAction?: () => void;
}>) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeading}>
        <View style={styles.headingCopy}>
          <Text accessibilityRole="header" style={styles.sectionTitle}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {action ? <Pressable accessibilityRole="button" onPress={onAction} style={styles.smallAction}>
          <Text style={styles.actionText}>{action}</Text><Icon name="arrow-right" size={14} />
        </Pressable> : null}
      </View>
      {children}
    </View>
  );
}

function Hero({ onPortal, onExplore }: { onPortal: () => void; onExplore: () => void }) {
  return (
    <LinearGradient colors={['#11142f', '#252d59']} style={styles.hero}>
      {/* Decorações não participam do layout nem interceptam toques. */}
      <View pointerEvents="none" style={styles.heroOrbit} />
      <View pointerEvents="none" style={styles.heroGlow} />
      <View style={styles.eyebrow}><View style={styles.dot} /><Text style={styles.eyebrowText}>NEXA CONECTA · SUA VIDA ACADÊMICA</Text></View>
      <Text accessibilityRole="header" style={styles.heroTitle}>Menos caminhos.{ '\n' }Mais universidade.</Text>
      <Text style={styles.heroDescription}>Um ambiente mobile para acompanhar sua rotina, descobrir oportunidades, consultar informações e chegar mais rápido aos serviços que fazem parte da sua jornada.</Text>
      <Pressable accessibilityRole="button" onPress={onPortal} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
        <Text style={styles.primaryLabel}>Acessar Portal do Aluno</Text><Icon name="arrow-right" color={colors.navy} size={17} />
      </Pressable>
      <Pressable accessibilityRole="button" onPress={onExplore} style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
        <Text style={styles.secondaryLabel}>Explorar serviços</Text>
      </Pressable>
      <View style={styles.progressCard}>
        <Text style={styles.overline}>PROGRESSO DO CURSO</Text>
        <Text style={styles.progressValue}>68%</Text>
        <Text style={styles.progressDetail}>6º semestre · Sistemas de Informação</Text>
        <View accessibilityRole="progressbar" accessibilityLabel="Progresso do curso" accessibilityValue={{ min: 0, max: 100, now: 68 }} style={styles.progressTrack}>
          <View style={styles.progressFill} />
        </View>
      </View>
    </LinearGradient>
  );
}

function StudentCard({ onDetails }: { onDetails: () => void }) {
  return (
    <LinearGradient colors={['#141833', '#262e58']} style={styles.studentCard}>
      <Text style={styles.unexLogo}>une<Text style={styles.logoAccent}>x</Text></Text>
      <Text style={styles.overline}>CARTEIRINHA DIGITAL</Text>
      <Text style={styles.studentName}>Murillo Marinho</Text>
      <Text style={styles.studentCourse}>Sistemas de Informação · Feira de Santana</Text>
      <View style={styles.studentGrid}>
        {[['MATRÍCULA', '20240103'], ['VÍNCULO', 'Graduação'], ['SEMESTRE', '6º'], ['STATUS', 'Ativo']].map(([label, value]) => (
          <View key={label} style={styles.studentField}><Text style={styles.overline}>{label}</Text><Text style={[styles.studentValue, value === 'Ativo' && styles.limeText]}>{value}</Text></View>
        ))}
      </View>
      <View style={styles.studentFooter}>
        <View><Text style={styles.studentCourse}>Validação digital</Text><Text style={styles.validCard}>Carteira válida</Text></View>
        <Pressable accessibilityRole="button" onPress={onDetails} style={styles.outlineButton}><Text style={styles.studentCourse}>Ver detalhes</Text></Pressable>
      </View>
    </LinearGradient>
  );
}

export function HomeScreen() {
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState<Notice | null>(null);
  const scrollRef = useRef<ScrollView>(null);
  const servicesY = useRef(0);
  const agendaY = useRef(0);
  // Lista filtrada é derivada da busca, sem duplicar estado ou usar efeito.
  const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR');
  const visibleShortcuts = shortcuts.filter(item => `${item.title} ${item.description}`.toLocaleLowerCase('pt-BR').includes(normalizedQuery));
  const explain = (title: string) => setNotice({ title, description: 'Este acesso faz parte do protótipo. A integração será adicionada quando esta funcionalidade for desenvolvida.' });
  const goToServices = () => scrollRef.current?.scrollTo({ y: servicesY.current, animated: true });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.shell}>
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <View accessibilityLabel="Nexa, by UNEX"><Text style={styles.logo}>ne<Text style={styles.logoAccent}>x</Text>a</Text><Text style={styles.byline}>by UNEX</Text></View>
            <Pressable accessibilityRole="button" accessibilityLabel="Ver notificações" hitSlop={8} onPress={() => setNotice({ title: 'Notificações', description: 'Você tem 3 comunicados novos. Confira a seção Para você ao final da Home.' })} style={styles.bell}>
              <Icon name="bell" /><View style={styles.notificationDot} />
            </Pressable>
          </View>
          <View style={styles.searchBox}>
            <Icon name="search" size={19} />
            <TextInput accessibilityLabel="Buscar serviços" placeholder="Busque cursos, serviços, notícias ou eventos..." placeholderTextColor="#9b9da6" value={query} onChangeText={setQuery} onSubmitEditing={goToServices} returnKeyType="search" style={styles.searchInput} />
            {query ? <Pressable accessibilityRole="button" accessibilityLabel="Limpar busca" onPress={() => setQuery('')} hitSlop={8}><Icon name="x" size={17} /></Pressable> : null}
          </View>
        </View>

        <ScrollView ref={scrollRef} style={styles.scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <Hero onPortal={() => explain('Portal do aluno')} onExplore={goToServices} />
          <View onLayout={event => { servicesY.current = event.nativeEvent.layout.y; }}>
            <Section title="Acessos rápidos" subtitle="O que você mais usa, sem perder tempo." action="Ver central" onAction={() => explain('Central de serviços')}>
              <View style={styles.grid}>
                {visibleShortcuts.map(item => (
                  <Pressable key={item.title} accessibilityRole="button" onPress={() => explain(item.title)} style={({ pressed }) => [styles.shortcut, pressed && styles.pressed]}>
                    <View style={[styles.iconTile, { backgroundColor: item.background }]}><Icon name={item.icon} color={item.tint} size={21} /></View>
                    <Text style={styles.cardTitle}>{item.title}</Text><Text style={styles.cardDescription}>{item.description}</Text>
                  </Pressable>
                ))}
              </View>
              {visibleShortcuts.length === 0 ? <Text accessibilityLiveRegion="polite" style={styles.empty}>Nenhum serviço encontrado para “{query}”.</Text> : null}
            </Section>
          </View>

          <Section title="Seu semestre" subtitle="Visão resumida da jornada acadêmica.">
            <Text style={styles.demoBadge}>Demonstrativo</Text>
            <View style={styles.grid}>
              {semester.map(item => <View key={item.label} style={styles.metric}>
                <View style={styles.metricTop}><View style={styles.metricIcon}><Icon name={item.icon} size={17} /></View><Text style={styles.greenBadge}>{item.badge}</Text></View>
                <Text style={styles.metricValue}>{item.value}</Text><Text style={styles.metricLabel}>{item.label}</Text><Text style={styles.cardDescription}>{item.detail}</Text>
              </View>)}
            </View>
          </Section>

          <View onLayout={event => { agendaY.current = event.nativeEvent.layout.y; }}>
            <Section title="Próximos compromissos" subtitle="Aulas, eventos e entregas em destaque." action="Abrir agenda" onAction={() => explain('Agenda')}>
              {appointments.map((item, index) => <Pressable accessibilityRole="button" key={item.title} onPress={() => setNotice({ title: item.title, description: `${item.day} de setembro · ${item.detail}. Dados demonstrativos do layout.` })} style={({ pressed }) => [styles.appointment, index > 0 && styles.separator, pressed && styles.pressed]}>
                <View style={styles.dateBox}><Text style={styles.dateDay}>{item.day}</Text><Text style={styles.dateMonth}>SET</Text></View>
                <View style={styles.headingCopy}><Text style={styles.cardTitle}>{item.title}</Text><Text style={styles.cardDescription}>{item.detail}</Text></View>
                <Text style={[styles.eventBadge, { backgroundColor: item.background, color: item.tint }]}>{item.tag}</Text>
              </Pressable>)}
            </Section>
          </View>
          <StudentCard onDetails={() => setNotice({ title: 'Carteirinha demonstrativa', description: 'Murillo Marinho · Matrícula 20240103 · Sistemas de Informação · 6º semestre. Estes são os dados de exemplo do Figma, sem validade institucional.' })} />
          <Section title="Para você" subtitle="Comunicados relevantes.">
            <View style={styles.announcementList}>{announcements.map(item => <Pressable accessibilityRole="button" key={item.title} onPress={() => setNotice(item)} style={({ pressed }) => [styles.announcement, pressed && styles.pressed]}>
              <View style={[styles.iconTile, { backgroundColor: item.background }]}><Icon name={item.icon} color={item.tint} size={19} /></View>
              <View style={styles.headingCopy}><Text style={styles.cardTitle}>{item.title}</Text><Text style={styles.cardDescription}>{item.description}</Text></View>
            </Pressable>)}</View>
          </Section>
        </ScrollView>

        {/* Fora do ScrollView: a barra permanece visível enquanto o conteúdo rola. */}
        <SafeAreaView edges={['bottom']} style={styles.bottomBar}>
          <View style={styles.navigation}>{navigation.map((item, index) => <Pressable key={item.label} accessibilityRole="button" accessibilityLabel={item.label} accessibilityState={{ selected: index === 0 }} onPress={() => {
            if (index === 0) scrollRef.current?.scrollTo({ y: 0, animated: true });
            else if (index === 1) goToServices();
            else if (index === 2) scrollRef.current?.scrollTo({ y: agendaY.current, animated: true });
            else explain(item.label);
          }} style={styles.navItem}>
            <View style={[styles.navIcon, index === 0 && styles.activeNavIcon]}><Icon name={item.icon} size={25} color={index === 0 ? colors.navy : '#9699a3'} /></View>
            <Text style={[styles.navLabel, index === 0 && styles.activeNavLabel]}>{item.label}</Text>
          </Pressable>)}</View>
        </SafeAreaView>
      </View>

      <Modal visible={notice !== null} transparent animationType="fade" onRequestClose={() => setNotice(null)}>
        <View style={styles.modalBackdrop}><View accessibilityViewIsModal style={styles.modalCard}>
          <Text accessibilityRole="header" style={styles.sectionTitle}>{notice?.title}</Text>
          <Text style={styles.modalDescription}>{notice?.description}</Text>
          <Pressable accessibilityRole="button" onPress={() => setNotice(null)} style={styles.primaryButton}><Text style={styles.primaryLabel}>Entendi</Text></Pressable>
        </View></View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.white },
  shell: { flex: 1, width: '100%', maxWidth: 480, alignSelf: 'center', backgroundColor: colors.background },
  header: { backgroundColor: colors.white, paddingHorizontal: 22, paddingTop: 14, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: colors.line },
  brandRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  logo: { color: colors.navy, fontSize: 29, fontWeight: '900', letterSpacing: -2 },
  logoAccent: { color: '#a5bf38' }, byline: { fontSize: 10, color: colors.muted, marginTop: -2 },
  bell: { padding: 9 }, notificationDot: { position: 'absolute', right: 9, top: 7, width: 6, height: 6, borderRadius: 3, backgroundColor: colors.lime, borderWidth: 1, borderColor: colors.white },
  searchBox: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, minHeight: 46, borderRadius: 16, backgroundColor: colors.white, boxShadow: '0px 5px 18px rgba(25, 30, 50, 0.07)' },
  searchInput: { flex: 1, minWidth: 0, paddingVertical: 12, fontSize: 11, color: colors.ink },
  scroll: { flex: 1 }, content: { padding: 22, gap: 20, paddingBottom: 28 },
  hero: { padding: 22, borderRadius: 28, overflow: 'hidden', gap: 16 },
  heroOrbit: { position: 'absolute', width: 350, height: 350, borderRadius: 175, borderWidth: 1, borderColor: '#ffffff0b', top: -115, right: -115, transform: [{ rotate: '-20deg' }] },
  heroGlow: { position: 'absolute', width: 280, height: 100, backgroundColor: '#d5ec6308', bottom: 22, left: -40, transform: [{ rotate: '28deg' }] },
  eyebrow: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', paddingVertical: 7, paddingHorizontal: 9, borderWidth: 1, borderColor: '#ffffff20', backgroundColor: '#ffffff09', borderRadius: 20 },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.lime },
  eyebrowText: { fontSize: 8, letterSpacing: 0.5, color: colors.white, fontWeight: '600', flexShrink: 1 },
  heroTitle: { color: colors.white, fontSize: 29, lineHeight: 31, fontWeight: '700', letterSpacing: -1.2 },
  heroDescription: { fontSize: 11, lineHeight: 19, color: '#c2c5d6' },
  primaryButton: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: colors.lime, borderRadius: 13, paddingHorizontal: 16, minHeight: 44 },
  primaryLabel: { color: colors.navy, fontWeight: '700', fontSize: 11 },
  secondaryButton: { alignSelf: 'flex-start', paddingHorizontal: 16, minHeight: 40, justifyContent: 'center', borderRadius: 12, backgroundColor: '#ffffff12', borderWidth: 1, borderColor: '#ffffff12', marginTop: -6 },
  secondaryLabel: { color: colors.white, fontSize: 10, fontWeight: '600' }, pressed: { opacity: 0.65 },
  progressCard: { borderRadius: 20, padding: 16, gap: 9, backgroundColor: '#ffffff0d', borderWidth: 1, borderColor: '#ffffff0c', marginTop: 6 },
  overline: { fontSize: 8, color: '#b2b6cc', letterSpacing: 0.6 }, progressValue: { fontSize: 25, fontWeight: '700', color: colors.white },
  progressDetail: { color: '#c5c9db', fontSize: 9 }, progressTrack: { height: 6, borderRadius: 3, overflow: 'hidden', backgroundColor: '#ffffff14', marginTop: 3 },
  progressFill: { height: '100%', width: '68%', borderRadius: 3, backgroundColor: colors.lime },
  section: { backgroundColor: colors.white, borderRadius: 22, padding: 20, gap: 18, borderWidth: 1, borderColor: '#f0f0f3', boxShadow: '0px 6px 22px rgba(25, 30, 50, 0.035)' },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', gap: 8, justifyContent: 'space-between' }, headingCopy: { flex: 1, minWidth: 0, gap: 5 },
  sectionTitle: { fontSize: 15, fontWeight: '700', letterSpacing: -0.4, color: colors.ink }, subtitle: { fontSize: 10, lineHeight: 15, color: colors.muted },
  smallAction: { flexDirection: 'row', gap: 5, alignItems: 'center', minHeight: 44 }, actionText: { fontSize: 9, color: '#626879', fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  shortcut: { width: '48%', flexGrow: 1, flexBasis: '45%', padding: 13, borderWidth: 1, borderColor: colors.line, borderRadius: 17, gap: 6, minHeight: 112 },
  iconTile: { width: 35, height: 35, borderRadius: 11, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  cardTitle: { color: colors.ink, fontSize: 10, fontWeight: '700', lineHeight: 15 }, cardDescription: { fontSize: 9, lineHeight: 14, color: colors.muted },
  empty: { fontSize: 13, lineHeight: 20, color: colors.muted },
  demoBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, backgroundColor: '#f4f4f7', color: '#676d7b', fontSize: 8, marginTop: -9 },
  metric: { width: '48%', flexGrow: 1, flexBasis: '45%', padding: 13, borderWidth: 1, borderColor: colors.line, borderRadius: 17, gap: 6 },
  metricTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 4 }, metricIcon: { padding: 5, backgroundColor: '#f4f5f9', borderRadius: 8 },
  greenBadge: { fontSize: 7, color: '#497d6c', backgroundColor: '#eaf6f1', paddingVertical: 4, paddingHorizontal: 6, borderRadius: 9 },
  metricValue: { fontSize: 22, color: colors.ink, fontWeight: '700', marginTop: 5 }, metricLabel: { fontSize: 10, color: colors.muted },
  appointment: { flexDirection: 'row', alignItems: 'center', gap: 11, paddingVertical: 12 }, separator: { borderTopWidth: 1, borderTopColor: colors.line },
  dateBox: { backgroundColor: '#f5f5f8', borderRadius: 10, padding: 9, alignItems: 'center', minWidth: 43 }, dateDay: { fontWeight: '700', fontSize: 17, color: colors.ink }, dateMonth: { fontSize: 7, letterSpacing: 1, color: colors.muted, marginTop: 3 },
  eventBadge: { fontSize: 7, fontWeight: '600', paddingVertical: 5, paddingHorizontal: 7, borderRadius: 8 },
  studentCard: { padding: 20, borderRadius: 23, gap: 6 }, unexLogo: { fontSize: 22, fontWeight: '900', letterSpacing: -1.5, color: colors.white, marginBottom: 12 },
  studentName: { color: colors.white, fontSize: 16, fontWeight: '700' }, studentCourse: { color: '#c2c6d8', fontSize: 9, lineHeight: 14 },
  studentGrid: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 10, marginTop: 12 }, studentField: { width: '50%', gap: 4 }, studentValue: { color: colors.white, fontSize: 10, fontWeight: '600' }, limeText: { color: colors.lime },
  studentFooter: { borderTopWidth: 1, borderTopColor: '#ffffff18', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, marginTop: 9 }, validCard: { color: colors.lime, fontSize: 9 },
  outlineButton: { borderWidth: 1, borderColor: '#ffffff40', borderRadius: 7, paddingHorizontal: 10, minHeight: 40, justifyContent: 'center' },
  announcementList: { gap: 10 }, announcement: { padding: 14, borderWidth: 1, borderColor: colors.line, borderRadius: 17, flexDirection: 'row', alignItems: 'center', gap: 12 },
  bottomBar: { backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.line }, navigation: { flexDirection: 'row', paddingTop: 8, paddingBottom: 9, paddingHorizontal: 8 },
  navItem: { flex: 1, alignItems: 'center', gap: 6, minHeight: 58 }, navIcon: { width: 44, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 11 }, activeNavIcon: { backgroundColor: colors.lime },
  navLabel: { fontSize: 9, color: colors.muted, fontWeight: '600' }, activeNavLabel: { color: colors.ink, fontWeight: '700' },
  modalBackdrop: { flex: 1, backgroundColor: '#10142a66', alignItems: 'center', justifyContent: 'center', padding: 24 }, modalCard: { width: '100%', maxWidth: 360, backgroundColor: colors.white, borderRadius: 23, padding: 24, gap: 20 }, modalDescription: { color: colors.muted, fontSize: 14, lineHeight: 22 },
});
