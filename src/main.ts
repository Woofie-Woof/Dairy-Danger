import { ModUpgraded, upgradeMod } from "isaacscript-common";
import * as evaluateCache from "./callbacks/evaluateCache";
import * as postEffectInit from "./callbacks/postEffectInit";
import * as postItemPickup from "./callbacks/postItemPickup";
import * as postLaserUpdate from "./callbacks/postLaserUpdate";
import * as postPEffectUpdate from "./callbacks/postPEffectUpdate";
import * as postPickupInit from "./callbacks/postPickupInit";
import * as postPickupRender from "./callbacks/postPickupRender";
import * as postPlayerChangeHealth from "./callbacks/postPlayerChangeHealth";
import * as postPlayerCollectibleAdded from "./callbacks/postPlayerCollectibleAdded";
import * as postPlayerCollectibleRemoved from "./callbacks/postPlayerCollectibleRemoved";
import * as postRoomClearChanged from "./callbacks/postRoomClearChanged";
import * as postTearInitLate from "./callbacks/postTearInitLate";
import * as prePickupCollision from "./callbacks/prePickupCollision";
import * as preTearCollision from "./callbacks/preTearCollision";
import { MOD_NAME } from "./constants";
import * as bobsTea from "./items/bobsTea";
import * as droppedIceCream from "./items/droppedIceCream";
import * as lactoseIntolerance from "./trinkets/lactoseIntolerance";

main();

function main() {
  const modVanilla = RegisterMod(MOD_NAME, 1);
  const mod = upgradeMod(modVanilla);

  initSaveDataManager();
  registerVanillaCallbacks(mod);
  registerCustomCallbacks(mod);
}

function registerVanillaCallbacks(mod: Mod) {
  postPEffectUpdate.init(mod); // 4
  evaluateCache.init(mod); // 8
  postPickupInit.init(mod); // 34
  postPickupRender.init(mod); // 36
  prePickupCollision.init(mod); // 38
  preTearCollision.init(mod); // 42
  postLaserUpdate.init(mod); // 48
  postEffectInit.init(mod); // 56
}

function registerCustomCallbacks(mod: ModUpgraded) {
  postItemPickup.init(mod);
  postPlayerChangeHealth.init(mod);
  postRoomClearChanged.init(mod);
  postTearInitLate.init(mod);
  postPlayerCollectibleAdded.init(mod);
  postPlayerCollectibleRemoved.init(mod);
}

function initSaveDataManager() {
  lactoseIntolerance.init();
  bobsTea.init();
  droppedIceCream.init();
}
