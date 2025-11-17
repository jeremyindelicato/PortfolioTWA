#!/usr/bin/env node
import { readdir, readFile, writeFile } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SRC_DIR = join(__dirname, '../src');
const EXTENSIONS_TO_PROCESS = ['.js', '.jsx', '.ts', '.tsx'];
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg'];

let stats = {
  filesProcessed: 0,
  importsReplaced: 0,
  filesModified: 0
};

/**
 * Remplace les imports d'images par leurs équivalents WebP
 */
function replaceImageImports(content) {
  let modified = false;
  let newContent = content;

  // Pattern pour les imports d'images
  const importPattern = /import\s+(\w+)\s+from\s+['"]([^'"]+\.(png|jpg|jpeg))['"];?/gi;

  newContent = newContent.replace(importPattern, (match, varName, path, ext) => {
    const webpPath = path.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    stats.importsReplaced++;
    modified = true;
    return `import ${varName} from '${webpPath}';`;
  });

  return { content: newContent, modified };
}

/**
 * Parcourt récursivement un dossier et met à jour les fichiers
 */
async function processDirectory(dir) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        await processDirectory(fullPath);
      } else if (entry.isFile()) {
        const ext = extname(entry.name);

        if (EXTENSIONS_TO_PROCESS.includes(ext)) {
          await processFile(fullPath);
        }
      }
    }
  } catch (error) {
    console.error(`❌ Erreur lors du parcours de ${dir}: ${error.message}`);
  }
}

/**
 * Traite un fichier individuel
 */
async function processFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf-8');
    const { content: newContent, modified } = replaceImageImports(content);

    if (modified) {
      await writeFile(filePath, newContent, 'utf-8');
      console.log(`✅ ${filePath.replace(SRC_DIR, 'src')}`);
      stats.filesModified++;
    }

    stats.filesProcessed++;
  } catch (error) {
    console.error(`❌ Erreur: ${filePath} - ${error.message}`);
  }
}

/**
 * Point d'entrée principal
 */
async function main() {
  console.log('🔄 Mise à jour des imports d\'images vers WebP...\n');
  console.log(`📁 Dossier: ${SRC_DIR}\n`);

  const startTime = Date.now();
  await processDirectory(SRC_DIR);
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log('\n' + '='.repeat(60));
  console.log('📊 RÉSULTATS:');
  console.log('='.repeat(60));
  console.log(`📄 Fichiers traités:     ${stats.filesProcessed}`);
  console.log(`📝 Fichiers modifiés:    ${stats.filesModified}`);
  console.log(`🔄 Imports remplacés:    ${stats.importsReplaced}`);
  console.log(`⏱️  Durée:                ${duration}s`);
  console.log('='.repeat(60));
  console.log('\n✨ Mise à jour terminée avec succès !');
}

main().catch(console.error);
