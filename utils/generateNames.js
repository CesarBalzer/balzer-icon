import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtém o diretório do arquivo atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename).replace('/utils', '');

const directoryPath = path.join(__dirname, 'lib/svg'); // Substitua pelo caminho da sua pasta
const indexFilePath = path.join(__dirname, 'lib/svg/index.ts'); // Substitua pelo caminho do arquivo de saída

// Função para converter nomes de arquivos para camel case
function toCamelCase(str) {
  return str
    .replace(/[-_](.)/g, (_, group1) => group1.toUpperCase())
    .replace(/^(.)/, (_, group1) => group1.toLowerCase());
}

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.error('Unable to scan directory: ' + err);
  }

  const imports = [];
  const exports = [];

  files.forEach(file => {
    if (path.extname(file) === '.svg') {
      const name = path.basename(file, '.svg');
      const camelCaseName = toCamelCase(name);
      const importStatement = `import ${camelCaseName.charAt(0).toUpperCase() + camelCaseName.slice(1)} from "./${file}?react";`;
      const exportStatement = `  '${name}': ${camelCaseName.charAt(0).toUpperCase() + camelCaseName.slice(1)}`;

      imports.push(importStatement);
      exports.push(exportStatement);
    }
  });

  const indexContent = `
/// <reference types="vite-plugin-svgr/client" />
${imports.join('\n')}

export default {
  ${exports.join(',\n')}
};
`;

  fs.writeFile(indexFilePath, indexContent.trim(), err => {
    if (err) {
      return console.error('Error writing file: ' + err);
    }
    console.log('Index file created successfully!');
  });
});
