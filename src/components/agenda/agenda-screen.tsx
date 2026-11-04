import Feather from '@expo/vector-icons/Feather';
import { useScrollToTop } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AcademicCalendar } from '@/components/agenda/academic-calendar';
import { AgendaEventItem } from '@/components/agenda/agenda-event-item';
import { AppHeader } from '@/components/layout/app-header';
import { colors } from '@/constants/nexa-theme';
import {
  agendaFilters,
  getUpcomingEvents,
  type AgendaEvent,
  type AgendaFilter,
} from '@/data/agenda';
import { formatLongDate, parseDateKey, type MonthRef } from '@/utils/calendar';

export function AgendaScreen() {
  const scrollRef = useRef<ScrollView>(null);
  useScrollToTop(scrollRef);

  // Mês inicial correspondente ao protótipo do Figma: Outubro de 2026
  const [currentMonth, setCurrentMonth] = useState<MonthRef>({ year: 2026, month: 9 });
  // Data selecionada no calendário (dia 5 de Outubro de 2026 selecionado na imagem)
  const [selectedDateKey, setSelectedDateKey] = useState<string>('2026-10-05');
  // Filtro de categoria de evento
  const [activeFilter, setActiveFilter] = useState<AgendaFilter>('Todos');
  // Termo de pesquisa vindo do AppHeader
  const [query, setQuery] = useState('');
  // Controle do menu dropdown de filtros
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  // Modal de aviso ou detalhes do evento
  const [activeNotice, setActiveNotice] = useState<{
    title: string;
    description: string;
    badge?: string;
  } | null>(null);

  // Lista dinâmica de próximos eventos a partir do dia selecionado
  const upcomingEvents = useMemo(() => {
    return getUpcomingEvents(selectedDateKey, activeFilter, query, 6);
  }, [selectedDateKey, activeFilter, query]);

  const handleSelectDate = (dateKey: string) => {
    setSelectedDateKey(dateKey);
    const date = parseDateKey(dateKey);
    setCurrentMonth({ year: date.getFullYear(), month: date.getMonth() });
  };

  const handleEventPress = (event: AgendaEvent) => {
    const formattedDate = formatLongDate(parseDateKey(event.date));
    const fullDescription = [
      `Data: ${formattedDate}`,
      `Horário: ${event.time}`,
      event.location ? `Local: ${event.location}` : null,
      event.description ? `\n${event.description}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    setActiveNotice({
      title: event.title,
      description: fullDescription,
      badge: event.type,
    });
  };

  const selectedDateText = useMemo(() => {
    try {
      return formatLongDate(parseDateKey(selectedDateKey));
    } catch {
      return selectedDateKey;
    }
  }, [selectedDateKey]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.shell}>
        <AppHeader
          query={query}
          onChangeQuery={setQuery}
          onBellPress={() =>
            setActiveNotice({
              title: 'Notificações',
              description:
                'Você possui 3 comunicados acadêmicos recentes. Consulte avisos institucionais e lembretes de aula.',
            })
          }
        />

        <ScrollView
          ref={scrollRef}
          style={styles.scroll}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Cabeçalho da página */}
          <View style={styles.titleSection}>
            <Text style={styles.eyebrow}>ORGANIZAÇÃO</Text>
            <Text accessibilityRole="header" style={styles.mainTitle}>
              Agenda acadêmica
            </Text>
          </View>

          {/* Calendário interativo */}
          <AcademicCalendar
            currentMonth={currentMonth}
            selectedDateKey={selectedDateKey}
            onChangeMonth={setCurrentMonth}
            onSelectDate={handleSelectDate}
          />

          {/* Card de Próximos Eventos */}
          <View style={styles.eventsCard}>
            <View style={styles.eventsCardHeader}>
              <View style={styles.eventsTitleContainer}>
                <Text accessibilityRole="header" style={styles.eventsTitle}>
                  Próximos eventos
                </Text>
                <Text style={styles.eventsSubtitle}>
                  {upcomingEvents.length}{' '}
                  {upcomingEvents.length === 1 ? 'item em destaque' : 'itens em destaque'}
                </Text>
              </View>

              {/* Botão de Filtro / Dropdown */}
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Filtro atual: ${activeFilter}. Toque para alterar.`}
                onPress={() => setFilterMenuVisible(true)}
                style={({ pressed }) => [styles.filterButton, pressed && styles.pressed]}
              >
                <Feather name="grid" size={14} color="#687189" />
                <Text style={styles.filterButtonText}>{activeFilter}</Text>
                <Feather name="chevron-down" size={14} color="#687189" />
              </Pressable>
            </View>

            {/* Lista de eventos */}
            <View style={styles.eventsList}>
              {upcomingEvents.map((event, index) => (
                <AgendaEventItem
                  key={event.id}
                  event={event}
                  isLast={index === upcomingEvents.length - 1}
                  onPress={handleEventPress}
                />
              ))}

              {upcomingEvents.length === 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText} accessibilityLiveRegion="polite">
                    {query
                      ? `Nenhum evento encontrado para "${query}".`
                      : `Nenhum compromisso agendado para os próximos dias a partir de ${selectedDateText}.`}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Modal de seleção de filtro */}
      <Modal
        visible={filterMenuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setFilterMenuVisible(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setFilterMenuVisible(false)}
        >
          <View style={styles.dropdownModalCard} onStartShouldSetResponder={() => true}>
            <Text style={styles.dropdownTitle}>Filtrar eventos por</Text>

            <View style={styles.dropdownOptionsList}>
              {agendaFilters.map((item) => {
                const isActive = item.label === activeFilter;
                return (
                  <Pressable
                    key={item.label}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isActive }}
                    onPress={() => {
                      setActiveFilter(item.label);
                      setFilterMenuVisible(false);
                    }}
                    style={({ pressed }) => [
                      styles.dropdownOption,
                      isActive && styles.dropdownOptionActive,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Feather
                      name={item.icon}
                      size={16}
                      color={isActive ? colors.navy : '#687189'}
                    />
                    <Text
                      style={[
                        styles.dropdownOptionText,
                        isActive && styles.dropdownOptionTextActive,
                      ]}
                    >
                      {item.label}
                    </Text>
                    {isActive ? (
                      <Feather name="check" size={16} color={colors.navy} />
                    ) : null}
                  </Pressable>
                );
              })}
            </View>
          </View>
        </Pressable>
      </Modal>

      {/* Modal de Detalhes ou Notificações */}
      <Modal
        visible={activeNotice !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setActiveNotice(null)}
      >
        <View style={styles.modalBackdrop}>
          <View accessibilityViewIsModal style={styles.detailModalCard}>
            <View style={styles.detailModalTop}>
              <Text accessibilityRole="header" style={styles.modalTitle}>
                {activeNotice?.title}
              </Text>
              {activeNotice?.badge ? (
                <View style={styles.modalBadge}>
                  <Text style={styles.modalBadgeText}>{activeNotice.badge}</Text>
                </View>
              ) : null}
            </View>

            <Text style={styles.modalDescription}>{activeNotice?.description}</Text>

            <Pressable
              accessibilityRole="button"
              onPress={() => setActiveNotice(null)}
              style={({ pressed }) => [styles.modalButton, pressed && styles.pressed]}
            >
              <Text style={styles.modalButtonLabel}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  shell: {
    flex: 1,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 28,
    gap: 18,
  },
  titleSection: {
    gap: 6,
    paddingHorizontal: 2,
  },
  eyebrow: {
    fontSize: 10,
    letterSpacing: 1.2,
    color: '#828ba3',
    fontWeight: '800',
  },
  mainTitle: {
    fontSize: 27,
    fontWeight: '800',
    letterSpacing: -0.8,
    color: colors.ink,
  },
  eventsCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 16,
    borderWidth: 1,
    borderColor: '#eef0f4',
    shadowColor: '#191e32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 14,
    elevation: 2,
    gap: 14,
  },
  eventsCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eventsTitleContainer: {
    gap: 3,
  },
  eventsTitle: {
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.4,
    color: colors.ink,
  },
  eventsSubtitle: {
    fontSize: 11,
    color: '#828ba3',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: '#f1f3f7',
  },
  filterButtonText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#555d73',
  },
  eventsList: {
    gap: 2,
  },
  emptyState: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.muted,
    textAlign: 'center',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: '#10142a70',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  dropdownModalCard: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 18,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  dropdownTitle: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
    color: '#828ba3',
    textTransform: 'uppercase',
  },
  dropdownOptionsList: {
    gap: 4,
  },
  dropdownOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  dropdownOptionActive: {
    backgroundColor: '#f0f4dd',
  },
  dropdownOptionText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
    fontWeight: '600',
    color: '#4f566b',
  },
  dropdownOptionTextActive: {
    fontWeight: '800',
    color: colors.navy,
  },
  detailModalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: colors.white,
    borderRadius: 22,
    padding: 22,
    gap: 14,
  },
  detailModalTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  modalTitle: {
    flex: 1,
    color: colors.ink,
    fontSize: 16,
    fontWeight: '800',
  },
  modalBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#f0f4dd',
  },
  modalBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#6d7b35',
  },
  modalDescription: {
    color: '#5d6479',
    fontSize: 12.5,
    lineHeight: 19,
  },
  modalButton: {
    minHeight: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: colors.lime,
    paddingHorizontal: 16,
    marginTop: 6,
  },
  modalButtonLabel: {
    color: colors.navy,
    fontSize: 12,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.65,
  },
});
