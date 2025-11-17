#!/usr/bin/env node
import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const ASSETS_DIR = join(__dirname, '../src/assets');
const QUALITY_LOSSY = 85; // Qualité pour photos/mockups
const QUALITY_LOSSLESS = 100; // Qualité pour logos/icônes

// Liste des dossiers contenant des logos (lossless)
const LOSSLESS_FOLDERS = ['software', 'autre/cursor'];

// Extensions supportées
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg'];

// Stats
let stats = {
  converted: 0,
  skipped: 0,
  failed: 0,
  totalSizeBefore: 0,
  totalSizeAfter: 0
};

/**
 * Détermine si le fichier doit être converti en lossless
 */
function shouldUseLossless(filePath) {
  return LOSSLESS_FOLDERS.some(folder => filePath.includes(folder)) ||
         filePath.includes('logo') ||
         filePath.includes('icon');
}

/**
 * Convertit une image en WebP
 */
async function convertToWebP(inputPath, outputPath, isLossless = false) {
  try {
    const inputStats = await stat(inputPath);
    const sizeBefore = inputStats.size;

    await sharp(inputPath)
      .webp({
        quality: isLossless ? QUALITY_LOSSLESS : QUALITY_LOSSY,
        lossless: isLossless,
        effort: 6 // Compression maximale (0-6)
      })
      .toFile(outputPath);

    const outputStats = await stat(outputPath);
    const sizeAfter = outputStats.size;

    stats.totalSizeBefore += sizeBefore;
    stats.totalSizeAfter += sizeAfter;
    stats.converted++;

    const reduction = ((1 - sizeAfter / sizeBefore) * 100).toFixed(1);
    const mode = isLossless ? '🎨 Lossless' : '📸 Lossy';

    console.log(`✅ ${mode} ${basename(inputPath)} → ${basename(outputPath)}`);
    console.log(`   ${formatSize(sizeBefore)} → ${formatSize(sizeAfter)} (-${reduction}%)`);

    return true;
  } catch (error) {
    console.error(`❌ Erreur: ${basename(inputPath)} - ${error.message}`);
    stats.failed++;
    return false;
  }
}

/**
 * Formate la taille en octets de manière lisible
 */
function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Parcourt récursivement un dossier et convertit les images
 */
async function processDirectory(dir) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        await processDirectory(fullPath);
      } else if (entry.isFile()) {
        const ext = extname(entry.name).toLowerCase();

        if (IMAGE_EXTENSIONS.includes(ext)) {
          const outputPath = fullPath.replace(ext, '.webp');
          const isLossless = shouldUseLossless(fullPath);

          // Vérifier si le WebP existe déjà
          try {
            await stat(outputPath);
            console.log(`⏭️  Existe déjà: ${basename(outputPath)}`);
            stats.skipped++;
          } catch {
            // Le fichier n'existe pas, on le convertit
            await convertToWebP(fullPath, outputPath, isLossless);
          }
        }
      }
    }
  } catch (error) {
    console.error(`❌ Erreur lors du parcours de ${dir}: ${error.message}`);
  }
}

/**
 * Point d'entrée principal
 */
async function main() {
  console.log('🚀 Conversion des images en WebP...\n');
  console.log(`📁 Dossier: ${ASSETS_DIR}`);
  console.log(`📸 Qualité Lossy: ${QUALITY_LOSSY}%`);
  console.log(`🎨 Qualité Lossless: ${QUALITY_LOSSLESS}%\n`);

  const startTime = Date.now();
  await processDirectory(ASSETS_DIR);
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log('\n' + '='.repeat(60));
  console.log('📊 RÉSULTATS:');
  console.log('='.repeat(60));
  console.log(`✅ Converties:    ${stats.converted}`);
  console.log(`⏭️  Ignorées:      ${stats.skipped}`);
  console.log(`❌ Échecs:        ${stats.failed}`);
  console.log(`⏱️  Durée:         ${duration}s`);
  console.log('');
  console.log(`📦 Taille avant:  ${formatSize(stats.totalSizeBefore)}`);
  console.log(`📦 Taille après:  ${formatSize(stats.totalSizeAfter)}`);

  const totalReduction = ((1 - stats.totalSizeAfter / stats.totalSizeBefore) * 100).toFixed(1);
  console.log(`💾 Économie:      ${formatSize(stats.totalSizeBefore - stats.totalSizeAfter)} (-${totalReduction}%)`);
  console.log('='.repeat(60));
  console.log('\n✨ Conversion terminée avec succès !');
}

main().catch(console.error);
