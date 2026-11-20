import { useRef, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import type { Message } from '@/data/messagesMock';

type Props = { message: Message; replies: string[]; onSend: (text: string) => void; onClose: () => void };

export function Conversation({ message, replies, onSend, onClose }: Props) {
  const [draft, setDraft] = useState('');
  const scroll = useRef<ScrollView>(null);
  function send() {
    if (!draft.trim()) return;
    onSend(draft.trim());
    setDraft('');
  }
  return (
    <Modal transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.overlay}>
        <View style={styles.panel}>
          <View style={styles.header}>
            <Text style={styles.avatar}>{message.initials}</Text>
            <View style={{flex: 1}}><Text style={{fontWeight: '700'}}>{message.sender}</Text><Text>{message.subject}</Text></View>
            <Pressable accessibilityRole="button" accessibilityLabel="Fechar conversa" onPress={onClose} hitSlop={10}><Feather name="x" size={22} /></Pressable>
          </View>
          <ScrollView ref={scroll} onContentSizeChange={() => scroll.current?.scrollToEnd()} contentContainerStyle={styles.history}>
            <Text style={styles.date}>{message.date}</Text>
            <Text style={styles.bubble}>{message.preview}</Text>
            {replies.map((reply, index) => <Text key={index} style={[styles.bubble, styles.reply]}>{reply}</Text>)}
          </ScrollView>
          <View style={styles.composer}>
            <TextInput style={{flex: 1}} accessibilityLabel="Mensagem" placeholder="Digite uma mensagem" value={draft} onChangeText={setDraft} onSubmitEditing={send} />
            <Pressable accessibilityLabel="Enviar mensagem" accessibilityRole="button" disabled={!draft.trim()} onPress={send} style={styles.send}><Feather name="send" color="white" size={19} /></Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: '#0007', justifyContent: 'center', alignItems: 'center', padding: 22 },
  panel: { width: '100%', maxWidth: 450, height: '78%', backgroundColor: '#f7f5f0', overflow: 'hidden', borderRadius: 20 },
  header: { padding: 15, gap: 10, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' },
  avatar: { color: '#344872', backgroundColor: '#eef0ff', padding: 10, borderRadius: 12, fontWeight: '700' },
  history: { padding: 16, gap: 10 },
  date: { alignSelf: 'center', color: '#606671' },
  bubble: { alignSelf: 'flex-start', maxWidth: '82%', backgroundColor: 'white', padding: 12, borderRadius: 12 },
  reply: { alignSelf: 'flex-end', backgroundColor: '#e8efc5' },
  composer: { flexDirection: 'row', alignItems: 'center', padding: 8, paddingLeft: 16, margin: 12, backgroundColor: 'white', borderRadius: 24 },
  send: { backgroundColor: '#788b31', borderRadius: 22, padding: 9 },
});
