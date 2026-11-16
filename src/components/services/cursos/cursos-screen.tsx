import React, { useState } from 'react';
import { 
  FlatList, 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { AppHeader } from '@/components/layout/app-header';
import { coursesData, Course } from '@/data/courses';
import { colors } from '@/constants/nexa-theme'; // Importe as cores do tema padrão

export default function CoursesRoute() { // Export default obrigatório para a rota
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('Todos semestres');

  const filteredCourses = coursesData.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: { item: Course }) => (
    <View style={styles.courseCard}>
      <View style={[styles.cardAccentBar, { backgroundColor: item.accentColor || '#536DFE' }]} />
      
      <View style={styles.cardContent}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.courseCode}>{item.code}</Text>
        </View>

        <Text style={styles.courseTitle}>{item.title}</Text>

        <View style={styles.cardFooter}>
          <Text style={styles.instructorText} numberOfLines={1}>
            Instrutor(a): <Text style={styles.instructorName}>{item.instructor}</Text>
          </Text>

          <TouchableOpacity style={styles.accessButton}>
            <Text style={styles.accessButtonText}>Acessar</Text>
            <Feather name="external-link" size={14} color="#3B4E68" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.shell}>
        <AppHeader 
          query="" 
          onChangeQuery={() => {}} 
          onBellPress={() => {}} 
        />

        <View style={styles.content}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.push('/(tabs)/servicos')} // Força ir direto para a rota da aba de serviços
        >
        <Feather name="arrow-left" size={16} color="#007AFF" style={{ marginRight: 4 }} />
        <Text style={styles.backButtonText}>VOLTAR</Text>
        </TouchableOpacity>

          {/* Cabeçalho da Seção e Seletor de Semestres */}
          <View style={styles.headerRow}>
            <Text style={styles.screenTitle}>Cursos</Text>
            <TouchableOpacity style={styles.semesterSelector}>
              <Feather name="grid" size={14} color="#64748B" style={{ marginRight: 6 }} />
              <Text style={styles.semesterText}>{selectedSemester}</Text>
              <Feather name="chevron-down" size={14} color="#64748B" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>

          {/* Barra de Pesquisa de Cursos */}
          <View style={styles.searchContainer}>
            <Feather name="search" size={18} color="#64748B" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar cursos"
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Lista de Cursos */}
          <FlatList
            data={filteredCourses}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
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
    flex: 1, 
    width: '100%', 
    maxWidth: 480, 
    alignSelf: 'center', 
    backgroundColor: colors.background 
  },
  content: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 8,
  },
backButton: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 12,
  gap: 6, 
},
backIcon: {

},
backButtonText: {
  color: '#007AFF',
  fontSize: 12,
  fontWeight: '700',
  letterSpacing: 0.5,
},
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.ink,
  },
  semesterSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  semesterText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.ink,
  },
  listContainer: {
    paddingBottom: 28,
  },
  courseCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardAccentBar: {
    width: 6,
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  cardHeaderRow: {
    marginBottom: 4,
  },
  courseCode: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  courseTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.ink,
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'column',
    gap: 8,
    marginTop: 4,
  },
  instructorText: {
    fontSize: 12,
    color: '#64748B',
  },
  instructorName: {
    color: '#334155',
    fontWeight: '600',
  },
  accessButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  accessButtonText: {
    fontSize: 13,
    color: '#334155',
    fontWeight: 'bold',
  },
});