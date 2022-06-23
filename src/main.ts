import {
  ItemType,
  ModCallback,
  PickupVariant,
} from "isaac-typescript-definitions";
import { ModCallbackCustom, upgradeMod } from "isaacscript-common";
import * as evaluateCache from "./callbacks/evaluateCache";
import * as postEffectRender from "./callbacks/postEffectRender";
import * as postItemPickup from "./callbacks/postItemPickup";
import * as postLaserUpdate from "./callbacks/postLaserUpdate";
import * as postPickupInit from "./callbacks/postPickupInit";
import * as postPickupRender from "./callbacks/postPickupRender";
import * as postPlayerChangeHealth from "./callbacks/postPlayerChangeHealth";
import * as postTearUpdate from "./callbacks/postTearUpdate";
import * as postUpdate from "./callbacks/postUpdate";
import * as prePickupCollision from "./callbacks/prePickupCollision";
import * as preTearCollision from "./callbacks/preTearCollision";
import * as roomClear from "./callbacks/roomClear";
import { CollectibleTypeCustom } from "./constants";

const MOD_NAME = "Dairy-Danger";

export function main(): void {
  const modVanilla = RegisterMod(MOD_NAME, 1);
  const mod = upgradeMod(modVanilla);

  // Room clear
  mod.AddCallback(ModCallback.PRE_SPAWN_CLEAN_AWARD, roomClear.main);

  // Tear update
  mod.AddCallback(ModCallback.POST_TEAR_UPDATE, postTearUpdate.main);

  // Laser update
  mod.AddCallback(ModCallback.POST_LASER_UPDATE, postLaserUpdate.main);

  // Evaluate cache
  mod.AddCallback(ModCallback.EVALUATE_CACHE, evaluateCache.main);

  // Pre tear collision
  mod.AddCallback(ModCallback.PRE_TEAR_COLLISION, preTearCollision.main);

  // Post effect render
  mod.AddCallback(ModCallback.POST_EFFECT_RENDER, postEffectRender.main);

  // Post update
  mod.AddCallback(ModCallback.POST_UPDATE, postUpdate.main);

  // Post pickup init
  mod.AddCallback(ModCallback.POST_PICKUP_INIT, postPickupInit.main);

  // Pre pickup collision for hearts.
  mod.AddCallback(
    ModCallback.PRE_PICKUP_COLLISION,
    prePickupCollision.main,
    PickupVariant.HEART,
  );

  // Post pickup render for hearts.
  mod.AddCallback(
    ModCallback.POST_PICKUP_RENDER,
    postPickupRender.main,
    PickupVariant.HEART,
  );

  // Post item pickup
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ITEM_PICKUP,
    postItemPickup.main,
    ItemType.PASSIVE,
    CollectibleTypeCustom.DARK_CHOCOLATE,
  );

  // Post change health
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_PLAYER_CHANGE_HEALTH,
    postPlayerChangeHealth.main,
  );
}
