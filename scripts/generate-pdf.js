import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createSlidesPDFBuffer } from '../lib/pdf.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const buffer = await createSlidesPDFBuffer();
  const outputPath = path.resolve(__dirname, '..', 'public', 'english-literature-benefits.pdf');
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, buffer);
  console.log(`PDF created at ${outputPath}`);
}

main().catch((error) => {
  console.error('Failed to generate PDF:', error);
  process.exit(1);
});
