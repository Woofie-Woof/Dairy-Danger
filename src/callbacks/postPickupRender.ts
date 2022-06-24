import { ModCallback, PickupVariant } from "isaac-typescript-definitions";
import { HeartSubTypeCustom } from "../enums/HeartSubTypeCustom";

export function init(mod: Mod): void {
  mod.AddCallback(
    ModCallback.POST_PICKUP_RENDER,
    heartCallback,
    PickupVariant.HEART, // 10
  );
}

// PickupVariant.HEART (10)
function heartCallback(pickup: EntityPickup, _offset: Vector) {
  const heart = pickup as EntityPickupHeart;

  if (heart.SubType === HeartSubTypeCustom.HALF_BLACK) {
    halfBlack(heart);
  }
}

// HeartSubTypeCustom.HALF_BLACK
function halfBlack(heart: EntityPickupHeart) {
  const sprite = heart.GetSprite();
  if (sprite.IsFinished("Collect")) {
    heart.Remove();
  }
}
