import * as fs from 'fs/promises'
import iconv from 'iconv-lite'
import json2xml from 'json2xml'
import { addonId, objectEntries } from './util'

function color(color: Color) {
  return `%c[${color}]`
}

type JsonTextStructure = { string_table: { string: { text: string }; attrs: { id: string } }[] }

const mcmTexts = {
  eng: {
    title: 'Healing campfires',
    slide: 'Healing campfires',
    must_be_lit: 'Campfire must be lit',
    must_be_lit_desc: 'No matches?',
    hp_restore_mlt: 'Health restoration speed',
    hp_restore_mlt_desc: `Full healing takes several minutes on lowest, takes about a minute on highest`,
    distance_to_campfire: "Campfire's effective distance",
    distance_to_campfire_desc: 'Have to be no further than a step away on lowest, several meters away on highest ',
  },
  rus: {
    title: 'Оздоров. костры',
    slide: 'Оздоровительные костры',
    must_be_lit: 'Костер должен гореть',
    must_be_lit_desc: 'Нет спичек?',
    hp_restore_mlt: 'Скорость восстановления здоровья',
    hp_restore_mlt_desc: 'При самом низком значении полное  восстановление здоровья занимает несколько минут, на самом высоком - около минуты',
    distance_to_campfire: 'Дальность действия костра',
    distance_to_campfire_desc: 'При самом низком значении нужно быть у костра на расстоянии вытянутой руки, на самом высоком - можно стоять и на расстоянии в несколько метров',
  },
} as const satisfies McmTexts & Texts<['title']>

const addonTexts = {
  eng: {
    chat_message: `
I fucking love ${color('d_cyan')}rusks${color('default')}
\\n \\n \\nYeah :]`,
  },
  rus: {
    chat_message: `
Бля как же я люблю ${color('d_cyan')}сухарики${color('default')}
\\n \\n \\naye :)`,
  },
} as const satisfies AddonTexts

async function createTextFiles<T extends Texts>(texts: T, filename: string, defaultId: (prop: string) => string, idOverrides?: Partial<Record<keyof T[keyof T], (prop: string) => string>>) {
  for (const lang in texts) {
    const json: JsonTextStructure = {
      string_table: [
        ...objectEntries(texts[lang as keyof Texts]).map(([prop, value]) => {
          const id = idOverrides && prop in idOverrides ? (idOverrides as any)[prop]() : defaultId(prop)
          return { string: { text: value }, attrs: { id } }
        }),
      ],
    } satisfies JsonTextStructure
    let xml: string | Buffer = json2xml(json, { attributes_key: 'attrs' })
    const filePath = process.cwd() + `/build/gamedata/configs/text/${lang}/` + filename
    await fs.rm(filePath, { force: true })
    await fs.writeFile(filePath, iconv.encode(xml, 'win1251'))
  }
}

export async function createAllTextFiles() {
  return Promise.all([
    await createTextFiles(mcmTexts, `ui_${addonId}_mcm.xml`, (prop) => `ui_mcm_${addonId}_${prop}`, {
      title: () => `ui_mcm_menu_${addonId}`,
    }),
    await createTextFiles(addonTexts, `ui_${addonId}.xml`, (prop) => `${addonId}_${prop}`),
  ])
}
