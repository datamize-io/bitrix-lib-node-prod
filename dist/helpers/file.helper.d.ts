export declare class FileHelper {
    static sanitizeFilename(name: string): string;
    static ensureDir(dir: string): Promise<void>;
    static createFileIfNotExists(filePath: string, contents: string): Promise<void>;
}
