import { EffectVariant } from "isaac-typescript-definitions";
import {
  DefaultMap,
  game,
  getPlayerIndex,
  PlayerIndex,
  saveDataManager,
  spawnEffect,
} from "isaacscript-common";
import { TrinketTypeCustom } from "../enums/TrinketTypeCustom";

const v = {
  run: {
    milkItems: new DefaultMap<PlayerIndex, int>(0),
  },
};

export function init(): void {
  saveDataManager("milkItems", v);
}

export function postPEffectUpdate(player: EntityPlayer): void {
  checkHasTrinket(player);
}

export function changeMilkCounter(player: EntityPlayer, amount: int): void {
  const playerIndex = getPlayerIndex(player);
  let data = v.run.milkItems.getAndSetDefault(playerIndex);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  data += amount;
}

function checkHasTrinket(player: EntityPlayer) {
  const playerIndex = getPlayerIndex(player);
  const data = v.run.milkItems.getAndSetDefault(playerIndex);

  if (player.HasTrinket(TrinketTypeCustom.LACTOSE_INTOLERANCE) && data > 0) {
    applyEffect(player, data);
  }
}

function applyEffect(player: EntityPlayer, data: int) {
  const frameCount = game.GetFrameCount();

  if (frameCount % 5 === 0) {
    const creep = spawnEffect(
      EffectVariant.PLAYER_CREEP_RED,
      0,
      player.Position,
    );

    creep.CollisionDamage = 2.5 + 1 * data;
  }
}

export function changeCreepColor(effect: EntityEffect): void {
  const newCreepColor = Color(1, 1, 1);
  newCreepColor.SetColorize(0.75 * 4, 0.5 * 4, 0.2 * 4, 1);
  const creepSprite = effect.GetSprite();
  creepSprite.Color = newCreepColor;
}
