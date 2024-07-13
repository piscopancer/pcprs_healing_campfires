export const addonId: AddonId = 'pcprs_healing_campfires'

export function objectEntries<O extends object>(obj?: O) {
  return Object.entries(obj ?? {}) as [keyof O, O[keyof O]][]
}
