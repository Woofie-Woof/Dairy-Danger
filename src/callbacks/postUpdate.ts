import { game } from "isaacscript-common";
import * as bobsTea from "../items/bobsTea";
import * as lactoseIntolerance from "../trinkets/lactoseIntolerance";

export function main(): void {
  const numPlayers = game.GetNumPlayers();
  for (let i = 0; i < numPlayers; i++) {
    const player = Isaac.GetPlayer(i);

    if (player !== undefined) {
      bobsTea.checkHasItem(player);
      lactoseIntolerance.checkHasTrinket(player);
    }
  }
}
