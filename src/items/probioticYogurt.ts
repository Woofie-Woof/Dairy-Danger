import { CollectibleTypeCustom } from "../constants";

export function checkProbioticYogurt(): void {
  const game = Game();
  const numPlayers = game.GetNumPlayers();
  for (let i = 0; i < numPlayers; i++) {
    const player = Isaac.GetPlayer(i);
    if (
      player !== undefined &&
      player.HasCollectible(CollectibleTypeCustom.COLLECTIBLE_PROBIOTIC_YOGURT)
    ) {
      applyProbioticYogurt(player);
    }
  }
}

function applyProbioticYogurt(player: EntityPlayer) {
  const playerPos = player.Position;

  const rand = math.random(100);

  const entityTypes = [
    { entityType: EntityType.ENTITY_POOP, variant: 0 },
    { entityType: EntityType.ENTITY_POOP, variant: 1 },
  ];

  let chosenEffect = null;
  if (rand <= 80) {
    chosenEffect = entityTypes[0];
  } else if (rand <= 90) {
    chosenEffect = entityTypes[1];
  }

  if (chosenEffect !== null) {
    Isaac.Spawn(
      chosenEffect.entityType,
      chosenEffect.variant,
      0,
      playerPos,
      Vector.Zero,
      player,
    );
    SFXManager().Play(SoundEffect.SOUND_FART);
  }
}
