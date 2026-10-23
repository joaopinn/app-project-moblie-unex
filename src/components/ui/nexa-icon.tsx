import Feather from '@expo/vector-icons/Feather';
import type { ComponentProps } from 'react';

import { colors } from '@/constants/nexa-theme';

// Tipo derivado do próprio Feather: o TypeScript só aceita nomes de ícones que existem.
export type IconName = ComponentProps<typeof Feather>['name'];

export function Icon({ name, color = colors.muted, size = 20 }: { name: IconName; color?: string; size?: number }) {
  return <Feather name={name} size={size} color={color} />;
}
