import { ModCallback, PickupVariant } from "isaac-typescript-definitions";
import * as darkChocolate from "../items/darkChocolate";

export function init(mod: Mod): void {
  mod.AddCallback(
    ModCallback.POST_PICKUP_INIT,
    heartCallback,
    PickupVariant.HEART, // 10
  );
}

// PickupVariant.HEART (10)
function heartCallback(pickup: EntityPickup) {
  const heart = pickup as EntityPickupHeart;

  darkChocolate.postPickupInitHeart(heart);
}
