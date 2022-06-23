import { ModCallback, PickupVariant } from "isaac-typescript-definitions";
import { HeartSubTypeCustom } from "../constants";

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_PICKUP_RENDER, heart, PickupVariant.HEART); // 10
}

// PickupVariant.HEART (10)
export function heart(pickup: EntityPickupHeart, _offset: Vector): void {
  if (pickup.SubType === HeartSubTypeCustom.HALF_BLACK) {
    halfBlack(pickup);
  }
}

// HeartSubTypeCustom.HALF_BLACK
function halfBlack(pickup: EntityPickupHeart) {
  const sprite = pickup.GetSprite();
  if (sprite.IsFinished("Collect")) {
    pickup.Remove();
  }
}
