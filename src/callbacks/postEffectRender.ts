import { EffectVariant, ModCallback } from "isaac-typescript-definitions";
import { log } from "isaacscript-common";

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_EFFECT_RENDER, main);
}

function main(effect: EntityEffect) {
  if (effect.Variant === EffectVariant.CREEP_SLIPPERY_BROWN) {
    log("Found slippery creep!");
    const creepData = effect.GetData();
    if (
      creepData["iceCream"] !== undefined &&
      creepData["iceCream"] === true &&
      typeof creepData["iceCreamR"] === "number" &&
      typeof creepData["iceCreamG"] === "number" &&
      typeof creepData["iceCreamB"] === "number"
    ) {
      log("Found ice cream creep!");
      const newCreepColor = Color(1, 1, 1);
      newCreepColor.SetColorize(
        creepData["iceCreamR"] * 4,
        creepData["iceCreamG"] * 4,
        creepData["iceCreamB"] * 4,
        1,
      );
      const creepSprite = effect.GetSprite();
      creepSprite.Color = newCreepColor;
    }
  }
}
