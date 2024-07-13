type AddonId = 'pcprs_healing_campfires'

// modules

var pcprs_healing_campfires_mcm: {
  defaultConfig: McmConfig
}

// mcm

type McmConfig = {
  hp_restore_mlt: number
  must_be_lit: boolean
}
type ConfigTexts = Record<
  string,
  Partial<
    Record<keyof McmConfig, string> & {
      title: string
    }
  >
>
type ConfigTextText = `ui_mcm_${AddonId}_${keyof ConfigTexts[string]}`
type ConfigTextId = keyof ConfigTexts[string]
var ui_mcm:
  | {
      get: <Key extends keyof McmConfig>(this: void, path: `${AddonId}/${Key}`) => McmConfig[Key]
    }
  | undefined

var m_data: {}

// stalker

function RegisterScriptCallback(this: void, event: 'actor_on_update' | 'actor_on_jump' | 'on_option_change' | 'actor_on_first_update' | 'save_state' | 'load_state' | 'on_before_save_input', cb: () => void): void
function printf(this: void, ...items: any[]): void
function strformat(str: string, ...items: any[]): string
var game: {
  translate_string: (id: string) => string
}
var level: {
  map_remove_object_spot: (this: void, id: string, ...args: string[]) => void
  map_add_object_spot: (this: void, id: string, ...args: string[]) => void
}
var alife_storage_manager: {}
var xr_conditions: {
  surge_started: () => boolean
}
var psi_storm_manager: {
  is_started: () => boolean
}
var axr_main: {
  weapon_is_zoomed: boolean
}
var utils_xml: {
  get_color: (color: 'd_orange' | 'd_cyan' | 'd_red' | 'd_purple' | 'd_green' | 'ui_gray_1' | 'white') => string
}
var db: {
  actor: {
    alive: () => boolean
    health: number
    change_health: (by: number) => void
    radiation: number
    bleeding: number
    psy_health: number
    position: () => {
      distance_to_sqr: (...arg: any[]) => any
    }
    active_item: () => any
    active_detector: () => any
    give_game_news: (text: string, icon: string, rect: any, SOMETHING: number, duration: number) => void
  }
}
var bind_campfire: {
  campfires_all: Record<
    string,
    {
      campfire?: {
        is_on: () => boolean
      }
      object: GameObject
    }
  >
}
type GameObject = {
  id: string
  position: () => any
}
type Binder = {
  object: GameObject
}
