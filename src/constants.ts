import { CollectibleType, TrinketType } from "isaac-typescript-definitions";
import { CollectibleTypeCustom } from "./enums/CollectibleTypeCustom";

export const MOD_NAME = "Dairy-Danger";

export const MILK_COLLECTIBLE_TYPE_SET: ReadonlySet<CollectibleType> = new Set([
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
]);

export const MILK_TRINKET_TYPE_SET: ReadonlySet<TrinketType> = new Set([
  TrinketType.BUTTER,
  TrinketType.WALNUT,
]);
