const config = ui_mcm
  ? ({
      hp_restore_mlt: ui_mcm.get('pcprs_healing_campfires/hp_restore_mlt'),
      must_be_lit: ui_mcm.get('pcprs_healing_campfires/must_be_lit'),
      distance_to_campfire: ui_mcm.get('pcprs_healing_campfires/distance_to_campfire'),
    } satisfies McmConfig)
  : { ...pcprs_healing_campfires_mcm.defaultConfig }
const baseRegen = 0.0003

function suitable_campfire_nearby(this: void, distance: number): boolean {
  const pos = db.actor.position()
  for (const [, binder] of Object.entries(bind_campfire.campfires_all)) {
    if (!binder || !binder.campfire) {
      return false
    }
    if (config.must_be_lit && binder.campfire.is_on()) {
      if (pos.distance_to_sqr(binder.object.position()) <= distance) {
        return true
      }
    }
  }
  return false
}

function actor_on_update(this: void) {
  if (!db.actor) {
    return
  }
  if (suitable_campfire_nearby(config.distance_to_campfire)) {
    db.actor.change_health(baseRegen * config.hp_restore_mlt)
    // printf('healing, current health: [%s] | (mcm) heal: [%s] | def_conf_hp: %s', db.actor.health, config.hp_restore_mlt, pcprs_healing_campfires_mcm.defaultConfig.hp_restore_mlt)
  }
}

function on_option_change(this: void) {
  if (ui_mcm) {
    config.hp_restore_mlt = ui_mcm.get('pcprs_healing_campfires/hp_restore_mlt')
    config.must_be_lit = ui_mcm.get('pcprs_healing_campfires/must_be_lit')
    config.distance_to_campfire = ui_mcm.get('pcprs_healing_campfires/distance_to_campfire')
  }
}

function on_game_start(this: void) {
  RegisterScriptCallback('actor_on_update', actor_on_update)
  RegisterScriptCallback('on_option_change', on_option_change)
}
