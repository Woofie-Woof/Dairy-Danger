import {
  ItemType,
  ModCallback,
  PickupVariant,
} from "isaac-typescript-definitions";
import { ModCallbackCustom, ModUpgraded, upgradeMod } from "isaacscript-common";
import * as evaluateCache from "./callbacks/evaluateCache";
import * as postEffectRender from "./callbacks/postEffectRender";
import * as postItemPickup from "./callbacks/postItemPickup";
import * as postLaserUpdate from "./callbacks/postLaserUpdate";
import * as postPickupInit from "./callbacks/postPickupInit";
import * as postPickupRender from "./callbacks/postPickupRender";
import * as postPlayerChangeHealth from "./callbacks/postPlayerChangeHealth";
import * as postRoomClearChanged from "./callbacks/postRoomClearChanged";
import * as postTearUpdate from "./callbacks/postTearUpdate";
import * as postUpdate from "./callbacks/postUpdate";
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
  mod.AddCallback(ModCallback.POST_TEAR_UPDATE, postTearUpdate.main);
  mod.AddCallback(ModCallback.POST_LASER_UPDATE, postLaserUpdate.main);
  mod.AddCallback(ModCallback.EVALUATE_CACHE, evaluateCache.main);
  mod.AddCallback(ModCallback.PRE_TEAR_COLLISION, preTearCollision.main);
  mod.AddCallback(ModCallback.POST_EFFECT_RENDER, postEffectRender.main);
  mod.AddCallback(ModCallback.POST_UPDATE, postUpdate.main);
  mod.AddCallback(ModCallback.POST_PICKUP_INIT, postPickupInit.main);
  mod.AddCallback(
    ModCallback.PRE_PICKUP_COLLISION,
    prePickupCollision.main,
    PickupVariant.HEART,
  );
  mod.AddCallback(
    ModCallback.POST_PICKUP_RENDER,
    postPickupRender.main,
    PickupVariant.HEART,
  );
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
