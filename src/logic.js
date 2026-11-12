// Regras de negócio puras (sem DOM), testadas no workflow de CI.

export const NIVEIS = {
  BAIXO: { chave: "baixo", rotulo: "Baixo", orientacao: "Situação normal. Acompanhe a previsão do tempo." },
  ATENCAO: { chave: "atencao", rotulo: "Atenção", orientacao: "Evite áreas próximas a córregos e não deixe lixo na rua." },
  ALTO: { chave: "alto", rotulo: "Alto", orientacao: "Não atravesse ruas alagadas. Deixe documentos em local alto." },
  CRITICO: { chave: "critico", rotulo: "Crítico", orientacao: "Procure um local seguro e ligue 199 em caso de emergência." }
};

/**
 * Classifica o risco de enchente a partir do volume de chuva acumulado em 24h (mm).
 * Faixas: < 30 baixo | 30–49 atenção | 50–79 alto | >= 80 crítico.
 */
export function classificarRisco(chuvaMm) {
  if (typeof chuvaMm !== "number" || Number.isNaN(chuvaMm) || chuvaMm < 0) {
    throw new Error("Volume de chuva inválido");
  }
  if (chuvaMm >= 80) return NIVEIS.CRITICO;
  if (chuvaMm >= 50) return NIVEIS.ALTO;
  if (chuvaMm >= 30) return NIVEIS.ATENCAO;
  return NIVEIS.BAIXO;
}

/** Remove acentos e coloca em minúsculas para busca tolerante. */
export function normalizar(texto) {
  return String(texto)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

/** Filtra bairros por nome (ignorando acentos) e, opcionalmente, por zona. */
export function filtrarBairros(bairros, termo = "", zona = "Todas") {
  const busca = normalizar(termo);
  return bairros.filter((b) => {
    const casaNome = busca === "" || normalizar(b.nome).includes(busca);
    const casaZona = zona === "Todas" || b.zona === zona;
    return casaNome && casaZona;
  });
}

/** Ordena do maior para o menor risco (maior volume de chuva primeiro). */
export function ordenarPorRisco(bairros) {
  return [...bairros].sort((a, b) => b.chuva24h - a.chuva24h);
}

/** Conta quantos bairros existem em cada nível de risco. */
export function resumoPorNivel(bairros) {
  const resumo = { baixo: 0, atencao: 0, alto: 0, critico: 0 };
  for (const b of bairros) {
    resumo[classificarRisco(b.chuva24h).chave] += 1;
  }
  return resumo;
}
