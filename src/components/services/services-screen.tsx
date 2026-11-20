import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router'; // 1. Importe o roteador

import { AppHeader } from '@/components/layout/app-header';
import { CategoryFilter } from '@/components/services/category-filter';
import { ServiceCard } from '@/components/services/service-card';
import { colors } from '@/constants/nexa-theme';
import { services, type Service, type ServiceFilter } from '@/data/services';
import { openServiceLink } from '@/utils/open-service-link';

const normalize = (text: string) => text.trim().toLocaleLowerCase('pt-BR');

export function ServicesScreen() {
  const router = useRouter(); // 2. Inicialize o hook de navegação
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<ServiceFilter>('Todos');

  const q = normalize(query);
  const visibleServices = services.filter(service =>
    (filter === 'Todos' || service.category === filter) &&
    normalize(`${service.title} ${service.description}`).includes(q),
  );

  // 3. Crie a função que lida com o clique do serviço
  const handleServicePress = (service: Service) => {
    if (service.id === 'cursos') {
      router.push('/courses'); // Direciona para a rota da tela de cursos
      return;
    }

    // Comportamento padrão para os demais serviços
    openServiceLink(service);
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
            <ServiceCard 
              key={service.id} 
              service={service} 
              onPress={handleServicePress} // 4. Substitua pelo manipulador customizado
            />
          ))}

          {visibleServices.length === 0 ? (
            <Text accessibilityLiveRegion="polite" style={styles.empty}>Nenhum serviço encontrado.</Text>
          ) : null}
        </ScrollView>
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