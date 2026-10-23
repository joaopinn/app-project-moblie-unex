import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/layout/app-header';
import { BottomNav, navigationItems } from '@/components/layout/bottom-nav';
import { CategoryFilter } from '@/components/services/category-filter';
import { ServiceCard } from '@/components/services/service-card';
import { colors } from '@/constants/nexa-theme';
import { services, type ServiceFilter } from '@/data/services';
import { openServiceLink } from '@/utils/open-service-link';

const normalize = (text: string) => text.trim().toLocaleLowerCase('pt-BR');

export function ServicesScreen() {
  // useState: valores que, ao mudar, fazem a tela redesenhar.
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<ServiceFilter>('Todos');

  // Estado DERIVADO: calculado a cada render a partir de query + filter.
  // Não precisa de useEffect nem de um segundo useState.
  const q = normalize(query);
  const visibleServices = services.filter(service =>
    (filter === 'Todos' || service.category === filter) &&
    normalize(`${service.title} ${service.description}`).includes(q),
  );

  const onNavigate = (index: number) => {
    if (index === 0) router.replace('/');
    else if (index !== 1) Alert.alert(navigationItems[index].label, 'Esta tela ainda será desenvolvida.');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.shell}>
        <AppHeader
          query={query}
          onChangeQuery={setQuery}
          onBellPress={() => Alert.alert('Notificações', 'Você tem 3 comunicados novos.')}
        />

        <ScrollView style={styles.scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.titleBlock}>
            <Text style={styles.eyebrow}>CENTRALIZAÇÃO</Text>
            <Text accessibilityRole="header" style={styles.title}>Central de serviços</Text>
          </View>

          <CategoryFilter selected={filter} onSelect={setFilter} />

          {visibleServices.map(service => (
            <ServiceCard key={service.id} service={service} onPress={openServiceLink} />
          ))}

          {visibleServices.length === 0 ? (
            <Text accessibilityLiveRegion="polite" style={styles.empty}>Nenhum serviço encontrado.</Text>
          ) : null}
        </ScrollView>

        <BottomNav activeIndex={1} onSelect={onNavigate} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: colors.background 
  },
  shell: { 
    flex: 1, width: '100%', 
    maxWidth: 480, 
    alignSelf: 'center', 
    backgroundColor: colors.background 
  },
  scroll: { 
    flex: 1 

  },
  content: { 
    padding: 22, 
    gap: 16, 
    paddingBottom: 28 
  },
  titleBlock: { 
    gap: 6 
  },
  eyebrow: { 
    fontSize: 11, 
    letterSpacing: 1, 
    color: colors.muted, 
    fontWeight: '700' 
  },
  title: { 
    fontSize: 26, 
    fontWeight: '800', 
    letterSpacing: -0.8, 
    color: colors.ink 

  },
  empty: { 
    fontSize: 14, 
    lineHeight: 20, 
    color: colors.muted 

  },
});
