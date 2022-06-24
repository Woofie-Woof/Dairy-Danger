import { ItemType } from "isaac-typescript-definitions";
import { ModCallbackCustom, ModUpgraded } from "isaacscript-common";
import { CollectibleTypeCustom } from "../enums/CollectibleTypeCustom";
import * as dc from "../items/darkChocolate";

export function init(mod: ModUpgraded): void {
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ITEM_PICKUP,
    darkChocolate,
    ItemType.PASSIVE,
    CollectibleTypeCustom.DARK_CHOCOLATE,
  );
}

// CollectibleTypeCustom.DARK_CHOCOLATE
function darkChocolate(player: EntityPlayer) {
  dc.applyEffect(player);
}
