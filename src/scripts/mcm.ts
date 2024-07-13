enum Values {
  String = 0,
  Boolean = 1,
  Float = 2,
}

type Size = [number, number]
type Content = [number, string][]

const options = {
  track: ({ id, def, max, min, step, text }: { id: ConfigTextId; text: ConfigTextText; def: number; min: number; max: number; step: number }) => ({
    type: 'track',
    val: Values.Float,
    id,
    def,
    min,
    max,
    step,
    text,
  }),
  check: ({ id, def, text }: { id: ConfigTextId; def: boolean; text: ConfigTextText }) => ({
    type: 'check',
    val: Values.Boolean,
    id,
    def,
    text,
  }),
  // list: () => ({}),
  // input: () => ({}),
  // radio_h: () => ({}),
  // radio_v: () => ({}),
  // key_bind: () => ({}),

  title: ({ id, align, text }: { id: ConfigTextId; text: ConfigTextText; align: 'l' | 'c' | 'r' }) => ({
    type: 'title',
    id,
    align,
    text,
  }),
  description: () => ({}),
  line: {
    type: 'line',
  },
  // image: () => ({}),
  slide: ({ id, size, spacing, text }: { id: ConfigTextId; text: ConfigTextText; size: [number, number]; spacing: number }) => ({
    type: 'slide',
    val: Values.Boolean,
    id,
    size,
    spacing,
    text,
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
} satisfies typeof pcprs_healing_campfires_mcm.defaultConfig

function on_mcm_load(this: void): McmOptionTree {
  return {
    id: addonId,
    sh: true,
    gr: [
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
    ],
  }
}
