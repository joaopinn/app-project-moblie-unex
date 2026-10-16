# app-project-moblie-unex

Projeto React Native com Expo SDK 57, TypeScript e Expo Router.

## Começar

As dependências já estão instaladas. Para abrir no navegador:

```bash
npm run web
```

Para iniciar o servidor com as opções de plataforma:

```bash
npm start
```

Edite `src/app/index.tsx` para modificar a primeira tela.

## Celular e simuladores

O projeto usa o SDK 57 para compatibilidade com o Expo Go disponível durante a transição para o SDK 58. Execute `npx expo start --clear`, conecte o celular e o Mac à mesma rede Wi-Fi e escaneie o QR Code pelo Expo Go (Android) ou pela câmera (iPhone).

O simulador iOS exige o Xcode completo e um runtime iOS. O emulador Android exige Android Studio, Android SDK e JDK. Essas ferramentas não foram instaladas nesta preparação.

## Verificação

```bash
npx tsc --noEmit
npm run lint
npx expo install --check
```

Para reinstalar exatamente as dependências registradas no lockfile, use `npm ci`.

O npm identificou alertas de segurança nas dependências do template. Foram aplicadas as correções compatíveis com `npm audit fix`; os alertas restantes precisam ser avaliados antes de publicar o aplicativo. Não aplique `npm audit fix --force` automaticamente: a solução sugerida inclui trocar o Expo por uma versão antiga e incompatível.
