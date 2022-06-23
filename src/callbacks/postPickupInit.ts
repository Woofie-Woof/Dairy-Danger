import * as darkChocolate from "../items/darkChocolate";

// PickupVariant.HEART (10)
export function heart(pickup: EntityPickupHeart): void {
  darkChocolate.postPickupInitHeart(pickup);
}
