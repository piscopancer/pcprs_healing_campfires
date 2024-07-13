import fs from 'fs/promises'
import * as tstl from 'typescript-to-lua'
import { addonId } from './src/util'

const activeAddonName = 'build'
const activeAddonScriptsPath = `C:/Users/Igor/AppData/Local/ModOrganizer/STALKER Anomaly/mods/${activeAddonName}/gamedata/scripts`

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
        await fs.writeFile(activeAddonScriptsPath + `/${addonId}.script`, correctLua(text))
      } else if (name.endsWith('mcm.script')) {
        await fs.writeFile(process.cwd() + `/build/gamedata/scripts/${addonId}_mcm.script`, correctLua(text))
        await fs.writeFile(activeAddonScriptsPath + `/${addonId}_mcm.script`, correctLua(text))
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
