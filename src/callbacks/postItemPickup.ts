import * as dc from "../items/darkChocolate";

// CollectibleTypeCustom.DARK_CHOCOLATE
export function darkChocolate(player: EntityPlayer): void {
  dc.applyEffect(player);
}
