import {
  GridEntityType,
  PoopGridEntityVariant,
  RoomType,
  SoundEffect,
} from "isaac-typescript-definitions";
import { game, sfxManager, spawnGridWithVariant } from "isaacscript-common";
import { CollectibleTypeCustom } from "../enums/CollectibleTypeCustom";

if (EID !== undefined) {
  const itemDescription =
    "Spawns poop when you clear a room#Poop type depends on room cleared:#{{Room}}: Normal#{{Shop}}: Golden#{{AngelRoom}}: Holy#{{DevilRoom}}/{{CursedRoom}}: Black#{{BossRoom}}: Rainbow";
  EID.addCollectible(CollectibleTypeCustom.PROBIOTIC_YOGURT, itemDescription);
}

export function checkHasItem(): void {
  const numPlayers = game.GetNumPlayers();
  for (let i = 0; i < numPlayers; i++) {
    const player = Isaac.GetPlayer(i);
    if (player.HasCollectible(CollectibleTypeCustom.PROBIOTIC_YOGURT)) {
      applyEffect(player);
    }
  }
}

function applyEffect(player: EntityPlayer) {
  const room = game.GetRoom();
  const playerPos = player.Position;

  const entityTypes: Map<RoomType, number> = new Map<RoomType, number>([
    [RoomType.CURSE, PoopGridEntityVariant.BLACK],
    [RoomType.DEVIL, PoopGridEntityVariant.BLACK],
    [RoomType.BOSS, PoopGridEntityVariant.RAINBOW],
    [RoomType.ANGEL, PoopGridEntityVariant.WHITE],
    [RoomType.SHOP, PoopGridEntityVariant.GOLDEN],
  ]);

  const roomType = room.GetType();
  let poopVariant = entityTypes.get(roomType);

  if (poopVariant === undefined) {
    poopVariant = PoopGridEntityVariant.NORMAL;
  }

  spawnGridWithVariant(
    GridEntityType.POOP,
    poopVariant,
    room.GetGridIndex(playerPos),
  );

  sfxManager.Play(SoundEffect.FART);
}
