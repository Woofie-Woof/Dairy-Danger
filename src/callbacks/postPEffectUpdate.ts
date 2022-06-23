import * as bobsTea from "../items/bobsTea";
import * as lactoseIntolerance from "../trinkets/lactoseIntolerance";

export function main(player: EntityPlayer): void {
  bobsTea.postPEffectUpdate(player);
  lactoseIntolerance.postPEffectUpdate(player);
}
