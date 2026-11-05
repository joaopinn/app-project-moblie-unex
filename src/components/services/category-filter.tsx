import React from 'react';
import { Pressable, ScrollView, Text, View, StyleSheet } from 'react-native';
import { serviceFilters, type ServiceFilter } from '@/data/services';
import { Icon } from '@/components/ui/nexa-icon';

type Props = {
  selected: ServiceFilter;
  onSelect: (filter: ServiceFilter) => void;
};


export function CategoryFilter({ selected, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      >
      {serviceFilters.map((filter) => {
        const active = filter.label === selected;

        return (
          <Pressable
          key={filter.label}
          accessibilityRole="button"
          accessibilityState={{ selected: active}}
          accessibilityLabel={`Filtro ${filter.label}`}
          onPress={() => onSelect(filter.label)}
          style={({ pressed }) => [
            styles.chip,
            active && styles.chipActive,
            pressed && styles.pressed
          ]}
          >
            <Icon 
            name={filter.icon}
            size={16}
            color={active ? '#1B4332' : '#6B7280'}
            />
            <Text style={[styles.chipText, active && styles.chipTextActive]}>
              {filter.label}
            </Text>
          </Pressable>
        );
      })}

      </ScrollView>
    </View>
  );
}

  const styles = StyleSheet.create({ 
    container: { 
      backgroundColor: '#FFFFFF', 
      borderRadius: 20, paddingVertical: 8, 
      borderWidth: 1, 
      borderColor: '#E5E7EB', 
    }, 
    scrollContent: { 
      paddingHorizontal: 12, 
      gap: 8,
    }, 
    chip: { 
      flexDirection: 'row', 
      alignItems: 'center', 
      gap: 6, 
      paddingVertical: 8, 
      paddingHorizontal: 14, 
      borderRadius: 14, 
      backgroundColor: '#F3F4F6', 
    }, 
      chipActive: { 
        backgroundColor: '#f0f4dd', // Verde-claro do protótipo no Figma 
    }, 
    chipText: { 
      fontSize: 13, 
      color: '#4B5563', 
    }, 
    chipTextActive: { 
      fontWeight: 'bold', 
      color: '#1B4332', 
    }, 
      pressed: { 
        opacity: 0.8, 
      },
})