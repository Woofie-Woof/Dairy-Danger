import { HeartSubTypeCustom } from "../constants";

export function main(pickup: EntityPickup, _offset: Vector): void {
  if (pickup.SubType === HeartSubTypeCustom.HALF_BLACK) {
    const sprite = pickup.GetSprite();
    if (sprite.IsFinished("Collect")) {
      pickup.Remove();
    }
  }
}
