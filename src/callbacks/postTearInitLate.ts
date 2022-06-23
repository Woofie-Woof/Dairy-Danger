import * as droppedIceCream from "../items/droppedIceCream";

export function main(tear: EntityTear): void {
  droppedIceCream.postTearInitLate(tear);
}
