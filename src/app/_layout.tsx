import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

// A Stack raiz contém o grupo (tabs). Telas que devem abrir POR CIMA da barra
// inferior (detalhes, modais) podem ser declaradas aqui no futuro.
export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );

} 