import { Command } from "commander";
import fs from "fs";
import path from "path";
const program = new Command();
program.name("bxlib").description("CLI para geração de modelos Bitrix").version("1.0.0");
program
    .command("generate")
    .argument("<type>", "Tipo a ser gerado (ex: model)")
    .argument("<module>", "Módulo a ser gerado (ex: crm, im)")
    .argument("<name>", "Nome do modelo (ex: Deal)")
    .action((type, module, name) => {
    if (type !== "model") {
        console.error("❌ Tipo não suportado:", type);
        process.exit(1);
    }
    const pascal = name.charAt(0).toUpperCase() + name.slice(1);
    const entityDir = path.join("src", "bitrix", module);
    const builderDir = path.join("src", "bitrix", "builders", module);
    const interfaceDir = path.join("src", "bitrix", "interfaces", module);
    const builderPath = path.join(builderDir, `${pascal}Builder.builder.ts`);
    const interfacePath = path.join(interfaceDir, `${pascal}Interface.interface.ts`);
    const entityPath = path.join(entityDir, `${pascal}.ts`);
    // Caminho dinâmico do BitrixBuilder
    const interfaceImportPath = path
        .relative(entityDir, path.join("src", "bitrix", "interfaces", module, `${pascal}Interface.interface.js`))
        .replace(/\\/g, "/");
    const builderImportRelativePath = `../builders/${module}/${pascal}Builder.builder.js`;
    const builderContent = `
import { BitrixBuilder } from "../BitrixBuilder.builder.js";
import { ${pascal}Interface } from "../${interfaceImportPath}";

export abstract class ${pascal}Builder extends BitrixBuilder implements ${pascal}Interface {
  
}
`;
    const interfaceContent = `
export interface ${pascal}Interface {
  // TODO: Defina os campos da interface
}
`;
    const entityContent = `
import { ${pascal}Builder } from "${builderImportRelativePath}";
import { ${pascal}Interface } from "${interfaceImportPath}";

export class ${pascal} extends ${pascal}Builder implements ${pascal}Interface {

}
`;
    function writeIfNotExists(filePath, content) {
        if (fs.existsSync(filePath)) {
            console.log(`⚠️  Arquivo já existe e não será sobrescrito: ${filePath}`);
            return;
        }
        fs.writeFileSync(filePath, content.trimStart());
        console.log(`✅ Arquivo criado: ${filePath}`);
    }
    fs.mkdirSync(entityDir, { recursive: true });
    fs.mkdirSync(builderDir, { recursive: true });
    fs.mkdirSync(interfaceDir, { recursive: true });
    writeIfNotExists(builderPath, builderContent);
    writeIfNotExists(interfacePath, interfaceContent);
    writeIfNotExists(entityPath, entityContent);
    // Atualizar index.ts
    const exportLine = `export * from "./${module}/${pascal}.js";`;
    const indexPath = path.join("src", "bitrix", "index.ts");
    if (!fs.existsSync(indexPath)) {
        fs.writeFileSync(indexPath, `${exportLine}\n`);
        console.log(`📄 Criado index.ts com exportação inicial.`);
    }
    else {
        const indexContent = fs.readFileSync(indexPath, "utf8");
        const lines = indexContent.split("\n").map((l) => l.trim());
        if (!lines.includes(exportLine)) {
            fs.appendFileSync(indexPath, `${exportLine}\n`);
            console.log(`➕ Export adicionado ao index.ts: ${exportLine}`);
        }
        else {
            console.log(`✅ Export já presente em index.ts.`);
        }
    }
    console.log(`🎉 Modelo ${pascal} gerado com sucesso em: ${path.join("bitrix", module)}`);
});
program.parse();
