export enum CollectibleTypeCustom {
  COLLECTIBLE_PROBIOTIC_YOGURT = Isaac.GetItemIdByName("Probiotic Yogurt"),
  COLLECTIBLE_DROPPED_ICE_CREAM = Isaac.GetItemIdByName("Dropped Ice Cream"),
  COLLECTIBLE_BOBS_TEA = Isaac.GetItemIdByName("Bob's Tea"),
  COLLECTIBLE_DARK_CHOCOLATE = Isaac.GetItemIdByName("Dark Chocolate"),
}

export enum TrinketTypeCustom {
  TRINKET_LACTOSE_INTOLERANCE = Isaac.GetTrinketIdByName("Lactose Intolerance"),
}

export enum HeartSubTypeCustom {
  HALF_BLACK = 1422,
}

export const MAX_BOBS_TEA_BONUS = 1.5;

export const MILK_ITEM_IDS = [
  CollectibleType.COLLECTIBLE_MILK,
  CollectibleType.COLLECTIBLE_SOY_MILK,
  CollectibleType.COLLECTIBLE_ALMOND_MILK,
  CollectibleType.COLLECTIBLE_CHOCOLATE_MILK,
  CollectibleType.COLLECTIBLE_BREAKFAST,
  CollectibleType.COLLECTIBLE_CRACK_JACKS,
  CollectibleTypeCustom.COLLECTIBLE_PROBIOTIC_YOGURT,
  CollectibleTypeCustom.COLLECTIBLE_DROPPED_ICE_CREAM,
  CollectibleTypeCustom.COLLECTIBLE_BOBS_TEA,
  CollectibleTypeCustom.COLLECTIBLE_DARK_CHOCOLATE,
];

export const MILK_TRINKET_IDS = [
  TrinketType.TRINKET_BUTTER,
  TrinketType.TRINKET_WALNUT,
];
