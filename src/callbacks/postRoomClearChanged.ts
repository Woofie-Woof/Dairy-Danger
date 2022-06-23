import { ModCallbackCustom, ModUpgraded } from "isaacscript-common";
import * as probioticYogurt from "../items/probioticYogurt";

export function init(mod: ModUpgraded): void {
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ROOM_CLEAR_CHANGED,
    roomCleared,
    true, // Only fire if the room clear goes from false to true.
  );
}

function roomCleared() {
  probioticYogurt.checkHasItem();
}
