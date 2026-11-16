import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Icon, type IconName } from "@/components/ui/nexa-icon";
import { colors } from "@/constants/nexa-theme";

// Nome do arquivo de rota dentro de src/app/(tabs)/. Itens sem rota ainda não
// têm tela implementada (ex.: Mensagens).
export type TabRoute = "index" | "servicos" | "agenda" | "perfil" | "courses";

export type NavigationItem = { label: string; icon: IconName; route?: TabRoute };

export const navigationItems: NavigationItem[] = [
  { label: "Início", icon: "home", route: "index" },
  { label: "Serviços", icon: "grid", route: "servicos" },
  { label: "Agenda", icon: "calendar", route: "agenda" },
  { label: "Mensagens", icon: "mail" },
  { label: "Perfil", icon: "user", route: "perfil" },
];

type Props = {
  /** Nome da rota focada no navegador de abas. */
  activeRoute: string;
  onSelect: (item: NavigationItem) => void;
};

// Componente puramente visual: quem decide o que acontece ao tocar é o layout
// de abas (src/app/(tabs)/_layout.tsx). Assim nenhuma tela duplica a barra.
export function BottomNav({ activeRoute, onSelect }: Props) {
  return (
    <SafeAreaView edges={["bottom"]} style={styles.bottomBar}>
      <View style={styles.navigation} accessibilityRole="tablist">
        {navigationItems.map((item) => {
          const active = item.route === activeRoute;
          return (
            <Pressable
              key={item.label}
              accessibilityRole="tab"
              accessibilityLabel={item.label}
              accessibilityState={{ selected: active }}
              onPress={() => onSelect(item)}
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
