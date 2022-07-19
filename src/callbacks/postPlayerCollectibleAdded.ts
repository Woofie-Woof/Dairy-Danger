import { CollectibleType } from "isaac-typescript-definitions";
import { log, ModCallbackCustom, ModUpgraded } from "isaacscript-common";
import { MILK_COLLECTIBLE_TYPE_SET } from "../constants";
import * as lactoseIntolerance from "../trinkets/lactoseIntolerance";

export function init(mod: ModUpgraded): void {
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_PLAYER_COLLECTIBLE_ADDED,
    collectibleAdded,
  );
}

function collectibleAdded(player: EntityPlayer, collectible: CollectibleType) {
  log("collectible added");
  if (MILK_COLLECTIBLE_TYPE_SET.has(collectible)) {
    lactoseIntolerance.changeMilkCounter(player, 1);
  }
}
