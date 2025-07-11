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
  .action((type: string, module: string, name: string) => {
    if (type !== "model") {
      console.error("❌ Tipo não suportado:", type);
      process.exit(1);
    }

    const pascal = name.charAt(0).toUpperCase() + name.slice(1);

    const entityDir = path.join("src", "bitrix", "models", module);
    const builderDir = path.join("src", "bitrix", "builders", module);
    const interfaceDir = path.join("src", "bitrix", "interfaces", module);

    const builderPath = path.join(builderDir, `${pascal}Builder.builder.ts`);
    const interfacePath = path.join(interfaceDir, `${pascal}Interface.interface.ts`);
    const entityPath = path.join(entityDir, `${pascal}.ts`);

    const interfaceImportPath = path
      .relative(entityDir, path.join("src", "bitrix", "interfaces", module, `${pascal}Interface.interface.ts`))
      .replace(/\\/g, "/");

    const builderImportRelativePath = path
      .relative(entityDir, path.join("src", "bitrix", "builders", module, `${pascal}Builder.builder.ts`))
      .replace(/\\/g, "/");

    const builderContent = `
import { BitrixBuilder } from "../BitrixBuilder.builder.js";
import { ${pascal}Interface } from "${interfaceImportPath.replace(".ts", ".js")}";

export abstract class ${pascal}Builder extends BitrixBuilder implements ${pascal}Interface {
  
}
`;

    const interfaceContent = `
export interface ${pascal}Interface {
  // TODO: Defina os campos da interface
}
`;

    const entityContent = `
import { ${pascal}Builder } from "${builderImportRelativePath.replace(".ts", ".js")}";
import { ${pascal}Interface } from "${interfaceImportPath.replace(".ts", ".js")}";

export class ${pascal} extends ${pascal}Builder implements ${pascal}Interface {

}
`;

    function writeIfNotExists(filePath: string, content: string) {
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

    const moduleIndexPath = path.join(entityDir, "index.ts");
    const exportEntityLine = `export * from "./${pascal}.js";`;

    if (!fs.existsSync(moduleIndexPath)) {
      fs.writeFileSync(moduleIndexPath, exportEntityLine + "\n");
      console.log(`📄 Criado index.ts no módulo ${module} com exportação inicial.`);
    } else {
      const moduleIndexContent = fs.readFileSync(moduleIndexPath, "utf8");
      const moduleIndexLines = moduleIndexContent.split("\n").map((l) => l.trim());
      if (!moduleIndexLines.includes(exportEntityLine)) {
        fs.appendFileSync(moduleIndexPath, exportEntityLine + "\n");
        console.log(`➕ Export adicionado ao index.ts do módulo ${module}: ${exportEntityLine}`);
      } else {
        console.log(`✅ Export já presente no index.ts do módulo ${module}.`);
      }
    }

    const rootIndexPath = path.join("src", "bitrix", "index.ts");
    const exportModuleLine = `export * from "./models/${module}/index.js";`;

    if (!fs.existsSync(rootIndexPath)) {
      fs.writeFileSync(rootIndexPath, exportModuleLine + "\n");
      console.log(`📄 Criado index.ts raiz com exportação inicial do módulo ${module}.`);
    } else {
      const rootIndexContent = fs.readFileSync(rootIndexPath, "utf8");
      const rootIndexLines = rootIndexContent.split("\n").map((l) => l.trim());
      if (!rootIndexLines.includes(exportModuleLine)) {
        fs.appendFileSync(rootIndexPath, exportModuleLine + "\n");
        console.log(`➕ Export do módulo ${module} adicionado ao index.ts raiz.`);
      } else {
        console.log(`✅ Export do módulo ${module} já presente no index.ts raiz.`);
      }
    }

    console.log(`🎉 Modelo ${pascal} gerado com sucesso no módulo ${module}.`);
  });

program.parse(process.argv);
