import { pack } from "anomaly-packer"

const addonId = "pcprs_healing_campfires"

await pack({
  addonId,
  scripts: ["index", "mcm"],
})
