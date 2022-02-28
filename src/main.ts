import * as evaluateCache from "./callbacks/evaluateCache";
import * as postEffectRender from "./callbacks/postEffectRender";
import * as postTearUpdate from "./callbacks/postTearUpdate";
import * as postUpdate from "./callbacks/postUpdate";
import * as preTearCollision from "./callbacks/preTearCollision";
import * as roomClear from "./callbacks/roomClear";

const MOD_NAME = "Dairy-Danger";

export function main(): void {
  // Instantiate a new mod object, which grants the ability to add callback functions that
  // correspond to in-game events
  const dairyDanger = RegisterMod(MOD_NAME, 1);

  // Print an initialization message to the "log.txt" file
  Isaac.DebugString(`${MOD_NAME} initialized.`);

  dairyDanger.AddCallback(
    ModCallbacks.MC_PRE_SPAWN_CLEAN_AWARD,
    roomClear.main,
  );

  dairyDanger.AddCallback(
    ModCallbacks.MC_POST_TEAR_UPDATE,
    postTearUpdate.main,
  );
  dairyDanger.AddCallback(ModCallbacks.MC_EVALUATE_CACHE, evaluateCache.main);
  dairyDanger.AddCallback(
    ModCallbacks.MC_PRE_TEAR_COLLISION,
    preTearCollision.main,
  );
  dairyDanger.AddCallback(
    ModCallbacks.MC_POST_EFFECT_RENDER,
    postEffectRender.main,
  );
  // dairyDanger.AddCallback(ModCallbacks.MC_INPUT_ACTION, inputAction.main);
  dairyDanger.AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate.main);
}
