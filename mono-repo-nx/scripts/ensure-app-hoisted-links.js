#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const LINKED_PACKAGES = [
  'react-native-gesture-handler',
  'react-native-safe-area-context',
];

function ensureHoistedModuleLink({ repoRoot, appRoot, packageName, onSkip } = {}) {
  const source = path.join(repoRoot, 'node_modules', packageName);
  const dest = path.join(appRoot, 'node_modules', packageName);

  if (!fs.existsSync(source)) {
    if (onSkip) {
      onSkip(packageName, source);
    }
    return false;
  }

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const expected = path.relative(path.dirname(dest), source);

  try {
    const stat = fs.lstatSync(dest);
    if (stat.isSymbolicLink()) {
      const current = fs.readlinkSync(dest);
      if (current === expected) {
        return false;
      }
      fs.unlinkSync(dest);
    } else {
      return false;
    }
  } catch (_) {
    // destination missing, create it below
  }

  fs.symlinkSync(expected, dest, 'dir');
  return true;
}

function ensureAppHoistedLinks({ repoRoot, appRoot, packages = LINKED_PACKAGES, logPrefix = '' } = {}) {
  const linkedPackages = [];

  for (const packageName of packages) {
    const linked = ensureHoistedModuleLink({
      repoRoot,
      appRoot,
      packageName,
      onSkip: (name, source) => {
        if (logPrefix) {
          console.warn(`${logPrefix}: hoisted package not found, skipping ${name} (${source})`);
        }
      },
    });

    if (linked) {
      linkedPackages.push(packageName);
      if (logPrefix) {
        console.log(`${logPrefix}: linked ${packageName} into app node_modules`);
      }
    }
  }

  return linkedPackages;
}

if (require.main === module) {
  const repoRoot = path.resolve(__dirname, '..');
  const appRoot = path.join(repoRoot, 'apps', 'poliverai');
  ensureAppHoistedLinks({
    repoRoot,
    appRoot,
    logPrefix: 'ensure-app-hoisted-links',
  });
}

module.exports = {
  LINKED_PACKAGES,
  ensureAppHoistedLinks,
  ensureHoistedModuleLink,
};
