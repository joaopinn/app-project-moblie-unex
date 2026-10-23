## 1. O que foi compreendido do Projeto (Visão Geral e Arquitetura)

### Proposta e Negócio (registro_inicial_do_projeto_nexa.md)

O NEXA é um aplicativo mobile desenvolvido na disciplina de Desenvolvimento Mobile e Híbrido (Sistemas de Informação - UNEX).

• Objetivo: Centralizar e adaptar informações acadêmicas e institucionais da UNEX (cursos, calendário, eventos, notícias, resumo do semestre, carteirinha digital e atalhos rápidos) para uma experiência mobile-first.  
 • Fronteira de Escopo: O app não substitui sistemas burocráticos complexos (como portal de rematrícula ou financeiro completo), atuando como um hub ágil para o aluno e redirecionando para plataformas oficiais quando necessário.

### Estado Atual do Código (home-passo-a-passo.md e src/)

O projeto utiliza Expo SDK 57 com React Native 0.86.3, React 19 e Expo Router (package.json).  
 Apenas a primeira página (Home) foi implementada e concentrada em HomeScreen, exportada pela rota inicial index.tsx. Ela contém:

1. Header fixo + Busca (header): Logotipo tipográfico (nexa by UNEX), botão de notificações e barra de pesquisa que filtra em tempo real o array de shortcuts.
2. Destaque (Hero): Card com gradiente (expo-linear-gradient), chamadas de ação e barra de progresso do curso (68% - 6º semestre).
3. Acessos Rápidos (shortcuts): Grade flexível de 2 colunas com 6 serviços (Portal do aluno, Calendário, Biblioteca, Financeiro, Documentos, Cursos).
4. Resumo do Semestre (semester): Cards com indicadores rápidos (Disciplinas, Próxima aula, Atividades, Mensagens).
5. Próximos Compromissos (appointments): Lista de aulas, entregas e eventos com tags coloridas.
6. Carteirinha Digital (StudentCard): Card estilizado com dados do estudante e status de validação.
7. Comunicados (announcements): Lista na seção "Para você".
8. Barra de Navegação Inferior (bottomBar) e Modal (Modal): Uma barra customizada na base da tela que faz scroll suave (scrollTo) para as seções "Serviços" e "Agenda", ou exibe um modal informativo para funcionalidades ainda em  
   protótipo.  


Pontos Positivos da Implementação Atual:

• Excelente cuidado inicial com acessibilidade (a11y): uso de accessibilityRole, accessibilityLabel, accessibilityState, accessibilityLiveRegion e hitSlop.  
 • Subcomponentes (Hero, Section, StudentCard, Icon) declarados fora de HomeScreen, evitando recriação de referências a cada re-render.  
 • Filtragem de busca derivada diretamente do estado (query), sem useEffect redundante.  
 ──────

## 2. Erros, Inconsistências e Pontos de Atenção Encontrados

### 🔴 1. Tipografia excessivamente pequena para padrões Mobile

Em home-screen.tsx:216-270, diversos textos utilizam tamanhos entre 7dp e 10dp:

• greenBadge, dateMonth, eventBadge: fontSize: 7

Resume with -c (or command below):
agy --conversation=97b4ec72-3760-4046-9fe8-bab9f9d783eb

• eyebrowText, overline, demoBadge: fontSize: 8
• progressDetail, actionText, cardDescription, studentCourse, navLabel: fontSize: 9
• subtitle, cardTitle, secondaryLabel, metricLabel: fontSize: 10
• searchInput, heroDescription, primaryLabel: fontSize: 11

│ Impacto: Em dispositivos físicos (Android/iOS), fontes abaixo de 11dp–12dp ficam praticamente ilegíveis e ferem diretrizes de usabilidade (Material Design e Apple HIG recomendam mínimo de 12pt/sp para legendas e 14pt–16pt para  
 │ corpo/inputs). Além disso, no iOS, TextInput com fonte menor que 16px na versão Web mobile pode forçar zoom automático do navegador.

### 🟡 2. Coexistência de código legado do template Expo e duplicidade de temas

O projeto mantém arquivos do starter template do Expo que conflitam conceitualmente com a nova arquitetura da Home:

