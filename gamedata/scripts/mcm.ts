import * as mcm from "anomaly-packer/mcm"

const addonId: AddonId = "pcprs_healing_campfires"

const defaultConfig = {
  hp_restore_mlt: 1,
  must_be_lit: true,
  distance_to_campfire: 15,
} satisfies typeof pcprs_healing_campfires_mcm.defaultConfig

function on_mcm_load(this: void): mcm.McmOptionTree {
  return {
    id: addonId,
    sh: true,
    gr: [
      mcm.slide({
        id: "slide",
        text: "ui_mcm_pcprs_healing_campfires_slide",
        link: "ui_options_slider_weather_clear",
        size: [512, 50],
        spacing: 20,
      }),
      mcm.check({
        id: "must_be_lit",
        def: defaultConfig.must_be_lit,
        text: "ui_mcm_pcprs_healing_campfires_must_be_lit",
      }),
      mcm.track({
        id: "hp_restore_mlt",
        text: "ui_mcm_pcprs_healing_campfires_hp_restore_mlt",
        min: 0.5,
        max: 1.5,
        def: defaultConfig.hp_restore_mlt,
        step: 0.1,
      }),
      mcm.track({
        id: "distance_to_campfire",
        text: "ui_mcm_pcprs_healing_campfires_distance_to_campfire",
        min: 10,
        max: 20,
        def: defaultConfig.distance_to_campfire,
        step: 1,
      }),
    ],
  }
}
