declare type AddonId = 'pcprs_healing_campfires'
declare type Languages = 'eng' | 'rus'
declare type Texts<T extends string[] = string[]> = {
  [L in Languages]: {
    [K in T[number]]: string
  }
}
declare type AddonTexts = Texts<['chat_message']>
// modules

declare var pcprs_healing_campfires_mcm: {
  defaultConfig: McmConfig
}
