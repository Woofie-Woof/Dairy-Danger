import { EffectVariant, ModCallback } from "isaac-typescript-definitions";
import * as droppedIceCream from "../items/droppedIceCream";
import * as lactoseIntolerance from "../trinkets/lactoseIntolerance";

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_EFFECT_INIT, main);
}

function main(effect: EntityEffect) {
  if (effect.Variant === EffectVariant.CREEP_SLIPPERY_BROWN) {
    droppedIceCream.changeCreepColor(effect);
  }

  if (effect.Variant === EffectVariant.PLAYER_CREEP_RED) {
    lactoseIntolerance.changeCreepColor(effect);
  }
}
