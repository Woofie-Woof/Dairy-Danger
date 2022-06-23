import { CollectibleType, TrinketType } from "isaac-typescript-definitions";

export const CollectibleTypeCustom = {
  PROBIOTIC_YOGURT: Isaac.GetItemIdByName("Probiotic Yogurt"),
  DROPPED_ICE_CREAM: Isaac.GetItemIdByName("Dropped Ice Cream"),
  BOBS_TEA: Isaac.GetItemIdByName("Bob's Tea"),
  DARK_CHOCOLATE: Isaac.GetItemIdByName("Dark Chocolate"),
} as const;

export const TrinketTypeCustom = {
  LACTOSE_INTOLERANCE: Isaac.GetTrinketIdByName("Lactose Intolerance"),
} as const;

export enum HeartSubTypeCustom {
  HALF_BLACK = 1422,
}

export const MAX_BOBS_TEA_BONUS = 1.5;

export const MILK_ITEM_IDS = [
  CollectibleType.MILK,
  CollectibleType.SOY_MILK,
  CollectibleType.ALMOND_MILK,
  CollectibleType.CHOCOLATE_MILK,
  CollectibleType.BREAKFAST,
  CollectibleType.CRACK_JACKS,
  CollectibleTypeCustom.PROBIOTIC_YOGURT,
  CollectibleTypeCustom.DROPPED_ICE_CREAM,
  CollectibleTypeCustom.BOBS_TEA,
  CollectibleTypeCustom.DARK_CHOCOLATE,
];

export const MILK_TRINKET_IDS = [TrinketType.BUTTER, TrinketType.WALNUT];
