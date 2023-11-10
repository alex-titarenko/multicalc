import fs from 'fs'
import path from 'path'

const sourcePath = 'dist/client-app/browser'

const scriptArgs = process.argv.slice(2)
const [destinationPath] = scriptArgs

console.log(`Syncing build output to: ${destinationPath}`)

console.log('Checking if source build is available...')
if (!fs.existsSync(sourcePath)) {
  throw new Error(`The source build at location "${sourcePath}" does not exist!`)
}

console.log('Checking if the destination path exists...')
if (!fs.existsSync(destinationPath)) {
  throw new Error(`The destination path at location "${destinationPath}" does not exist!`)
}

console.log('Clearing the destination folder...')
emptyDirSync(destinationPath)

console.log('Copying the build output to the destination path...')
fs.cpSync(sourcePath, destinationPath, { recursive: true })

console.log('Cleaning up source map files...')
removeAllFilesByExtensionSync(destinationPath, ['.css.map', '.js.map'])

console.log()


/************************************************************ */
// Utilities
/************************************************************ */
function emptyDirSync(dir) {
  const items = fs.readdirSync(dir)

  items.forEach(item => {
    if (item === '.gitkeep') {
      return
    }

    const itemPath = path.join(dir, item)
    fs.rmSync(itemPath, { recursive: true })
  })
}

function removeAllFilesByExtensionSync(dir, ext) {
  const items = fs.readdirSync(dir)

  items.forEach(item => {
    const itemPath = path.join(dir, item)
    const stat = fs.lstatSync(itemPath)

    if (stat.isDirectory()) {
      removeAllFilesByExtensionSync(itemPath, ext)
    } else if (stat.isFile()) {
      if ((typeof ext === 'string' && itemPath.endsWith(ext)) ||
        (Array.isArray(ext) && ext.some(x => itemPath.endsWith(x)))) {
        fs.unlinkSync(itemPath)
      }
    }
  })
}
