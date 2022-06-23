import { ModCallback, PickupVariant } from "isaac-typescript-definitions";
import * as darkChocolate from "../items/darkChocolate";

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_PICKUP_INIT, heart, PickupVariant.HEART); // 34
}

// PickupVariant.HEART (10)
function heart(pickup: EntityPickupHeart) {
  darkChocolate.postPickupInitHeart(pickup);
}
