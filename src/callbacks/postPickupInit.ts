import * as darkChocolate from "../items/darkChocolate";

export function main(pickup: EntityPickup): void {
  darkChocolate.checkHasItem(pickup);
}
