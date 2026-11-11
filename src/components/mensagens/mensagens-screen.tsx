import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../layout/app-header';
import { MessageCard } from './message-card';
import { SearchBar } from './search-bar';
import { Message, MOCK_MESSAGES } from '../../data/messagesMock';

export function MensagensScreen() {
  const [searchText, setSearchText] = useState('');

  const filteredMessages = useMemo(() => {
    if (!searchText.trim()) return MOCK_MESSAGES;

    const lowerCaseSearch = searchText.toLowerCase();
    return MOCK_MESSAGES.filter(
      (message) =>
        message.sender.toLowerCase().includes(lowerCaseSearch) ||
        message.subject.toLowerCase().includes(lowerCaseSearch)
    );
  }, [searchText]);

  const renderItem = ({ item }: { item: Message }) => (
    <MessageCard message={item} />
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        Nenhuma mensagem encontrada para "{searchText}".
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <AppHeader 
        query="" 
        onChangeQuery={() => {}} 
        onBellPress={() => {}} 
      />

      <View style={styles.content}>
        <Text style={styles.categoryTag}>Comunicação</Text>
        <Text style={styles.title}>Mensagens</Text>

        <SearchBar 
          value={searchText} 
          onChangeText={setSearchText} 
        />

        <FlatList
          data={filteredMessages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={renderEmptyComponent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  categoryTag: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 18,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#6B7280',
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 24,
  },
});