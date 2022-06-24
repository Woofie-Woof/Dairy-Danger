import {
  ButtonAction,
  CacheFlag,
  TearFlag,
} from "isaac-typescript-definitions";
import { game, getRandomSeed, log, round } from "isaacscript-common";
import { CollectibleTypeCustom } from "../enums/CollectibleTypeCustom";

const MAX_BONUS = 1.5;

if (EID !== undefined) {
  const itemDescription =
    "↓ 0.8x Tears #Shooting continuously gradually increases your fire rate by up to 250%#At max fire rate, double tap a direction to shoot a cluster of Ipecac tears that deal 3x your damage and reset your fire rate";
  EID.addCollectible(CollectibleTypeCustom.BOBS_TEA, itemDescription);
}

// ModCallback.POST_PEFFECT_UPDATE (4)
export function postPEffectUpdate(player: EntityPlayer): void {
  checkHasItem(player);
}

function checkHasItem(player: EntityPlayer) {
  if (player.HasCollectible(CollectibleTypeCustom.BOBS_TEA)) {
    applyEffect(player);
  }
}

function applyEffect(player: EntityPlayer) {
  const playerData = player.GetData();
  const frameCount = game.GetFrameCount();

  if (playerData["currentBobsTeaBonus"] === undefined) {
    playerData["currentBobsTeaBonus"] = 0;
  }

  playerData["currentStartDirection"] = -1;
  if (
    Input.IsActionTriggered(ButtonAction.SHOOT_DOWN, player.ControllerIndex)
  ) {
    playerData["currentStartDirection"] = ButtonAction.SHOOT_DOWN;
  }

  if (Input.IsActionTriggered(ButtonAction.SHOOT_UP, player.ControllerIndex)) {
    playerData["currentStartDirection"] = ButtonAction.SHOOT_UP;
  }

  if (
    Input.IsActionTriggered(ButtonAction.SHOOT_LEFT, player.ControllerIndex)
  ) {
    playerData["currentStartDirection"] = ButtonAction.SHOOT_LEFT;
  }

  if (
    Input.IsActionTriggered(ButtonAction.SHOOT_RIGHT, player.ControllerIndex)
  ) {
    playerData["currentStartDirection"] = ButtonAction.SHOOT_RIGHT;
  }

  if (playerData["currentStartDirection"] !== -1) {
    if (
      Number(playerData["currentBobsTeaBonus"]) === MAX_BONUS &&
      playerData["currentStartDirection"] ===
        playerData["lastStartDirection"] &&
      frameCount - Number(playerData["lastStartPress"]) <= 20
    ) {
      fireIpecacTears(player, playerData);

      playerData["currentBobsTeaBonus"] = 0;
      player.AddCacheFlags(CacheFlag.FIRE_DELAY);
      player.EvaluateItems();
    }

    if (playerData["currentBobsTeaBonus"] === 0) {
      playerData["startShoot"] = frameCount;
    }

    playerData["lastStartPress"] = frameCount;
    playerData["lastShootFrame"] = frameCount;
    playerData["lastStartDirection"] = playerData["currentStartDirection"];
  }

  if (
    Input.IsActionPressed(ButtonAction.SHOOT_DOWN, player.ControllerIndex) ||
    Input.IsActionPressed(ButtonAction.SHOOT_UP, player.ControllerIndex) ||
    Input.IsActionPressed(ButtonAction.SHOOT_LEFT, player.ControllerIndex) ||
    Input.IsActionPressed(ButtonAction.SHOOT_RIGHT, player.ControllerIndex)
  ) {
    playerData["lastShootFrame"] = frameCount;
  }

  if (
    playerData["startShoot"] !== undefined &&
    playerData["lastShootFrame"] !== undefined
  ) {
    if (frameCount - Number(playerData["lastShootFrame"]) >= 30) {
      playerData["currentBobsTeaBonus"] = 0;
      playerData["startShoot"] = frameCount;
      player.AddCacheFlags(CacheFlag.FIRE_DELAY);
      player.EvaluateItems();
    } else if (Number(playerData["currentBobsTeaBonus"]) < MAX_BONUS) {
      const previousBonus = playerData["currentBobsTeaBonus"];
      playerData["currentBobsTeaBonus"] =
        round(((frameCount - Number(playerData["startShoot"])) / 90) * 2) / 2;

      if (previousBonus !== playerData["currentBobsTeaBonus"]) {
        log(`Current bonus: ${playerData["currentBobsTeaBonus"]}`);
        player.AddCacheFlags(CacheFlag.FIRE_DELAY);
        player.EvaluateItems();
      }
    }
  }
}

