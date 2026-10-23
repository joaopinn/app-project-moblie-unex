import type { Service } from "@/data/services";
import { Alert, Linking } from "react-native";

// Utilitário único responsável pelos redirecionamentos de serviços do NEXA.
//  Se houver URL confirmada (https): abre a página oficial da UNEX fora do app.
//  Se não houver URL: exibe o aviso de funcionalidade em protótipo.
export function openServiceLink(service: Service): void {
  if (!service.url) {
    Alert.alert(
      "Protótipo NEXA",
      `O serviço "${service.title}" é uma demonstração do protótipo e estará disponível em breve.`,
    );
    return;
  }

  // Defensivo: só abre links https, evitando esquemas inesperados (tel:, intent:, etc.).
  if (!service.url.startsWith("https://")) {
    Alert.alert("Link inválido", "O endereço deste serviço não é seguro para abertura.");
    return;
  }

  Linking.openURL(service.url).catch(() => {
    Alert.alert(
      "Erro ao abrir link",
      "Não foi possível redirecionar para o endereço informado. Tente novamente mais tarde.",
    );
  });
}