import { ModUpgraded, upgradeMod } from "isaacscript-common";
import * as evaluateCache from "./callbacks/evaluateCache";
import * as postEffectRender from "./callbacks/postEffectRender";
import * as postLaserUpdate from "./callbacks/postLaserUpdate";
import * as postPEffectUpdate from "./callbacks/postPEffectUpdate";
import * as postPickupInit from "./callbacks/postPickupInit";
import * as postPickupRender from "./callbacks/postPickupRender";
import * as postPlayerChangeHealth from "./callbacks/postPlayerChangeHealth";
import * as postRoomClearChanged from "./callbacks/postRoomClearChanged";
import * as postTearInitLate from "./callbacks/postTearInitLate";
import * as prePickupCollision from "./callbacks/prePickupCollision";
import * as preTearCollision from "./callbacks/preTearCollision";
import { MOD_NAME } from "./constants";

main();

function main() {
  const modVanilla = RegisterMod(MOD_NAME, 1);
  const mod = upgradeMod(modVanilla);

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
  postEffectRender.init(mod); // 56
}

function registerCustomCallbacks(mod: ModUpgraded) {
  postPlayerChangeHealth.init(mod);
  postRoomClearChanged.init(mod);
  postTearInitLate.init(mod);
}
