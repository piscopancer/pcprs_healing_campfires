import c from 'chalk'
import fs from 'fs/promises'
import { createAllTextFiles } from './src/texts'
import { addonId } from './src/util'
import { transpile } from './ts-to-lua'

const mo2AddonName = 'build'

async function updateAddonInMo2() {
  try {
    const mo2Folder = `C:/Users/Igor/AppData/Local/ModOrganizer/STALKER Anomaly/mods/${mo2AddonName}/gamedata`
    await fs.rm(mo2Folder, { recursive: true, force: true })
    const sourceFolder = `C:/dev/other/stalker/${addonId}/build/gamedata`
    await fs.mkdir(mo2Folder, { recursive: true })
    await fs.cp(sourceFolder, mo2Folder, { recursive: true })
  } catch (error) {
    console.error('Error', error)
  }
}

await transpile()
console.log(c.green('\nTS to Lua transpiled'))
await createAllTextFiles()
console.log(c.green('Text files were created'))
await updateAddonInMo2()
console.log(c.cyan('Addon has been updated in MO2\n'))
