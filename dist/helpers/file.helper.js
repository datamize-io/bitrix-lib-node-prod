import fs from "fs/promises";
export class FileHelper {
    static sanitizeFilename(name) {
        // mantém letras, números, hífen e sublinhado; troca o resto por _
        return name.replace(/[^a-zA-Z0-9-_]/g, "_").slice(0, 120);
    }
    static async ensureDir(dir) {
        await fs.mkdir(dir, { recursive: true });
    }
    static async createFileIfNotExists(filePath, contents) {
        try {
            // 'wx' => falha se o arquivo já existir
            await fs.writeFile(filePath, contents, { flag: "wx" });
        }
        catch (err) {
            if (err?.code !== "EEXIST")
                throw err; // ignora se já existe
        }
    }
}
