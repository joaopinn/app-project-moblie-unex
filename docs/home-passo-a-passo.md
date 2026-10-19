# Home Nexa: do Figma ao React Native

## 1. O que foi implementado

Apenas a Home do protótipo fornecido. Ela tem cabeçalho, busca, destaque, progresso, seis acessos rápidos, resumo do semestre, compromissos, carteirinha, comunicados e barra inferior.

Os dados são demonstrativos, inclusive nome, matrícula, datas e percentual. Não existe conexão com sistemas da UNEX. As marcas são aproximações em texto: o protótipo não disponibilizou arquivos de logo ou a especificação da fonte. Cores e medidas foram estimadas visualmente, sem acesso ao painel de propriedades do arquivo de design.

## 2. Onde começar a ler

- `src/app/index.tsx`: define a rota inicial. Ele importa e exporta `HomeScreen`.
- `src/app/_layout.tsx`: configura o navegador Stack sem cabeçalho automático, porque a Home possui seu próprio cabeçalho.
- `src/components/home/home-screen.tsx`: contém a interface e seus estilos. Os componentes são definidos fora de `HomeScreen`, para não serem recriados como novos tipos a cada renderização.

Não alterei os outros componentes do template. Eles podem continuar no repositório sem serem exibidos nesta Home. A rota de exemplo `explore` também continua disponível diretamente, mas não integra a barra desta tela.

## 3. Entendendo JSX e componentes

`HomeScreen` é uma função que retorna JSX. Pense no JSX como a descrição da árvore de elementos da tela:

```tsx
<View>
  <Text>Olá!</Text>
</View>
```

`View` agrupa elementos; `Text` desenha texto. No React Native não usamos `div`, `p` ou CSS de navegador para a interface mobile. As propriedades de estilo usam camelCase: `backgroundColor`, por exemplo.

Criamos componentes menores para organizar a leitura:

- `Icon`: padroniza ícones Feather.
- `Section`: desenha os cartões brancos com título, subtítulo e ação opcional.
- `Hero`: desenha o destaque azul e o progresso.
- `StudentCard`: desenha a carteirinha.

`PropsWithChildren` permite que `Section` receba conteúdo entre sua abertura e fechamento. As props são os parâmetros do componente: em `<Section title="Seu semestre">`, `title` recebe esse texto.

## 4. Estrutura vertical da página

O contêiner externo usa `flex: 1` para ocupar o espaço disponível. `SafeAreaView` respeita as áreas reservadas para câmera e barras do sistema.

A tela possui três irmãos: cabeçalho, `ScrollView` e barra inferior. Só o conteúdo central está dentro do `ScrollView`. Assim, cabeçalho e navegação permanecem visíveis sem calcular posições absolutas.

`contentContainerStyle` estiliza o conteúdo interno da rolagem. `padding: 22` cria a margem interna da página e `gap: 20` separa os blocos.

A largura é `100%`, com `maxWidth: 480` e `alignSelf: 'center'`. No celular ocupa a largura disponível; no navegador mantém uma apresentação estreita e centralizada. Não desenhamos uma moldura falsa de celular.

## 5. Paleta e tipografia

O objeto `colors` centraliza os papéis das cores: azul escuro, verde-lima, fundo cinza, texto e bordas. Alterar uma dessas constantes atualiza todos os lugares que a utilizam.

`fontSize` controla o tamanho; `fontWeight`, o peso; `lineHeight`, a distância entre linhas; `letterSpacing`, o espaço entre letras. O título do destaque usa letras grandes e espaçamento negativo para aproximar a referência.

As medidas numéricas do React Native são unidades lógicas, não pixels físicos. O app usa a fonte do sistema. A reprodução é visual, não uma exportação exata do Figma.

## 6. Cabeçalho e busca

`brandRow` usa `flexDirection: 'row'` para alinhar marca e sino lado a lado. `justifyContent: 'space-between'` empurra cada um para uma ponta. `alignItems: 'center'` centraliza verticalmente.

A busca é uma `View` com ícone, `TextInput` e botão de limpar. O campo possui `flex: 1`, ocupando o espaço restante. `minWidth: 0` permite que ele encolha em telas pequenas.

`useState('')` guarda o texto digitado. `value={query}` mostra esse valor; `onChangeText={setQuery}` o atualiza. A lista de serviços é filtrada a partir desse estado, sem efeito nem uma segunda cópia da lista.

A busca implementada procura títulos e descrições dos acessos rápidos. O placeholder foi preservado visualmente, mas ainda não existe busca global de cursos, notícias e eventos. Ao pressionar Buscar no teclado, a rolagem vai para os resultados.

