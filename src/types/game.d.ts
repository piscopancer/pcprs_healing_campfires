declare type GameEvents = {
  load_state: (this: void) => void
  save_state: (this: void) => void
  on_before_save_input: (this: void) => void
  actor_on_update: (this: void) => void
  actor_on_jump: (this: void) => void
  actor_on_first_update: (this: void) => void
  on_option_change: (this: void) => void
  GUI_on_show: (this: void, name: string, path: string) => void
  on_key_press: (this: void, key: number) => void
  on_key_release: (this: void, key: number) => void
}
declare function RegisterScriptCallback<E extends keyof GameEvents>(this: void, event: E, cb: GameEvents[E]): void
declare function UnregisterScriptCallback<E extends keyof GameEvents>(this: void, event: E, cb: GameEvents[E]): void
declare function SendScriptCallback<E extends keyof GameEvents>(this: void, event: E, ...args: Parameters<GameEvents[E]>): void
declare function CreateTimeEvent(ev_id: number, act_id: string, timer: number, cb: () => void, ...args: any[]): void
declare function printf(this: void, ...items: any[]): void
declare function strformat(str: string, ...items: any[]): string
declare function exec_console_cmd(cmd: string): void
declare function Frect(this: void): {
  set(x: number, y: number, w: number, h: number): any
}
declare type GameObject = {
  id: string
  position(): any
  section(): any
}
declare type Binder = {
  object: GameObject
}

// modules

declare var DIK_keys: Record<`DIK_${string}`, number>
declare var game: {
  translate_string(this: void, id: `${AddonId}_${keyof AddonTexts['eng']}`): string
}
declare var level: {
  add_pp_effector(name: string, _0: number, _1: boolean): void
  map_remove_object_spot(this: void, id: string, ...args: string[]): void
  map_add_object_spot(this: void, id: string, ...args: string[]): void
  get_time_hours(): number
  name(): string
}
declare var level_weathers: {
  get_weather_manager(this: void): {
    get_curr_weather(): any
  }
}
declare var alife_storage_manager: {}
declare var xr_conditions: {
  surge_started(): boolean
}
declare var axr_main: {
  weapon_is_zoomed: boolean
}
declare var xr_sound: {
  get_safe_sound_object(this: void, path: string): any
}
declare var psi_storm_manager: {
  is_started(): boolean
}
declare type Color = 'default' | 'white' | 'green' | 'yellow' | 'red' | 'orange' | `d_${'orange' | 'red' | 'cyan' | 'red' | 'purple' | 'green' | 'blue'}` | 'ui_gray_1' | 'ui_gray_2' | `pda_${'green' | 'blue' | 'yellow' | 'white'}`
declare var utils_xml: {
  get_color(color: Color, to_code?: boolean): string
}
declare var db: {
  actor: {
    object(id: string): GameObject
    alive(): boolean
    health: number
    change_health(by: number): void
    radiation: number
    bleeding: number
    psy_health: number
    position(): {
      distance_to_sqr(...arg: any[]): any
    }
    active_item(): any
    active_detector(): any
    active_slot(): number
    item_in_slot(slot: number): any
    give_game_news(title: string, message: string, icon_ath: string, delay_ms: number, duration: number): void
    money(): number
    give_money(sum: number): void
    give_info_portion(portion: string): void
  }
}
declare var dialogs: {
  relocate_money_from_actor(first_speaker: any, second_speaker: any, sum: number): void
}
declare var bind_campfire: {
  campfires_all: Record<
    string,
    {
      campfire?: {
        is_on(): boolean
      }
      object: GameObject
    }
  >
}
declare var ranks: {
  get_obj_rank_name(this: void, obj: GameObject): string
}
declare var game_difficulties: {
  get_eco_factor(this: void, factor: 'money_loots'): number
}
