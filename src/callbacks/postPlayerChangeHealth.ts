import { HealthType, ModCallbackCustom, ModUpgraded } from "isaacscript-common";
import * as darkChocolate from "../items/darkChocolate";

export function init(mod: ModUpgraded): void {
  mod.AddCallbackCustom(ModCallbackCustom.POST_PLAYER_CHANGE_HEALTH, main);
}

function main(player: EntityPlayer, healthType: HealthType, difference: int) {
  darkChocolate.postPlayerChangeHealth(player, healthType, difference);
}
