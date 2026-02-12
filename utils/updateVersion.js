import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtém o diretório do arquivo atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename).replace('/utils', '');

const packageJsonPath = path.join(__dirname, 'package.json'); // Substitua pelo caminho do seu package.json

// Função para atualizar a versão no package.json
function updateVersion(newVersion) {
    fs.readFile(packageJsonPath, 'utf8', (err, data) => {
        if (err) {
            return console.error('Error reading package.json:', err);
        }

        let packageJson;
        try {
            packageJson = JSON.parse(data);
        } catch (parseErr) {
            return console.error('Error parsing package.json:', parseErr);
        }

        const currentVersion = packageJson.version || '0.0.0';
        const [major, minor, patch] = currentVersion.split('.').map(Number);

        if (newVersion) {
            packageJson.version = newVersion;
        } else {
            packageJson.version = `${major}.${minor}.${patch + 1}`;
        }

        fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8', writeErr => {
            if (writeErr) {
                return console.error('Error writing package.json:', writeErr);
            }
            console.log(`Version updated to ${packageJson.version}`);
        });
    });
}

const newVersion = process.argv[2] || ''; // Permite especificar a nova versão via argumento de linha de comando
updateVersion(newVersion);