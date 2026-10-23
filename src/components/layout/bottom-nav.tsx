import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Icon, type IconName } from "@/components/ui/nexa-icon";
import { colors } from "@/constants/nexa-theme";

export const navigationItems: { label: string; icon: IconName }[] = [
  { label: "Início", icon: "home" },
  { label: "Serviços", icon: "grid" },
  { label: "Agenda", icon: "calendar" },
  { label: "Mensagens", icon: "mail" },
  { label: "Perfil", icon: "user" },
];

type Props = { activeIndex: number; onSelect: (index: number) => void };

// Cada tela decide o que acontece ao tocar (onSelect); a barra só desenha e avisa.
export function BottomNav({ activeIndex, onSelect }: Props) {
  return (
    <SafeAreaView edges={["bottom"]} style={styles.bottomBar}>
      <View style={styles.navigation}>
        {navigationItems.map((item, index) => {
          const active = index === activeIndex;
          return (
            <Pressable
              key={item.label}
              accessibilityRole="button"
              accessibilityLabel={item.label}
              accessibilityState={{ selected: active }}
              onPress={() => onSelect(index)}
              style={styles.navItem}
            >
              <View style={[styles.navIcon, active && styles.activeNavIcon]}>
                <Icon
                  name={item.icon}
                  size={25}
                  color={active ? colors.navy : "#9699a3"}
                />
              </View>
              <Text style={[styles.navLabel, active && styles.activeNavLabel]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  navigation: {
    flexDirection: "row",
    paddingTop: 8,
    paddingBottom: 9,
    paddingHorizontal: 8,
  },
  navItem: { flex: 1, alignItems: "center", gap: 6, minHeight: 58 },
  navIcon: {
    width: 44,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 11,
  },
  activeNavIcon: { backgroundColor: colors.lime },
  navLabel: { fontSize: 11, color: colors.muted, fontWeight: "600" },
  activeNavLabel: { color: colors.ink, fontWeight: "700" },
});
