import {
  CacheFlag,
  ItemType,
  ModCallback,
  PickupVariant,
} from "isaac-typescript-definitions";
import { ModCallbackCustom, ModUpgraded, upgradeMod } from "isaacscript-common";
import * as evaluateCache from "./callbacks/evaluateCache";
import * as postEffectRender from "./callbacks/postEffectRender";
import * as postItemPickup from "./callbacks/postItemPickup";
import * as postLaserUpdate from "./callbacks/postLaserUpdate";
import * as postPEffectUpdate from "./callbacks/postPEffectUpdate";
import * as postPickupInit from "./callbacks/postPickupInit";
import * as postPickupRender from "./callbacks/postPickupRender";
import * as postPlayerChangeHealth from "./callbacks/postPlayerChangeHealth";
import * as postRoomClearChanged from "./callbacks/postRoomClearChanged";
import * as postTearUpdate from "./callbacks/postTearUpdate";
import * as prePickupCollision from "./callbacks/prePickupCollision";
import * as preTearCollision from "./callbacks/preTearCollision";
import { CollectibleTypeCustom } from "./constants";

const MOD_NAME = "Dairy-Danger";

export function main(): void {
  const modVanilla = RegisterMod(MOD_NAME, 1);
  const mod = upgradeMod(modVanilla);

  registerVanillaCallbacks(mod);
  registerCustomCallbacks(mod);
}

function registerVanillaCallbacks(mod: Mod) {
  mod.AddCallback(ModCallback.POST_PEFFECT_UPDATE, postPEffectUpdate.main); // 4
  mod.AddCallback(
    ModCallback.EVALUATE_CACHE,
    evaluateCache.fireDelay,
    CacheFlag.FIRE_DELAY,
  ); // 8
  mod.AddCallback(
    ModCallback.POST_PICKUP_INIT,
    postPickupInit.heart,
    PickupVariant.HEART,
  ); // 34
  mod.AddCallback(
    ModCallback.POST_PICKUP_RENDER,
    postPickupRender.heart,
    PickupVariant.HEART,
  ); // 36
  mod.AddCallback(
    ModCallback.PRE_PICKUP_COLLISION,
    prePickupCollision.heart,
    PickupVariant.HEART,
  ); // 38
  mod.AddCallback(ModCallback.POST_TEAR_UPDATE, postTearUpdate.main); // 40
  mod.AddCallback(ModCallback.PRE_TEAR_COLLISION, preTearCollision.main); // 42
  mod.AddCallback(ModCallback.POST_LASER_UPDATE, postLaserUpdate.main); // 48
  mod.AddCallback(ModCallback.POST_EFFECT_RENDER, postEffectRender.main); // 56
}

function registerCustomCallbacks(mod: ModUpgraded) {
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ITEM_PICKUP,
    postItemPickup.darkChocolate,
    ItemType.PASSIVE,
    CollectibleTypeCustom.DARK_CHOCOLATE,
  );
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_PLAYER_CHANGE_HEALTH,
    postPlayerChangeHealth.main,
  );
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ROOM_CLEAR_CHANGED,
    postRoomClearChanged.roomCleared,
  );
}
