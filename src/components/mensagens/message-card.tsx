import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Message } from '../../data/messagesMock';

interface MessageCardProps {
  message: Message;
}

export function MessageCard({ message }: MessageCardProps) {
  const isUnread = message.unreadCount > 0;

  return (
    <TouchableOpacity 
      activeOpacity={0.7} 
      style={[styles.card, isUnread && styles.unreadCard]}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{message.initials}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.sender} numberOfLines={1}>
            {message.sender}
          </Text>
          <Text style={styles.date}>{message.date}</Text>
        </View>

        <Text style={styles.subject} numberOfLines={1}>
          {message.subject}
        </Text>

        <Text style={styles.preview} numberOfLines={2}>
          {message.preview}
        </Text>
      </View>

      {isUnread && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{message.unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    alignItems: 'flex-start',
  },
  unreadCard: {
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontWeight: 'bold',
    color: '#374151',
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  sender: {
    fontWeight: 'bold',
    color: '#111827',
    fontSize: 14,
    flex: 1,
    marginRight: 8,
  },
  date: {
    fontSize: 11,
    color: '#6B7280',
  },
  subject: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  preview: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
  badge: {
    backgroundColor: '#84CC16',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
});