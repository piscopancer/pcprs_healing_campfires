![](https://i.playground.ru/p/nWP0ummTaaVgV5-kqb7Wbg.png)

# Piscopancer's Healing Campfires

Piscopancer's Healing Campfires is an addon for a game S.T.A.L.K.E.R. Anomaly 1.5.2. Standing near lit campfires warms body and treats wounds, causing character's health to restore. The fashion in which health is restored can be configured via [MCM](https://www.moddb.com/mods/stalker-anomaly/addons/anomaly-mod-configuration-menu).

# Project

This addon is a demonstration of the [anomaly-packer](https://www.npmjs.com/package/anomaly-packer) package. Earlier it carried a hand-written copy of the transpilation and text-generation logic; now that logic lives in the package, and the addon only contains its own content. Building is a single call to `pack()` in [pack.ts](pack.ts), which transpiles the scripts, generates the text files, and refreshes the addon inside Mod Organizer 2.

## Preparation

1. `pnpm install`,
2. `pnpm run build`,
3. Archive the `build` folder and treat it as an addon.

## Layout

The `gamedata` directory mirrors the game's own structure and is the source `pack()` reads.

- `gamedata/scripts/*.ts` are transpiled to flat global `.script` files. Each registered script is listed in `pack.ts`. These files are transpiled as modules but cannot meaningfully `import`/`export` between each other — the engine loads every `.script` as a global table, so cross-script data is reached through a global (see `pcprs_healing_campfires_mcm.defaultConfig` used from the main script).
- `gamedata/configs/text/{eng,rus}/*.ts` each default-export a function that returns the XML for one text file, built with the package's `translations()` helper. The shared, strongly-typed translation data lives in [texts.ts](texts.ts), where `eng` is the source of truth and `rus` is forced to mirror its keys.

## Types

Game globals (`db`, `bind_campfire`, `ui_mcm`, `RegisterScriptCallback`, …) come from the package and are wired into the scripts through triple-slash references in [gamedata/scripts/env.d.ts](gamedata/scripts/env.d.ts):

```ts
/// <reference types="anomaly-packer/types/game/db" />
```

The same file augments the package's empty `McmConfig` interface with this addon's config keys and declares the sibling-script global `pcprs_healing_campfires_mcm`.
