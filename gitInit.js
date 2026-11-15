// gitInit.js
import git from 'isomorphic-git';
import fs from 'fs';
import path from 'path';

async function initRepo() {
  const dir = process.cwd();
  console.log('Initializing Git repo at', dir);

  await git.init({ fs, dir, defaultBranch: 'main' });
  console.log('Git repo initialized with branch main.');

  // Lecture des fichiers du projet
  function getFiles(currentDir, baseDir = '') {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    let files = [];
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      const relPath = path.join(baseDir, entry.name).replace(/\\/g, '/');

      if (
        relPath.startsWith('node_modules') ||
        relPath.startsWith('.git') ||
        relPath.startsWith('dist') ||
        relPath === 'cloudflared.exe' ||
        relPath === 'mingit.zip'
      ) {
        continue;
      }

      if (entry.isDirectory()) {
        files = files.concat(getFiles(fullPath, relPath));
      } else {
        files.push(relPath);
      }
    }
    return files;
  }

  const filesToAdd = getFiles(dir);
  console.log(`Adding ${filesToAdd.length} files to Git...`);

  for (const filepath of filesToAdd) {
    await git.add({ fs, dir, filepath });
  }

  const sha = await git.commit({
    fs,
    dir,
    author: {
      name: 'Dammak and Louay',
      email: 'presentation@lamaisonintelligente.local',
    },
    message: 'feat: interactive French A2 classroom presentation - La Maison Intelligente'
  });

  console.log('Initial commit created successfully! SHA:', sha);
}

initRepo().catch(console.error);
