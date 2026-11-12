// Dados de demonstração (simulados) usados pela aplicação.
// Os volumes de chuva são fictícios e servem apenas para ilustrar o fluxo da solução.

export const BAIRROS = [
  { nome: "Jardim Pantanal", zona: "Leste", chuva24h: 92, rioProximo: "Tietê" },
  { nome: "Vila Prudente", zona: "Leste", chuva24h: 48, rioProximo: "Tamanduateí" },
  { nome: "Itaim Paulista", zona: "Leste", chuva24h: 61, rioProximo: "Tietê" },
  { nome: "Cambuci", zona: "Centro", chuva24h: 35, rioProximo: "Tamanduateí" },
  { nome: "Santa Cecília", zona: "Centro", chuva24h: 12, rioProximo: "Córrego Pacaembu" },
  { nome: "Pompeia", zona: "Oeste", chuva24h: 27, rioProximo: "Córrego Água Preta" },
  { nome: "Butantã", zona: "Oeste", chuva24h: 18, rioProximo: "Pinheiros" },
  { nome: "Casa Verde", zona: "Norte", chuva24h: 55, rioProximo: "Tietê" },
  { nome: "Brasilândia", zona: "Norte", chuva24h: 74, rioProximo: "Córrego Bananal" },
  { nome: "Capão Redondo", zona: "Sul", chuva24h: 40, rioProximo: "Córrego Pirajuçara" },
  { nome: "Jabaquara", zona: "Sul", chuva24h: 8, rioProximo: "Córrego Água Espraiada" },
  { nome: "Ipiranga", zona: "Sul", chuva24h: 66, rioProximo: "Riacho do Ipiranga" }
];

export const CONTATOS = [
  { servico: "Defesa Civil", telefone: "199", descricao: "Alagamentos, deslizamentos e áreas de risco" },
  { servico: "Corpo de Bombeiros", telefone: "193", descricao: "Resgate de pessoas ilhadas ou em perigo" },
  { servico: "SAMU", telefone: "192", descricao: "Emergências médicas" },
  { servico: "Central 156", telefone: "156", descricao: "Serviços da prefeitura e limpeza de bueiros" }
];

// Pontos de apoio para acolhimento em caso de enchente (dados simulados).
export const PONTOS_APOIO = [
  { nome: "CEU Jardim Pantanal", zona: "Leste", endereco: "Rua Lagoa Formosa, 120", capacidade: 300 },
  { nome: "EMEF Itaim Paulista", zona: "Leste", endereco: "Av. Marechal Tito, 4500", capacidade: 180 },
  { nome: "Ginásio da Casa Verde", zona: "Norte", endereco: "Rua Zilda, 55", capacidade: 220 },
  { nome: "CEU Paz (Brasilândia)", zona: "Norte", endereco: "Rua Daniel Cerri, 300", capacidade: 250 },
  { nome: "Clube Escola Ipiranga", zona: "Sul", endereco: "Rua Silva Bueno, 1000", capacidade: 200 },
  { nome: "CEU Capão Redondo", zona: "Sul", endereco: "Rua Daniel Gran Ferreira, 1000", capacidade: 280 },
  { nome: "Centro Esportivo Cambuci", zona: "Centro", endereco: "Rua Muniz de Souza, 400", capacidade: 150 },
  { nome: "Clube Escola Butantã", zona: "Oeste", endereco: "Av. Corifeu de Azevedo Marques, 900", capacidade: 160 }
];
