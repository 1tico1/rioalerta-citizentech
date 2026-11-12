import { BAIRROS, CONTATOS } from "./data.js";
import { classificarRisco, filtrarBairros, ordenarPorRisco, resumoPorNivel } from "./logic.js";

const lista = document.querySelector("#lista-bairros");
const campoBusca = document.querySelector("#busca");
const campoZona = document.querySelector("#zona");
const contador = document.querySelector("#contador");

function renderResumo() {
  const resumo = resumoPorNivel(BAIRROS);
  for (const [nivel, total] of Object.entries(resumo)) {
    const el = document.querySelector(`[data-resumo="${nivel}"]`);
    if (el) el.textContent = total;
  }
}

function renderBairros() {
  const filtrados = ordenarPorRisco(filtrarBairros(BAIRROS, campoBusca.value, campoZona.value));
  contador.textContent = `${filtrados.length} bairro(s) encontrado(s)`;
  lista.innerHTML = "";

  if (filtrados.length === 0) {
    lista.innerHTML = `<p class="vazio">Nenhum bairro encontrado. Tente outro nome ou zona.</p>`;
    return;
  }

  for (const bairro of filtrados) {
    const risco = classificarRisco(bairro.chuva24h);
    const card = document.createElement("article");
    card.className = `card risco-${risco.chave}`;
    card.innerHTML = `
      <header>
        <h3>${bairro.nome}</h3>
        <span class="selo">${risco.rotulo}</span>
      </header>
      <p class="meta">Zona ${bairro.zona} · ${bairro.rioProximo}</p>
      <p class="chuva"><strong>${bairro.chuva24h} mm</strong> de chuva nas últimas 24h</p>
      <p class="orientacao">${risco.orientacao}</p>
    `;
    lista.appendChild(card);
  }
}

function renderContatos() {
  const alvo = document.querySelector("#lista-contatos");
  alvo.innerHTML = CONTATOS.map(
    (c) => `
    <a class="contato" href="tel:${c.telefone}">
      <span class="numero">${c.telefone}</span>
      <span><strong>${c.servico}</strong><br><small>${c.descricao}</small></span>
    </a>`
  ).join("");
}

campoBusca.addEventListener("input", renderBairros);
campoZona.addEventListener("change", renderBairros);

renderResumo();
renderBairros();
renderContatos();
