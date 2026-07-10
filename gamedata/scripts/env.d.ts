/// <reference types="anomaly-packer/types/game/__base" />
/// <reference types="anomaly-packer/types/game/_g" />
/// <reference types="anomaly-packer/types/game/db" />
/// <reference types="anomaly-packer/types/game/bind_campfire" />
/// <reference types="anomaly-packer/types/addons/mcm" />
/// <reference types="anomaly-packer/types/addons/mcm-builder" />

declare type AddonId = 'pcprs_healing_campfires'

/** Augments the empty `McmConfig` from anomaly-packer's mcm types so `ui_mcm.get('pcprs_healing_campfires/...')` is fully typed. */
interface McmConfig {
  hp_restore_mlt: number
  must_be_lit: boolean
  distance_to_campfire: number
}

/** Globals exported by the sibling pcprs_healing_campfires_mcm.script. */
declare namespace pcprs_healing_campfires_mcm {
  const defaultConfig: McmConfig
}
