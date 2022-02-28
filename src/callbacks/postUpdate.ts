import * as bobsTea from "../items/bobsTea";

export function main(): void {
  const game = Game();
  const numPlayers = game.GetNumPlayers();
  for (let i = 0; i < numPlayers; i++) {
    const player = Isaac.GetPlayer(i);

    if (player !== undefined) {
      bobsTea.checkHasItem(player);
    }
  }
}
