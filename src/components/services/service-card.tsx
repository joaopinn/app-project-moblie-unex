import type { Service } from "@/data/services";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from '../ui/nexa-icon';

type ServiceCardProps = {
  service: Service;
  onPress: (service: Service) => void;
};



export function ServiceCard({ service, onPress }: ServiceCardProps) {
  return (
    <Pressable
      onPress={() => onPress(service)}
      accessibilityRole="button"
      accessibilityLabel={`Acessar ${service.title}`}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={[styles.iconContainer, { backgroundColor: service.background }]} >
        <Icon name={service.icon}  color={service.tint} size={24}/>
      </View>

      <Text style={styles.title} >{service.title}</Text>
    
      <Text style={styles.description}>{service.description}</Text>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Acessar</Text>
        <Icon name="external-link" size={14} color="#666" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 18,
    padding: 16,
    gap: 8,
  },
  cardPressed: {
    opacity: 0.8,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  description: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    marginTop: 8,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151'
  },
});
