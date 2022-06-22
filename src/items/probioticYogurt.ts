import { spawnGridWithVariant } from "isaacscript-common";
import { CollectibleTypeCustom } from "../constants";

if (EID !== undefined) {
  const itemDescription =
    "Spawns poop when you clear a room#Poop type depends on room cleared:#{{Room}}: Normal#{{Shop}}: Golden#{{AngelRoom}}: Holy#{{DevilRoom}}/{{CursedRoom}}: Black#{{BossRoom}}: Rainbow";
  EID.addCollectible(
    CollectibleTypeCustom.COLLECTIBLE_PROBIOTIC_YOGURT,
    itemDescription,
  );
}

export function checkHasItem(): void {
  const game = Game();
  const numPlayers = game.GetNumPlayers();
  for (let i = 0; i < numPlayers; i++) {
    const player = Isaac.GetPlayer(i);
    if (
      player !== undefined &&
      player.HasCollectible(CollectibleTypeCustom.COLLECTIBLE_PROBIOTIC_YOGURT)
    ) {
      applyEffect(player);
    }
  }
}

function applyEffect(player: EntityPlayer) {
  const game = Game();
  const room = game.GetRoom();
  const playerPos = player.Position;

  const entityTypes: Map<RoomType, number> = new Map<RoomType, number>([
    [RoomType.ROOM_CURSE, PoopGridEntityVariant.BLACK],
    [RoomType.ROOM_DEVIL, PoopGridEntityVariant.BLACK],
    [RoomType.ROOM_BOSS, PoopGridEntityVariant.RAINBOW],
    [RoomType.ROOM_ANGEL, PoopGridEntityVariant.WHITE],
    [RoomType.ROOM_SHOP, PoopGridEntityVariant.GOLDEN],
  ]);

  const roomType = room.GetType();
  let poopVariant = entityTypes.get(roomType);

  if (poopVariant === undefined) {
    poopVariant = PoopGridEntityVariant.NORMAL;
  }

  spawnGridWithVariant(
    GridEntityType.GRID_POOP,
    poopVariant,
    room.GetGridIndex(playerPos),
  );

  SFXManager().Play(SoundEffect.SOUND_FART);
}
