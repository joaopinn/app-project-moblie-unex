import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/layout/app-header';
import { coursesData } from '@/data/courses';

export default function Disciplina() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const course = coursesData.find(item => item.id === id);
  const [query, setQuery] = useState('');
  const mobile = course?.id === '1';
  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <AppHeader query={query} onChangeQuery={setQuery}
        onSubmit={() => router.navigate({ pathname: '/courses', params: { busca: query } })}
        onBellPress={() => router.push('/perfil/notificacoes')} />
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable accessibilityRole="button" onPress={() => router.navigate('/courses')}><Text style={styles.back}>‹ VOLTAR</Text></Pressable>
        {course ? <>
          <View style={[styles.card, styles.hero]}>
            <Text style={styles.title}>{course.title}</Text>
            <Text style={styles.meta}>Professor(a) · {course.instructor}</Text>
            <Text style={styles.meta}>Turma · {course.code.split(' - ')[0]}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.heading}>Horários</Text>
            {mobile ? ['18:50 às 19:40', '19:40 às 20:30', '20:40 às 21:30'].map(time =>
              <Text key={time} style={styles.row}>Quarta-feira · {time} · Sala 39</Text>
            ) : <Text>Horários ainda não disponíveis.</Text>}
          </View>
          <View style={styles.card}>
            <Text style={styles.heading}>Material de apoio</Text>
            {mobile ? ['React Native e Desenvolvimento Híbrido Mobile.pptx', 'Criação e Build com React Native'].map(name =>
              <View key={name} style={styles.row}><Text>{name}</Text><Text style={styles.muted}>Arquivo indisponível</Text></View>
            ) : <Text>Nenhum material disponível.</Text>}
          </View>
        </> : <Text>Disciplina não encontrada.</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: 'white', width: '100%', maxWidth: 480, alignSelf: 'center' },
  content: { padding: 22, gap: 16 },
  back: { color: '#436581', fontWeight: '700', paddingVertical: 10 },
  card: { padding: 20, gap: 12, borderRadius: 20, borderWidth: 1, borderColor: '#e6e8ed' },
  hero: { backgroundColor: '#1b2346', paddingVertical: 26 },
  title: { fontSize: 21, fontWeight: '700', color: 'white' },
  meta: { color: '#eef0ff' },
  heading: { fontSize: 18, fontWeight: '700', color: '#191d31' },
  row: { borderTopWidth: 1, borderColor: '#efefef', paddingTop: 12 },
  muted: { fontSize: 12, color: '#68707e', marginTop: 4 },
});
