import { round } from "isaacscript-common";
import { CollectibleTypeCustom } from "../constants";

if (EID !== undefined) {
  const itemDescription =
    "↓ -0.55 Tears down#Shooting continuously gradually increases your fire rate by up to 250%#At max fire rate, double tap a direction to shoot a cluster of Ipecac tears that deal 3x your damage and reset your fire rate";
  EID.addCollectible(
    CollectibleTypeCustom.COLLECTIBLE_BOBS_TEA,
    itemDescription,
  );
}

export function checkHasItem(player: EntityPlayer): void {
  if (player.HasCollectible(CollectibleTypeCustom.COLLECTIBLE_BOBS_TEA)) {
    applyEffect(player);
  }
}

export function applyEffect(player: EntityPlayer): void {
  const game = Game();
  const playerData = player.GetData();
  const frameCount = game.GetFrameCount();

  if (playerData.currentBobsTeaBonus === undefined)
    playerData.currentBobsTeaBonus = 0;

  playerData.currentStartDirection = -1;
  if (
    Input.IsActionTriggered(
      ButtonAction.ACTION_SHOOTDOWN,
      player.ControllerIndex,
    )
  )
    playerData.currentStartDirection = ButtonAction.ACTION_SHOOTDOWN;

  if (
    Input.IsActionTriggered(ButtonAction.ACTION_SHOOTUP, player.ControllerIndex)
  )
    playerData.currentStartDirection = ButtonAction.ACTION_SHOOTUP;

  if (
    Input.IsActionTriggered(
      ButtonAction.ACTION_SHOOTLEFT,
      player.ControllerIndex,
    )
  )
    playerData.currentStartDirection = ButtonAction.ACTION_SHOOTLEFT;

  if (
    Input.IsActionTriggered(
      ButtonAction.ACTION_SHOOTRIGHT,
      player.ControllerIndex,
    )
  )
    playerData.currentStartDirection = ButtonAction.ACTION_SHOOTRIGHT;

  if (playerData.currentStartDirection !== -1) {
    if (
      Number(playerData.currentBobsTeaBonus) === 2.0 &&
      playerData.currentStartDirection === playerData.lastStartDirection &&
      frameCount - Number(playerData.lastStartPress) <= 20
    ) {
      fireIpecacTears(player, playerData);

      playerData.currentBobsTeaBonus = 0;
      player.AddCacheFlags(CacheFlag.CACHE_FIREDELAY);
      player.EvaluateItems();
    }

    if (playerData.currentBobsTeaBonus === 0)
      playerData.startShoot = frameCount;

    playerData.lastStartPress = frameCount;
    playerData.lastShootFrame = frameCount;
    playerData.lastStartDirection = playerData.currentStartDirection;
  }

  if (
    Input.IsActionPressed(
      ButtonAction.ACTION_SHOOTDOWN,
      player.ControllerIndex,
    ) ||
    Input.IsActionPressed(
      ButtonAction.ACTION_SHOOTUP,
      player.ControllerIndex,
    ) ||
    Input.IsActionPressed(
      ButtonAction.ACTION_SHOOTLEFT,
      player.ControllerIndex,
    ) ||
    Input.IsActionPressed(
      ButtonAction.ACTION_SHOOTRIGHT,
      player.ControllerIndex,
    )
  )
    playerData.lastShootFrame = frameCount;

  if (
    playerData.startShoot !== undefined &&
    playerData.lastShootFrame !== undefined
  ) {
    if (frameCount - Number(playerData.lastShootFrame) >= 30) {
      playerData.currentBobsTeaBonus = 0;
      playerData.startShoot = frameCount;
      player.AddCacheFlags(CacheFlag.CACHE_FIREDELAY);
      player.EvaluateItems();
    } else if (Number(playerData.currentBobsTeaBonus) < 2.0) {
      const previousBonus = playerData.currentBobsTeaBonus;
      playerData.currentBobsTeaBonus =
        round(((frameCount - Number(playerData.startShoot)) / 60) * 2) / 2;

      if (previousBonus !== playerData.currentBobsTeaBonus) {
        player.AddCacheFlags(CacheFlag.CACHE_FIREDELAY);
        player.EvaluateItems();
      }
    }
  }
}

export function fireIpecacTears(
  player: EntityPlayer,
  playerData: Record<string, unknown>,
): void {
  let x = 0;
  let y = 0;
  switch (playerData.currentStartDirection) {
    case ButtonAction.ACTION_SHOOTDOWN:
      y = 10 * player.ShotSpeed;
      break;
    case ButtonAction.ACTION_SHOOTUP:
      y = -10 * player.ShotSpeed;
      break;
    case ButtonAction.ACTION_SHOOTLEFT:
      x = -10 * player.ShotSpeed;
      break;
    case ButtonAction.ACTION_SHOOTRIGHT:
      x = 10 * player.ShotSpeed;
      break;
    default:
      break;
  }

  let firedTear = player.FireTear(
    player.Position,
    Vector(x + 2 * math.random(), y + 2 * math.random()),
    false,
    false,
    false,
    undefined,
    3,
  );
  firedTear.AddTearFlags(TearFlags.TEAR_EXPLOSIVE);
  firedTear.FallingAcceleration = 0.75;
  firedTear.FallingSpeed = -15;
  firedTear.SetColor(Color(0.5, 0.9, 0.4), 0, 1);

  firedTear = player.FireTear(
    player.Position,
    Vector(x + 2 * math.random(), y + 2 * math.random()),
    false,
    false,
    false,
    undefined,
    3,
  );
  firedTear.AddTearFlags(TearFlags.TEAR_EXPLOSIVE);
  firedTear.FallingAcceleration = 0.75;
  firedTear.FallingSpeed = -15;
  firedTear.SetColor(Color(0.5, 0.9, 0.4), 0, 1);

  firedTear = player.FireTear(
    player.Position,
    Vector(x + 2 * math.random(), y + 2 * math.random()),
    false,
    false,
    false,
    undefined,
    3,
  );
  firedTear.AddTearFlags(TearFlags.TEAR_EXPLOSIVE);
  firedTear.FallingAcceleration = 0.75;
  firedTear.FallingSpeed = -15;
  firedTear.SetColor(Color(0.5, 0.9, 0.4), 0, 1);

  firedTear = player.FireTear(
    player.Position,
    Vector(x + 2 * math.random(), y + 2 * math.random()),
    false,
    false,
    false,
    undefined,
    3,
  );
  firedTear.AddTearFlags(TearFlags.TEAR_EXPLOSIVE);
  firedTear.FallingAcceleration = 0.75;
  firedTear.FallingSpeed = -15;
  firedTear.SetColor(Color(0.5, 0.9, 0.4), 0, 1);

  firedTear = player.FireTear(
    player.Position,
    Vector(x + 2 * math.random(), y + 2 * math.random()),
    false,
    false,
    false,
    undefined,
    3,
  );
  firedTear.AddTearFlags(TearFlags.TEAR_EXPLOSIVE);
  firedTear.FallingAcceleration = 0.75;
  firedTear.FallingSpeed = -15;
  firedTear.SetColor(Color(0.5, 0.9, 0.4), 0, 1);

  firedTear = player.FireTear(
    player.Position,
    Vector(x + 2 * math.random(), y + 2 * math.random()),
    false,
    false,
    false,
    undefined,
    3,
  );
  firedTear.AddTearFlags(TearFlags.TEAR_EXPLOSIVE);
  firedTear.FallingAcceleration = 0.75;
  firedTear.FallingSpeed = -15;
  firedTear.SetColor(Color(0.5, 0.9, 0.4), 0, 1);
}
