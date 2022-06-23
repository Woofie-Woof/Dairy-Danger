import { EffectVariant } from "isaac-typescript-definitions";

export function main(effect: EntityEffect): void {
  if (effect.Variant === EffectVariant.CREEP_SLIPPERY_BROWN) {
    Isaac.DebugString("Found slippery creep!");
    const creepData = effect.GetData();
    if (
      creepData["iceCream"] !== undefined &&
      creepData["iceCream"] === true &&
      typeof creepData["iceCreamR"] === "number" &&
      typeof creepData["iceCreamG"] === "number" &&
      typeof creepData["iceCreamB"] === "number"
    ) {
      Isaac.DebugString("Found ice cream creep!");
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