• Navegação duplicada / código morto: O arquivo \_layout.tsx configura um Stack simples apenas com index, enquanto explore.tsx, app-tabs.tsx e app-tabs.web.tsx continuam no projeto sem uso prático na navegação principal, enquanto  
 HomeScreen recria uma barra de abas manualmente via <View>.
• Design Tokens fragmentados: Existe o arquivo theme.ts com Colors, Fonts e Spacing, mas home-screen.tsx:10-13 define seu próprio objeto colors local.

### 🟡 3. Inconsistência na Busca (TextInput)

• Na linha 142 de home-screen.tsx:142, o placeholder diz: "Busque cursos, serviços, notícias ou eventos...", mas a lógica em visibleShortcuts (linha 126) filtra apenas o array shortcuts (Acessos rápidos), ignorando appointments  
 (eventos/aulas) e announcements (notícias/comunicados) que já estão presentes na mesma tela.

### 🟡 4. Pequena divergência de dados e configurações de projeto

• Nome do integrante: No documento registro_inicial_do_projeto_nexa.md:26 está grafado "Muirillo Marinho" (e "Mateus Quieroz"), enquanto na carteirinha em home-screen.tsx:103 está "Murillo Marinho". Vale corrigir o erro de  
 digitação no documento de registro.
• Metadados em app.json: O nome do aplicativo e o slug ainda estão com o typo do repositório ("app-project-moblie-unex") e splash screen azul padrão (#208AEF), em vez da identidade visual do NEXA (#151936 / #d5ec63).
• Dependências locais (node_modules): A pasta node_modules não está instalada no ambiente atual (será necessário rodar npm install antes de rodar npx expo start, lint ou tsc).
──────

## 3. Próximos Passos Sugeridos (Roadmap Técnico)

1. Unificar o Design System em src/constants/theme.ts:
   • Migrar a paleta colors da HomeScreen (navy, lime, ink, muted, background, line) para theme.ts e recalibrar a escala tipográfica (subindo textos de 7–10 para 11–14).
2. Modularizar e Desacoplar a Home:
   • Extrair os dados estáticos (shortcuts, semester, appointments, announcements) para uma camada de dados/mocks (src/data/mock-home.ts) com tipagens compartilhadas (src/types/).
   • Separar componentes reutilizáveis (Section, Hero, StudentCard) em arquivos próprios dentro de src/components/home/.
3. Estruturar a Navegação Real com Expo Router (Tabs):
   • Quando forem criar as próximas telas do protótipo (Serviços, Agenda, Mensagens, Perfil), converter a barra inferior estática de home-screen.tsx:192-202 em um layout de abas do Expo Router (src/app/(tabs)/\_layout.tsx),  
   removendo os arquivos legados do template (explore.tsx, app-tabs.tsx).
4. Implementar Redirecionamentos Externos Reais:
   • Como o pacote expo-web-browser já está listado no package.json:21, utilizar openBrowserAsync nos atalhos que devem abrir sistemas oficiais da UNEX (ex.: Portal do Aluno, Biblioteca, Financeiro), cumprindo o requisito central
   da proposta.
5. Ampliar a Busca da Home:
   • Fazer o filtro normalizedQuery pesquisar também em appointments e announcements, condizendo com o texto do placeholder.

──────

### 📋 Relatório de Modificações e Impacto

• Alterações Realizadas:
• Nenhuma alteração em arquivos de código foi realizada nesta etapa (apenas leitura e diagnóstico arquitetural conforme solicitado).
• Motivação:
• Compreender o contexto acadêmico e técnico do projeto NEXA, validar a implementação da primeira tela (HomeScreen) frente à proposta oficial e mapear inconsistências e próximos passos.
• Impacto no Sistema:
• O diagnóstico fornece o direcionamento para evoluir o protótipo de tela única para uma aplicação multi-telas escalável com Expo Router.
• Riscos & Pontos de Atenção:
• Link do Figma ausente: Envie o link do Figma caso deseje uma auditoria visual comparativa das próximas telas ou ajustes finos na Home.
• Legibilidade Mobile: Textos entre 7dp e 10dp na HomeScreen podem comprometer a leitura em smartphones reais.
• Ambiente sem pacotes instalados: Execute npm install antes de iniciar o servidor de desenvolvimento ou rodar validações de tipo/lint.
