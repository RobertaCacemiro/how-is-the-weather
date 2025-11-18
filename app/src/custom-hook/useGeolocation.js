import { useEffect } from "react";

// O hook gerencia a lógica de permissão e o estado
export const useGeolocation = (onSuccess) => {
  useEffect(() => {
    // 1. Verifica suporte
    if (!navigator.geolocation) {
      console.warn("Geolocalização não suportada.");
      // Não é necessário retornar 'null' aqui, apenas o 'return' simples
      return;
    }

    // Função de sucesso: chama onSuccess apenas se a posição for obtida
    const sucesso = (position) => {
      console.log("Permissão concedida e posição obtida.");
      onSuccess && onSuccess(position.coords);
    };

    // Função de erro: Apenas registra o erro, NÃO chama nenhum callback externo
    const erro = (error) => {
      // Você pode registrar o erro, mas NADA mais acontece
      console.error("Erro ao obter geolocalização. Código:", error.code);
      return;
      // Aqui NÃO CHAMAMOS 'onSuccess' nem NENHUM OUTRO CALLBACK
    };

    // 2. Pede a permissão e obtém a posição
    navigator.geolocation.getCurrentPosition(
      sucesso, // Executado em caso de sucesso
      erro, // ⚠️ Executado em caso de erro/negação
      { enableHighAccuracy: false, timeout: 5000 }
    );
  }, [onSuccess]); // Dependências: Funções de callback
};
