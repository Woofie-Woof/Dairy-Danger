import { HealthType, ModCallbackCustom, ModUpgraded } from "isaacscript-common";
import * as darkChocolate from "../items/darkChocolate";

export function init(mod: ModUpgraded): void {
  mod.AddCallbackCustom(ModCallbackCustom.POST_PLAYER_CHANGE_HEALTH, main);
}

export function main(
  player: EntityPlayer,
  healthType: HealthType,
  difference: int,
): void {
  darkChocolate.postPlayerChangeHealth(player, healthType, difference);
}
