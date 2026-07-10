import { bilingual, color } from 'anomaly-packer'

const addonId = 'pcprs_healing_campfires'

export const mcmTexts = bilingual({
  eng: {
    title: 'Healing campfires',
    slide: 'Healing campfires',
    must_be_lit: 'Campfire must be lit',
    must_be_lit_desc: 'No matches?',
    hp_restore_mlt: 'Health restoration speed',
    hp_restore_mlt_desc: 'Full healing takes several minutes on lowest, takes about a minute on highest',
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
})

export const addonTexts = bilingual({
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
})

/** MCM translation ids: the addon-menu title is special-cased, everything else is prefixed uniformly. */
export function mcmTextId(id: string) {
  return id === 'title' ? `ui_mcm_menu_${addonId}` : `ui_mcm_${addonId}_${id}`
}

/** In-game text ids are the addon id followed by the text key. */
export function addonTextId(id: string) {
  return `${addonId}_${id}`
}
