import { test } from "node:test";
import assert from "node:assert/strict";
import { classificarRisco, filtrarBairros, ordenarPorRisco, resumoPorNivel, normalizar } from "../src/logic.js";
import { BAIRROS } from "../src/data.js";

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
