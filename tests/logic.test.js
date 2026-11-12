import { test } from "node:test";
import assert from "node:assert/strict";
import { classificarRisco, filtrarBairros, ordenarPorRisco, resumoPorNivel, normalizar, pontosDeApoioPorZona } from "../src/logic.js";
import { BAIRROS, PONTOS_APOIO } from "../src/data.js";

test("classifica risco pelas faixas de chuva", () => {
  assert.equal(classificarRisco(0).chave, "baixo");
  assert.equal(classificarRisco(29).chave, "baixo");
  assert.equal(classificarRisco(30).chave, "atencao");
  assert.equal(classificarRisco(50).chave, "alto");
  assert.equal(classificarRisco(80).chave, "critico");
  assert.equal(classificarRisco(150).chave, "critico");
});

test("rejeita volume de chuva inválido", () => {
  assert.throws(() => classificarRisco(-1));
  assert.throws(() => classificarRisco("10"));
  assert.throws(() => classificarRisco(NaN));
});

test("busca ignora acentos e maiúsculas", () => {
  assert.equal(normalizar("  Santa Cecília "), "santa cecilia");
  const r = filtrarBairros(BAIRROS, "cecilia");
  assert.equal(r.length, 1);
  assert.equal(r[0].nome, "Santa Cecília");
});

test("filtra por zona", () => {
  const leste = filtrarBairros(BAIRROS, "", "Leste");
  assert.ok(leste.length > 0);
  assert.ok(leste.every((b) => b.zona === "Leste"));
});

test("ordena do maior para o menor risco sem alterar a lista original", () => {
  const ordenados = ordenarPorRisco(BAIRROS);
  for (let i = 1; i < ordenados.length; i++) {
    assert.ok(ordenados[i - 1].chuva24h >= ordenados[i].chuva24h);
  }
  assert.notStrictEqual(ordenados, BAIRROS);
});

test("resumo soma a quantidade total de bairros", () => {
  const resumo = resumoPorNivel(BAIRROS);
  const total = Object.values(resumo).reduce((a, b) => a + b, 0);
  assert.equal(total, BAIRROS.length);
});

test("pontos de apoio filtram pela zona e vêm ordenados por capacidade", () => {
  const leste = pontosDeApoioPorZona(PONTOS_APOIO, "Leste");
  assert.ok(leste.length > 0);
  assert.ok(leste.every((p) => p.zona === "Leste"));
  for (let i = 1; i < leste.length; i++) {
    assert.ok(leste[i - 1].capacidade >= leste[i].capacidade);
  }
  assert.equal(pontosDeApoioPorZona(PONTOS_APOIO, "Todas").length, PONTOS_APOIO.length);
});

test("toda zona com bairro em risco alto ou crítico tem ponto de apoio", () => {
  const zonasEmRisco = new Set(
    BAIRROS.filter((b) => ["alto", "critico"].includes(classificarRisco(b.chuva24h).chave)).map((b) => b.zona)
  );
  for (const zona of zonasEmRisco) {
    assert.ok(pontosDeApoioPorZona(PONTOS_APOIO, zona).length > 0, `zona ${zona} sem ponto de apoio`);
  }
});
