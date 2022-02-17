export function main(): void {
  const activeBrownCreep = Isaac.FindByType(
    EntityType.ENTITY_EFFECT,
    EffectVariant.CREEP_SLIPPERY_BROWN,
  );

  for (const creep of activeBrownCreep) {
    const creepData = creep.GetData();
    if (
      creepData.iceCream !== undefined &&
      creepData.iceCream === true &&
      typeof creepData.iceCreamR === "number" &&
      typeof creepData.iceCreamG === "number" &&
      typeof creepData.iceCreamB === "number"
    ) {
      creep.SetColor(
        Color(creepData.iceCreamR, creepData.iceCreamG, creepData.iceCreamB),
        0,
        1,
      );
    }
  }
}
