import { ModCallback } from "isaac-typescript-definitions";
import * as bobsTea from "../items/bobsTea";
import * as lactoseIntolerance from "../trinkets/lactoseIntolerance";

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_PEFFECT_UPDATE, main);
}

function main(player: EntityPlayer) {
  bobsTea.postPEffectUpdate(player);
  lactoseIntolerance.postPEffectUpdate(player);
}
