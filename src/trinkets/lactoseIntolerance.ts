import { EffectVariant, EntityType } from "isaac-typescript-definitions";
import {
  DefaultMap,
  game,
  getPlayerIndex,
  PlayerIndex,
  saveDataManager,
  VectorZero,
} from "isaacscript-common";
import { TrinketTypeCustom } from "../enums/TrinketTypeCustom";

class MilkPlayerData {
  milkCollectibles = 0;
}

const v = {
  run: {
    milkPlayerData: new DefaultMap<PlayerIndex, MilkPlayerData>(
      () => new MilkPlayerData(),
    ),
  },
};

export function init(): void {
  saveDataManager("milkCollectible", v);
}

export function postPEffectUpdate(player: EntityPlayer): void {
  checkHasTrinket(player);
}

export function changeMilkCounter(player: EntityPlayer, amount: int): void {
  const playerIndex = getPlayerIndex(player);
  const data = v.run.milkPlayerData.getAndSetDefault(playerIndex);

  data.milkCollectibles += amount;
}

function checkHasTrinket(player: EntityPlayer) {
  const playerIndex = getPlayerIndex(player);
  const data = v.run.milkPlayerData.getAndSetDefault(playerIndex);

  if (
    player.HasTrinket(TrinketTypeCustom.LACTOSE_INTOLERANCE) &&
    data.milkCollectibles > 0
  ) {
    applyEffect(player, data);
  }
}

function applyEffect(player: EntityPlayer, data: MilkPlayerData) {
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
