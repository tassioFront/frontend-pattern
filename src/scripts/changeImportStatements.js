const fs = require('fs').promises
const path = require('path')

//---------------------PARAMETERS---------------------
const directory = 'apps/web-customer/src' // define the initial directory to start the search
const importMappings = {
  // import name (here, theme and Icon are examples of import name). Change it as you need
  theme: {
    fromPath: '@my-path/one',
    toPath: '@my-path/one/src/styles/theme',
  },
  Icon: {
    fromPath: '@my-path/two',
    toPath: '@my-path/two/src/components-material/DSIcon',
  },
}
const fileFormats = ['.ts', '.vue'] // define the file formats to search for
//---------------------PARAMETERS---------------------

const directoryPath = path.join(__dirname, directory)

async function readFilesRecursively(dir) {
  const dirs = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    dirs.map((dirent) => {
      const res = path.resolve(dir, dirent.name)
      return dirent.isDirectory() ? readFilesRecursively(res) : res
    })
  )
  return Array.prototype.concat(...files)
}

async function updateImportStatements(filePath, mappings) {
  try {
    let data = await fs.readFile(filePath, 'utf8')

    Object.entries(mappings).forEach(([importName, path]) => {
      const importRegex = new RegExp(
        `import {(.*?\\b${importName}\\b[^}]*)} from '${path.fromPath}'`,
        'g'
      )
      data = data.replace(importRegex, (match, matchedImports) => {
        const importsToKeep = matchedImports
          .split(',')
          .filter((importItem) => !importItem.includes(importName))
          .join(',')
          .trim()
        const newImportStatement = `import ${importName} from '${path.toPath}'`

        return importsToKeep
          ? `import { ${importsToKeep} } from '${path.fromPath}'\n${newImportStatement}`
          : newImportStatement
      })
    })

    await fs.writeFile(filePath, data, 'utf8')
    console.log(`Updated imports in ${filePath}`)
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err)
  }
}

async function main() {
  try {
    const files = await readFilesRecursively(directoryPath)
    files.forEach((file) => {
      if (fileFormats.includes(file.slice(file.lastIndexOf('.')))) {
        updateImportStatements(file, importMappings)
      }
    })
  } catch (err) {
    console.error('Error:', err)
  }
}

main()
