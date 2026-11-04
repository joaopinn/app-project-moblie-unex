import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/nexa-theme';
import { agendaTypeStyles, type AgendaEvent } from '@/data/agenda';
import { MONTH_SHORT, parseDateKey } from '@/utils/calendar';

type Props = {
  event: AgendaEvent;
  isLast?: boolean;
  onPress?: (event: AgendaEvent) => void;
};

export function AgendaEventItem({ event, isLast = false, onPress }: Props) {
  const eventDate = parseDateKey(event.date);
  const day = eventDate.getDate();
  const monthAbbr = MONTH_SHORT[eventDate.getMonth()];
  const typeStyle = agendaTypeStyles[event.type] || agendaTypeStyles.Aula;

  const detailText = event.location
    ? `${event.time} · ${event.location}`
    : event.time;

  return (
    <View style={styles.wrapper}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${event.title}, dia ${day} de ${monthAbbr}, ${detailText}, tipo ${event.type}`}
        onPress={() => onPress?.(event)}
        style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      >
        {/* Caixa de data à esquerda */}
        <View style={styles.dateBox}>
          <Text style={styles.dateDay}>{day}</Text>
          <Text style={styles.dateMonth}>{monthAbbr}</Text>
        </View>

        {/* Informações centrais */}
        <View style={styles.infoBlock}>
          <Text style={styles.title} numberOfLines={1}>
            {event.title}
          </Text>
          <Text style={styles.detail} numberOfLines={1}>
            {detailText}
          </Text>
        </View>

        {/* Badge de tipo à direita */}
        <View style={[styles.badge, { backgroundColor: typeStyle.background }]}>
          <Text style={[styles.badgeText, { color: typeStyle.tint }]}>
            {event.type}
          </Text>
        </View>
      </Pressable>

      {!isLast ? <View style={styles.divider} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  dateBox: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#f5f6fa',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  dateDay: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.ink,
    letterSpacing: -0.5,
  },
  dateMonth: {
    fontSize: 8.5,
    fontWeight: '800',
    color: '#828ba3',
    letterSpacing: 0.8,
  },
  infoBlock: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  title: {
    fontSize: 13.5,
    fontWeight: '700',
    color: colors.ink,
    letterSpacing: -0.2,
  },
  detail: {
    fontSize: 11,
    color: '#828ba3',
    lineHeight: 15,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f1f5',
  },
});
