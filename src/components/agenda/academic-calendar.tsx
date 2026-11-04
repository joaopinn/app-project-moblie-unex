import Feather from '@expo/vector-icons/Feather';
import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/nexa-theme';
import { hasEventsOnDate, hasSpecialEventOnDate } from '@/data/agenda';
import {
  addMonths,
  buildMonthGrid,
  MONTH_NAMES,
  WEEKDAY_SHORT,
  type MonthRef,
} from '@/utils/calendar';

type Props = {
  currentMonth: MonthRef;
  selectedDateKey: string;
  onChangeMonth: (month: MonthRef) => void;
  onSelectDate: (dateKey: string) => void;
};

export function AcademicCalendar({
  currentMonth,
  selectedDateKey,
  onChangeMonth,
  onSelectDate,
}: Props) {
  const days = useMemo(() => buildMonthGrid(currentMonth), [currentMonth]);

  const handlePrevMonth = () => {
    onChangeMonth(addMonths(currentMonth, -1));
  };

  const handleNextMonth = () => {
    onChangeMonth(addMonths(currentMonth, 1));
  };

  const monthLabel = MONTH_NAMES[currentMonth.month];
  const yearLabel = currentMonth.year;

  return (
    <View style={styles.card}>
      {/* Navegação entre meses */}
      <View style={styles.monthHeader}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Ir para o mês anterior`}
          hitSlop={8}
          onPress={handlePrevMonth}
          style={({ pressed }) => [styles.arrowButton, pressed && styles.pressed]}
        >
          <Feather name="chevron-left" size={18} color="#6d7b35" />
        </Pressable>

        <View style={styles.monthTitleBlock}>
          <Text accessibilityRole="header" style={styles.monthName}>
            {monthLabel}
          </Text>
          <Text style={styles.yearNumber}>{yearLabel}</Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Ir para o próximo mês`}
          hitSlop={8}
          onPress={handleNextMonth}
          style={({ pressed }) => [styles.arrowButton, pressed && styles.pressed]}
        >
          <Feather name="chevron-right" size={18} color="#6d7b35" />
        </Pressable>
      </View>

      {/* Cabeçalho dos dias da semana */}
      <View style={styles.weekdayRow}>
        {WEEKDAY_SHORT.map((weekday) => (
          <Text key={weekday} style={styles.weekdayLabel}>
            {weekday}
          </Text>
        ))}
      </View>

      {/* Grade de 42 dias */}
      <View style={styles.grid}>
        {days.map((day) => {
          const isSelected = day.key === selectedDateKey;
          const hasEvent = hasEventsOnDate(day.date);
          const isSpecial = hasSpecialEventOnDate(day.date);
          const dayNumber = day.date.getDate();

          return (
            <Pressable
              key={day.key}
              accessibilityRole="button"
              accessibilityLabel={`${dayNumber} de ${MONTH_NAMES[day.date.getMonth()]}${isSelected ? ', selecionado' : ''}${hasEvent ? ', possui compromisso' : ''}`}
              accessibilityState={{ selected: isSelected }}
              onPress={() => onSelectDate(day.key)}
              style={({ pressed }) => [
                styles.dayCell,
                !day.inMonth && styles.dayOutOfMonth,
                isSelected && styles.daySelected,
                pressed && styles.pressed,
              ]}
            >
              <View style={styles.dayTopRow}>
                <Text
                  style={[
                    styles.dayNumber,
                    !day.inMonth && styles.dayNumberOutOfMonth,
                    isSelected && styles.dayNumberSelected,
                  ]}
                >
                  {dayNumber}
                </Text>

                {isSpecial && day.inMonth ? (
                  <View style={styles.specialBadge}>
                    <Feather name="star" size={8} color="#586ab0" />
                  </View>
                ) : null}
              </View>

              {/* Indicador de evento no rodapé da célula */}
              <View style={styles.indicatorContainer}>
                {hasEvent ? <View style={styles.eventDot} /> : null}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 16,
    borderWidth: 1,
    borderColor: '#eef0f4',
    shadowColor: '#191e32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 14,
    elevation: 2,
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  arrowButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#f0f4dd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthTitleBlock: {
    alignItems: 'center',
    gap: 2,
  },
  monthName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.ink,
    letterSpacing: -0.3,
  },
  yearNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: '#828ba3',
  },
  weekdayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  weekdayLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 9,
    fontWeight: '700',
    color: '#828ba3',
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    justifyContent: 'space-between',
  },
  dayCell: {
    width: '12.8%',
    height: 48,
    borderRadius: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#eef0f4',
    padding: 4,
    justifyContent: 'space-between',
  },
  dayOutOfMonth: {
    borderColor: '#f4f5f8',
    backgroundColor: '#fafafc',
  },
  daySelected: {
    backgroundColor: '#eaedfa',
    borderColor: '#d5dcfa',
  },
  dayTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dayNumber: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.ink,
  },
  dayNumberOutOfMonth: {
    color: '#b6bac8',
    fontWeight: '500',
  },
  dayNumberSelected: {
    color: colors.ink,
    fontWeight: '800',
  },
  specialBadge: {
    padding: 1,
  },
  indicatorContainer: {
    height: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventDot: {
    width: 4.5,
    height: 4.5,
    borderRadius: 2.5,
    backgroundColor: '#7b8940',
  },
  pressed: {
    opacity: 0.65,
  },
});
