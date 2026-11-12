// Gera a pasta dist/ com os arquivos publicados no GitHub Pages.
// Injeta no rodapé o commit (GITHUB_SHA) e a data do build, para provar
// que cada publicação veio de uma execução do GitHub Actions.
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync, existsSync } from "node:fs";

const DIST = "dist";
const sha = (process.env.GITHUB_SHA || "local").slice(0, 7);
const data = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST);
cpSync("src", `${DIST}/src`, { recursive: true });

const html = readFileSync("index.html", "utf8")
  .replace("__BUILD_SHA__", sha)
  .replace("__BUILD_DATE__", data);
writeFileSync(`${DIST}/index.html`, html);

for (const arquivo of ["index.html", "src/app.js", "src/logic.js", "src/data.js", "src/styles.css"]) {
  if (!existsSync(`${DIST}/${arquivo}`)) {
    console.error(`Arquivo ausente no build: ${arquivo}`);
    process.exit(1);
  }
}

console.log(`Build concluído em ${DIST}/ (commit ${sha}, ${data})`);
