import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { Icon } from "@/components/ui/nexa-icon";
import { colors } from "@/constants/nexa-theme";

type Props = {
  query: string;
  onChangeQuery: (value: string) => void;
  onSubmit?: () => void;
  onBellPress: () => void;
  placeholder?: string;
};

// Componente "controlado": quem usa o header é dono do estado da busca (query).
export function AppHeader({
  query,
  onChangeQuery,
  onSubmit,
  onBellPress,
  placeholder = "Busque cursos, serviços, notícias ou eventos...",
}: Props) {
  return (
    <View style={styles.header}>
      <View style={styles.brandRow}>
        <View accessibilityLabel="Nexa, by UNEX">
          <Text style={styles.logo}>
            ne<Text style={styles.logoAccent}>x</Text>a
          </Text>
          <Text style={styles.byline}>by UNEX</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Ver notificações"
          hitSlop={8}
          onPress={onBellPress}
          style={styles.bell}
        >
          <Icon name="bell" />
          <View style={styles.notificationDot} />
        </Pressable>
      </View>
      <View style={styles.searchBox}>
        <Icon name="search" size={19} />
        <TextInput
          accessibilityLabel="Buscar"
          placeholder={placeholder}
          placeholderTextColor="#9b9da6"
          value={query}
          onChangeText={onChangeQuery}
          onSubmitEditing={onSubmit}
          returnKeyType="search"
          style={styles.searchInput}
        />
        {query ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Limpar busca"
            onPress={() => onChangeQuery("")}
            hitSlop={8}
          >
            <Icon name="x" size={17} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.background,
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  logo: {
    color: colors.navy,
    fontSize: 29,
    fontWeight: "900",
    letterSpacing: -2,
  },
  logoAccent: { color: "#a5bf38" },
  byline: { fontSize: 10, color: colors.muted, marginTop: -2 },
  bell: { padding: 9 },
  notificationDot: {
    position: "absolute",
    right: 9,
    top: 7,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.lime,
    borderWidth: 1,
    borderColor: colors.white,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    minHeight: 46,
    borderRadius: 16,
    backgroundColor: colors.white,
    boxShadow: "0px 5px 18px rgba(25, 30, 50, 0.07)",
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 12,
    fontSize: 13,
    color: colors.ink,
  },
});
