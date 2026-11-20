import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { type ComponentProps, type ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type IconName = ComponentProps<typeof Feather>['name'];

export const profileColors = {
  ink: '#171a2c',
  muted: '#818697',
  subtle: '#a0a5b3',
  line: '#e7eaf1',
  navy: '#151936',
  lime: '#d5ec63',
  white: '#ffffff',
  background: '#fbfbfc',
  tileBg: '#f0f2f7',
  successBg: '#eef8d2',
  successText: '#49610b',
  warningBg: '#fff5db',
  warningText: '#8a5d00',
};

type ProfileSubscreenLayoutProps = {
  eyebrow?: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function ProfileSubscreenLayout({
  eyebrow = 'CONFIGURAÇÕES DO PERFIL',
  title,
  description,
  children,
}: ProfileSubscreenLayoutProps) {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/perfil');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.shell}>
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Voltar para o perfil"
            onPress={handleBack}
            hitSlop={8}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          >
            <Feather name="arrow-left" color={profileColors.navy} size={20} />
            <Text style={styles.backButtonLabel}>Perfil</Text>
          </Pressable>

          <Text style={styles.eyebrow}>{eyebrow}</Text>
          <Text accessibilityRole="header" style={styles.title}>
            {title}
          </Text>
          <Text style={styles.description}>{description}</Text>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: profileColors.white },
  shell: {
    flex: 1,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    backgroundColor: profileColors.background,
  },
  header: {
    backgroundColor: profileColors.white,
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f1f5',
    gap: 6,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginLeft: -10,
    marginBottom: 6,
    borderRadius: 10,
  },
  backButtonLabel: {
    color: profileColors.navy,
    fontSize: 13,
    fontWeight: '700',
  },
  eyebrow: {
    fontSize: 9,
    lineHeight: 12,
    letterSpacing: 1.2,
    color: '#858da6',
    fontWeight: '800',
  },
  title: {
    color: profileColors.ink,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  description: {
    color: profileColors.muted,
    fontSize: 12,
    lineHeight: 17,
  },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40, gap: 18 },
  pressed: { opacity: 0.65 },
});