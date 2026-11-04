import { Tabs, type BottomTabBarProps } from 'expo-router/js-tabs';
import { Alert } from 'react-native';

import { BottomNav, type NavigationItem } from '@/components/layout/bottom-nav';

// Adaptador entre o navegador de abas e o nosso componente visual BottomNav.
// Segue o padrão de tab bar customizada do React Navigation: emite "tabPress"
// (permite que a tela ativa reaja, ex.: rolar ao topo) e só navega se a aba
// ainda não estiver focada.
function NexaTabBar({ state, navigation }: BottomTabBarProps) {
  const focused = state.routes[state.index];

  const onSelect = (item: NavigationItem) => {
    if (!item.route) {
      Alert.alert(item.label, 'Esta tela ainda será desenvolvida.');
      return;
    }

    const target = state.routes.find((route) => route.name === item.route);
    if (!target) return;

    const event = navigation.emit({
      type: 'tabPress',
      target: target.key,
      canPreventDefault: true,
    });

    if (focused.key !== target.key && !event.defaultPrevented) {
      navigation.navigate(target.name, target.params);
    }
  };

  return <BottomNav activeRoute={focused.name} onSelect={onSelect} />;
}

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <NexaTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      {/* A ordem aqui define a ordem do histórico de abas (botão voltar no Android). */}
      <Tabs.Screen name="index" options={{ title: 'Início' }} />
      <Tabs.Screen name="servicos" options={{ title: 'Serviços' }} />
      <Tabs.Screen name="agenda" options={{ title: 'Agenda' }} />
      <Tabs.Screen name="perfil" options={{ title: 'Perfil' }} />
    </Tabs>
  );
}
