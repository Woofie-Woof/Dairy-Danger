import { EffectVariant, EntityType } from "isaac-typescript-definitions";
import {
  DefaultMap,
  game,
  getPlayerIndex,
  PlayerIndex,
  saveDataManager,
  VectorZero,
} from "isaacscript-common";
import { PlayerData } from "../classes/PlayerData";
import { TrinketTypeCustom } from "../enums/TrinketTypeCustom";

const v = {
  run: {
    playerData: new DefaultMap<PlayerIndex, PlayerData>(() => new PlayerData()),
  },
};

export function init(): void {
  saveDataManager("playerData", v);
}

export function postPEffectUpdate(player: EntityPlayer): void {
  checkHasTrinket(player);
}

export function changeMilkCounter(player: EntityPlayer, amount: int): void {
  const playerIndex = getPlayerIndex(player);
  const data = v.run.playerData.getAndSetDefault(playerIndex);

  data.milkCollectibles += amount;
}

function checkHasTrinket(player: EntityPlayer) {
  const playerIndex = getPlayerIndex(player);
  const data = v.run.playerData.getAndSetDefault(playerIndex);

  if (
    player.HasTrinket(TrinketTypeCustom.LACTOSE_INTOLERANCE) &&
    data.milkCollectibles > 0
  ) {
    applyEffect(player, data);
  }
}

function applyEffect(player: EntityPlayer, data: PlayerData) {
  const frameCount = game.GetFrameCount();

  if (frameCount % 10 === 0) {
    const creep = Isaac.Spawn(
      EntityType.EFFECT,
      EffectVariant.CREEP_RED,
      0,
      player.Position,
      VectorZero,
      player,
    ).ToEffect();

    if (creep !== undefined) {
      creep.CollisionDamage = 2.5 + 1 * data.milkCollectibles;
    }
  }
}
