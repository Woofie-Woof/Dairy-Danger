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
}
