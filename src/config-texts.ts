import * as fs from 'fs/promises'
import iconv from 'iconv-lite'
import json2xml from 'json2xml'
import { addonId, objectEntries } from './util'

type JsonTextStructure = { string_table: { string: { text: string }; attrs: { id: string } }[] }

const configTexts = {
  eng: {
    title: 'Healing campfires',
    hp_restore_mlt: 'Health restoration speed',
    must_be_lit: 'Campfire must be lit',
  },
  rus: {
    title: 'Оздоровительные костры',
    hp_restore_mlt: 'Скорость восстановления здоровья',
    must_be_lit: 'Костер должен гореть',
  },
} as const satisfies ConfigTexts

export async function buildConfigTexts() {
  for (const lang in configTexts) {
    const json: JsonTextStructure = {
      string_table: [
        { string: { text: configTexts[lang as keyof typeof configTexts].title }, attrs: { id: `ui_mcm_menu_${addonId}` } },
        ...objectEntries(configTexts[lang as keyof typeof configTexts]).map(([prop, value]) => {
          const id = `ui_mcm_${addonId}_${prop}`
          return { string: { text: value }, attrs: { id } }
        }),
      ],
    } satisfies JsonTextStructure
    let xml: string | Buffer = json2xml(json, { attributes_key: 'attrs' })
    const dirPath = process.cwd() + `/build/gamedata/configs/text/${lang}`
    const filePath = dirPath + `/ui_${addonId}_mcm.xml`
    if (await fs.exists(filePath)) {
      await fs.rm(filePath)
    }
    await fs.writeFile(filePath, iconv.encode(xml, 'win1251'))
  }
}
