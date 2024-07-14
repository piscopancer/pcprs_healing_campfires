import fs from 'fs/promises'
import * as tstl from 'typescript-to-lua'
import { addonId } from './src/util'

const mo2AddonName = 'build'

export async function transpile() {
  tstl.transpileProject(
    'tsconfig.json',
    {
      luaLibImport: tstl.LuaLibImportKind.Inline,
      extension: '.script',
    },
    async (name, text) => {
      if (name.endsWith('main.script')) {
        await fs.writeFile(process.cwd() + `/build/gamedata/scripts/${addonId}.script`, correctLua(text))
        // await fs.writeFile(activeAddonScriptsPath + `/${addonId}.script`, correctLua(text))
      } else if (name.endsWith('mcm.script')) {
        await fs.writeFile(process.cwd() + `/build/gamedata/scripts/${addonId}_mcm.script`, correctLua(text))
        // await fs.writeFile(activeAddonScriptsPath + `/${addonId}_mcm.script`, correctLua(text))
      }
    }
  )
}

function correctLua(lua: string) {
  lua = globalizeFuncsVars(lua)
  lua = removeExports(lua)
  return lua
}

function globalizeFuncsVars(lua: string) {
  // const globalFunctions = ['on_mcm_load', 'on_game_start'] as const satisfies string[]
  // for (const func of globalFunctions) {
  //   lua = lua.replaceAll(`local function ${func}`, `function ${func}`)
  // }

  return lua.replaceAll(/\nlocal\s/g, '\n')
}

function removeExports(lua: string) {
  return (
    lua
      // Replace instances of "____exports.ANYTHING = function(" with "function ANYTHING("
      .replace(/____exports\.(\w+)\s*=\s*function\s*\(/g, 'function $1(')
      .replace(/____exports\./g, '')
      .replace(/local ____exports\s*=\s*{\s*}/, '')
      .replace(/return ____exports/, '')
  )
}

async function updateAddonInMo2() {
  try {
    const mo2Folder = `C:/Users/Igor/AppData/Local/ModOrganizer/STALKER Anomaly/mods/${mo2AddonName}/gamedata`
    await fs.rm(mo2Folder, { recursive: true, force: true })
    console.log(`Папка ${mo2Folder} успешно удалена.`)
    const sourceFolder = `C:/dev/other/stalker/${addonId}/build/gamedata`
    await fs.mkdir(mo2Folder, { recursive: true })
    await fs.cp(sourceFolder, mo2Folder, { recursive: true })
    console.log(`Папка ${sourceFolder} успешно скопирована в ${mo2Folder}.`)
  } catch (error) {
    console.error('Произошла ошибка:', error)
  }
}
