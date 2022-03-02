import { ModCallbacksCustom, upgradeMod } from "isaacscript-common";
import * as evaluateCache from "./callbacks/evaluateCache";
import * as postEffectRender from "./callbacks/postEffectRender";
import * as postItemPickup from "./callbacks/postItemPickup";
import * as postLaserUpdate from "./callbacks/postLaserUpdate";
import * as postPickupInit from "./callbacks/postPickupInit";
import * as postPlayerChangeHealth from "./callbacks/postPlayerChangeHealth";
import * as postTearUpdate from "./callbacks/postTearUpdate";
import * as postUpdate from "./callbacks/postUpdate";
import * as preTearCollision from "./callbacks/preTearCollision";
import * as roomClear from "./callbacks/roomClear";
import { CollectibleTypeCustom } from "./constants";

const MOD_NAME = "Dairy-Danger";

export function main(): void {
  // Instantiate a new mod object, which grants the ability to add callback functions that
  // correspond to in-game events
  const vanilla = RegisterMod(MOD_NAME, 1);
  const dairyDanger = upgradeMod(vanilla);

  // Room clear
  dairyDanger.AddCallback(
    ModCallbacks.MC_PRE_SPAWN_CLEAN_AWARD,
    roomClear.main,
  );

  // Tear update
  dairyDanger.AddCallback(
    ModCallbacks.MC_POST_TEAR_UPDATE,
    postTearUpdate.main,
  );

  // Laser update
  dairyDanger.AddCallback(
    ModCallbacks.MC_POST_LASER_UPDATE,
    postLaserUpdate.main,
  );

  // Evaluate cache
  dairyDanger.AddCallback(ModCallbacks.MC_EVALUATE_CACHE, evaluateCache.main);

  // Pre tear collision
  dairyDanger.AddCallback(
    ModCallbacks.MC_PRE_TEAR_COLLISION,
    preTearCollision.main,
  );

  // Post effect render
  dairyDanger.AddCallback(
    ModCallbacks.MC_POST_EFFECT_RENDER,
    postEffectRender.main,
  );

  // Post update
  dairyDanger.AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate.main);

  // Post pickup init
  dairyDanger.AddCallback(
    ModCallbacks.MC_POST_PICKUP_INIT,
    postPickupInit.main,
  );

  // Post item pickup
  dairyDanger.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_ITEM_PICKUP,
    postItemPickup.main,
    ItemType.ITEM_PASSIVE,
    CollectibleTypeCustom.COLLECTIBLE_DARK_CHOCOLATE,
  );

  // Post change health
  dairyDanger.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_PLAYER_CHANGE_HEALTH,
    postPlayerChangeHealth.main,
  );
}