function fireIpecacTears(
  player: EntityPlayer,
  playerData: Record<string, unknown>,
) {
  let x = 0;
  let y = 0;
  switch (playerData["currentStartDirection"]) {
    case ButtonAction.SHOOT_DOWN:
      y = 10 * player.ShotSpeed;
      break;
    case ButtonAction.SHOOT_UP:
      y = -10 * player.ShotSpeed;
      break;
    case ButtonAction.SHOOT_LEFT:
      x = -10 * player.ShotSpeed;
      break;
    case ButtonAction.SHOOT_RIGHT:
      x = 10 * player.ShotSpeed;
      break;
    default:
      break;
  }

  const rng = RNG();
  rng.SetSeed(getRandomSeed(), 1);

  let firedTear = player.FireTear(
    player.Position,
    Vector(x + 2 * rng.RandomFloat(), y + 2 * rng.RandomFloat()),
    false,
    false,
    false,
    undefined,
    3,
  );
  firedTear.AddTearFlags(TearFlag.EXPLOSIVE);
  firedTear.FallingAcceleration = 0.75;
  firedTear.FallingSpeed = -15;
  firedTear.SetColor(Color(0.5, 0.9, 0.4), 0, 1);

  firedTear = player.FireTear(
    player.Position,
    Vector(x + 2 * rng.RandomFloat(), y + 2 * rng.RandomFloat()),
    false,
    false,
    false,
    undefined,
    3,
  );
  firedTear.AddTearFlags(TearFlag.EXPLOSIVE);
  firedTear.FallingAcceleration = 0.75;
  firedTear.FallingSpeed = -15;
  firedTear.SetColor(Color(0.5, 0.9, 0.4), 0, 1);

  firedTear = player.FireTear(
    player.Position,
    Vector(x + 2 * rng.RandomFloat(), y + 2 * rng.RandomFloat()),
    false,
    false,
    false,
    undefined,
    3,
  );
  firedTear.AddTearFlags(TearFlag.EXPLOSIVE);
  firedTear.FallingAcceleration = 0.75;
  firedTear.FallingSpeed = -15;
  firedTear.SetColor(Color(0.5, 0.9, 0.4), 0, 1);

  firedTear = player.FireTear(
    player.Position,
    Vector(x + 2 * rng.RandomFloat(), y + 2 * rng.RandomFloat()),
    false,
    false,
    false,
    undefined,
    3,
  );
  firedTear.AddTearFlags(TearFlag.EXPLOSIVE);
  firedTear.FallingAcceleration = 0.75;
  firedTear.FallingSpeed = -15;
  firedTear.SetColor(Color(0.5, 0.9, 0.4), 0, 1);

  firedTear = player.FireTear(
    player.Position,
    Vector(x + 2 * rng.RandomFloat(), y + 2 * rng.RandomFloat()),
    false,
    false,
    false,
    undefined,
    3,
  );
  firedTear.AddTearFlags(TearFlag.EXPLOSIVE);
  firedTear.FallingAcceleration = 0.75;
  firedTear.FallingSpeed = -15;
  firedTear.SetColor(Color(0.5, 0.9, 0.4), 0, 1);

  firedTear = player.FireTear(
    player.Position,
    Vector(x + 2 * rng.RandomFloat(), y + 2 * rng.RandomFloat()),
    false,
    false,
    false,
    undefined,
    3,
  );
  firedTear.AddTearFlags(TearFlag.EXPLOSIVE);
  firedTear.FallingAcceleration = 0.75;
  firedTear.FallingSpeed = -15;
  firedTear.SetColor(Color(0.5, 0.9, 0.4), 0, 1);
}
