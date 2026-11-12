import { Tabs, type BottomTabBarProps } from 'expo-router/js-tabs';
import { Alert } from 'react-native';

import { BottomNav, type NavigationItem } from '@/components/layout/bottom-nav';

// Adaptador entre o navegador de abas e o nosso componente visual BottomNav.
// Segue o padrão de tab bar customizada do React Navigation: emite "tabPress"
// (permite que a tela ativa reaja, ex.: rolar ao topo) e só navega se a aba
// ainda não estiver focada.
function NexaTabBar({ state, navigation }: BottomTabBarProps) {
  const focused = state.routes[state.index];

  // Se por acaso a tela focada atual for "courses" (ou se você quiser mapear outras telas filhas),
  // tratamos para que a aba visual ativa seja "servicos".
  // Nota: Como 'courses' está na raiz, podemos checar o nome ou usar o hook usePathname se preferir,
  // mas aqui podemos inspecionar o estado ou passar uma lógica limpa.
  
  // Vamos usar uma verificação inteligente baseada no nome da rota focada:
  const activeRouteName = focused.name === 'courses' ? 'servicos' : focused.name;

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

  // Passamos o activeRouteName ajustado para o BottomNav
  return <BottomNav activeRoute={activeRouteName} onSelect={onSelect} />;
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
