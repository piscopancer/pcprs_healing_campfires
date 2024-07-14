enum Values {
  String = 0,
  Boolean = 1,
  Float = 2,
}

type Content = [number, string][]

const options = {
  track: (props: { id: ConfigProperty; text: ConfigTextId; def: number; min: number; max: number; step: number }) => ({
    type: 'track',
    val: Values.Float,
    ...props,
  }),
  check: (props: { id: ConfigProperty; def: boolean; text: ConfigTextId }) => ({
    type: 'check',
    val: Values.Boolean,
    ...props,
  }),
  // list: () => ({}),
  // input: () => ({}),
  // radio_h: () => ({}),
  // radio_v: () => ({}),
  // key_bind: () => ({}),

  title: (props: { id: ConfigProperty; text: ConfigTextId; align: 'l' | 'c' | 'r' }) => ({
    type: 'title',
    ...props,
  }),
  description: () => ({}),
  line: {
    type: 'line',
  },
  // image: () => ({}),
  slide: (props: { id: ConfigProperty; text: ConfigTextId; size: [number, number]; spacing: number; link: string }) => ({
    type: 'slide',
    ...props,
  }),
}

type McmOption = (typeof options)[keyof typeof options]

type McmOptionTree = {
  id: string
  sh: boolean
  gr: McmOption[]
}

const addonId: AddonId = 'pcprs_healing_campfires'

const defaultConfig = {
  hp_restore_mlt: 1,
  must_be_lit: true,
  distance_to_campfire: 15,
} satisfies typeof pcprs_healing_campfires_mcm.defaultConfig

function on_mcm_load(this: void): McmOptionTree {
  return {
    id: addonId,
    sh: true,
    gr: [
      options.slide({
        id: 'slide',
        text: 'ui_mcm_pcprs_healing_campfires_slide',
        link: 'ui_options_slider_weather_clear',
        size: [512, 50],
        spacing: 20,
      }),
      options.check({
        id: 'must_be_lit',
        def: defaultConfig.must_be_lit,
        text: 'ui_mcm_pcprs_healing_campfires_must_be_lit',
      }),
      options.track({
        id: 'hp_restore_mlt',
        text: 'ui_mcm_pcprs_healing_campfires_hp_restore_mlt',
        min: 0.5,
        max: 1.5,
        def: defaultConfig.hp_restore_mlt,
        step: 0.1,
      }),
      options.track({
        id: 'distance_to_campfire',
        text: 'ui_mcm_pcprs_healing_campfires_distance_to_campfire',
        min: 10,
        max: 20,
        def: defaultConfig.distance_to_campfire,
        step: 1,
      }),
    ],
  }
}
