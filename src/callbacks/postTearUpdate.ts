import * as droppedIceCream from "../items/droppedIceCream";

export function main(tear: EntityTear): void {
  if (tear.FrameCount === 1) {
    const tearParent = tear.SpawnerEntity;
    if (
      tearParent !== undefined &&
      tearParent.Type === EntityType.ENTITY_PLAYER
    ) {
      const parentAsPlayer = tearParent.ToPlayer();
      if (parentAsPlayer !== undefined) {
        droppedIceCream.checkHasItem(tear, parentAsPlayer);
      }
    }
  }
}