## 7. Destaque azul e progresso

`LinearGradient` recebe duas cores para criar o fundo azul. Ele vem de `expo-linear-gradient`, instalado na versão compatível com o SDK 57.

`borderRadius: 28` arredonda o bloco e `overflow: 'hidden'` recorta as decorações nas bordas. As formas decorativas usam `position: 'absolute'`, então não empurram o texto. `pointerEvents="none"` impede que capturem os toques dos botões.

O botão principal tem fundo verde-lima, texto azul e ícone de seta. `Pressable` recebe uma função em `style`; enquanto `pressed` for verdadeiro, reduzimos a opacidade para indicar o toque.

O progresso é feito com uma trilha e um preenchimento com `width: '68%'`. Não é uma imagem. Para conectar dados reais depois, o número e a largura devem vir de uma mesma variável validada entre 0 e 100.

## 8. Cartões reutilizáveis e grades

`Section` concentra fundo branco, borda, sombra, arredondamento e espaçamento. Isso mantém os blocos consistentes.

Os acessos e as métricas usam `flexDirection: 'row'`, `flexWrap: 'wrap'` e `gap: 10`. Cada cartão tem base de 45% e pode crescer para ocupar o espaço restante. A grade possui duas colunas na largura mobile e continua flexível.

Os dados ficam em arrays fora do componente. `map` transforma cada objeto em um cartão. `key={item.title}` ou `key={item.label}` identifica cada item para o React. As chaves são estáveis e não dependem da posição.

O tipo `IconName`, derivado das props de Feather, faz o TypeScript conferir os nomes dos ícones. Não foi usado `any`.

## 9. Compromissos, carteirinha e comunicados

Cada compromisso é uma linha com data, conteúdo flexível e etiqueta. `headingCopy` usa `flex: 1` e `minWidth: 0` para permitir que o título quebre sem empurrar a etiqueta para fora.

A carteirinha reutiliza o gradiente, mas tem seu próprio espaçamento. Os campos usam largura de 50% para montar duas colunas. A borda superior de `studentFooter` separa os dados da validação.

Os comunicados usam o mesmo padrão de ícone e texto, com fundos suaves diferentes. O conteúdo cabe em múltiplas linhas, sem altura fixa que cortaria o texto.

## 10. Barra inferior e interações

A barra inferior fica fora da rolagem e usa outra `SafeAreaView` para respeitar a área do gesto de início. Cada item tem `flex: 1`, dividindo a largura igualmente.

Somente Início está selecionado: não fingimos que existem outras telas prontas. Serviços rola até os acessos; Agenda rola até os compromissos; Início volta ao topo. As posições são obtidas com `onLayout`, e `useRef` guarda as coordenadas e a referência do `ScrollView` sem provocar renderizações.

Os demais acessos abrem um modal explicando que são demonstrativos. Não há links institucionais inventados. `useState<Notice | null>` controla o modal: um objeto o abre, `null` o fecha. `onRequestClose` permite fechar pelo botão Voltar do Android.

## 11. Acessibilidade e escolhas de implementação

Botões receberam `accessibilityRole="button"`; ícones isolados, nomes acessíveis; títulos, papel de cabeçalho. O progresso expõe seu valor ao leitor de tela. O modal inclui um botão explícito de fechamento. A área de toque do sino foi ampliada com `hitSlop`.

Preservamos o estilo compacto da referência, mas aumentamos a área de toque dos botões principais. Vale validar legibilidade no celular real e com fontes ampliadas; o protótipo usa textos pequenos.

A tela tem um conjunto curto e fixo de cartões, então `ScrollView` é suficiente. Para centenas de itens vindos de uma API, seria melhor uma lista virtualizada.

## 12. Como testar e aprender fazendo

```bash
npm start
```

Abra pelo Expo Go. Para ver no Mac, pressione `w` ou execute `npm run web`.

Experimente uma alteração por vez e salve com Cmd+S:

1. Troque `heroTitle.fontSize` de 29 para 32: observe a quebra de linhas.
2. Troque `content.padding` de 22 para 16: observe a largura dos cartões.
3. Altere `colors.lime`: veja quais componentes compartilham a cor.
4. Adicione um objeto ao array `shortcuts`: observe a nova célula sem duplicar JSX.
5. Troque um texto na lista de comunicados: observe como a altura se adapta.

Para validar o código:

```bash
npm run lint
npx tsc --noEmit
```

Lint verifica padrões e possíveis problemas no código. TypeScript verifica tipos. Nenhum deles substitui olhar a interface no celular e testar os botões.
