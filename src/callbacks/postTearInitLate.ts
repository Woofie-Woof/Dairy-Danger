import { ModCallbackCustom, ModUpgraded } from "isaacscript-common";
import * as droppedIceCream from "../items/droppedIceCream";

export function init(mod: ModUpgraded): void {
  mod.AddCallbackCustom(ModCallbackCustom.POST_TEAR_INIT_LATE, main);
}

export function main(tear: EntityTear): void {
  droppedIceCream.postTearInitLate(tear);
}
