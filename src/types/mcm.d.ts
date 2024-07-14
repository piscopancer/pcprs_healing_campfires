declare type McmConfig = {
  hp_restore_mlt: number
  must_be_lit: boolean
  distance_to_campfire: number
}
declare type McmTexts = Texts<[keyof McmConfig, `${keyof McmConfig}_desc`, 'slide']>
declare type ConfigTextId = `ui_mcm_${AddonId}_${keyof McmTexts[keyof McmTexts]}`
declare type ConfigProperty = keyof McmTexts[keyof McmTexts]

// modules

declare var ui_mcm:
  | {
      get: <Key extends keyof McmConfig>(this: void, path: `${AddonId}/${Key}`) => McmConfig[Key]
    }
  | undefined

declare var m_data: {}
