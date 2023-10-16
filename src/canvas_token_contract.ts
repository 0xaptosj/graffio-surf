import { createClient } from "@thalalabs/surf";
import { Provider, type Network, AptosAccount } from "aptos";
import { ABI } from "./canvas_token_abi";

// type Option<T> = { vec: [T] | [] };

export class CanvasTokenContract {
  provider: Provider;
  client: ReturnType<typeof createClient>;
  account?: AptosAccount;
  accountAddr?: `0x${string}`;

  constructor(
    readonly network: "testnet" | "mainnet",
    readonly privateKeyHex?: string
  ) {
    this.provider = new Provider(network as Network);
    this.client = createClient({
      nodeUrl: this.provider.aptosClient.nodeUrl,
    });
    if (privateKeyHex) {
      this.account = AptosAccount.fromAptosAccountObject({
        privateKeyHex,
      });
      this.accountAddr = this.account.address().hex() as `0x${string}`;
    }
  }

  // ================== SUPER ADMIN ACTION ==================

  async createCanvasToken(
    description: string,
    canvasName: string,
    width: number,
    height: number,
    perAccountTimeoutS: number,
    canDrawForS: number,
    cost: number,
    costMultiplier: number,
    costMultiplierDecayS: number,
    defaultColorR: number,
    defaultColorG: number,
    defaultColorB: number,
    canDrawMultiplePixelsAtOnce: boolean,
    ownerIsSuperAdmin: boolean,
    maxNumberOfPixelsPerDraw: number,
    drawEnabledForNonAdmin: boolean
  ) {
    if (!this.account) throw new Error("ANS SDK: No account provided");
    return this.client.useABI(ABI).entry.create({
      type_arguments: [],
      arguments: [
        description,
        canvasName,
        width,
        height,
        perAccountTimeoutS,
        canDrawForS,
        cost,
        costMultiplier,
        costMultiplierDecayS,
        defaultColorR,
        defaultColorG,
        defaultColorB,
        canDrawMultiplePixelsAtOnce,
        ownerIsSuperAdmin,
        maxNumberOfPixelsPerDraw,
        drawEnabledForNonAdmin,
      ],
      account: this.account,
    });
  }

  async addAdmin(canvas: `0x${string}`, newAdmin: `0x${string}`) {
    if (!this.account) throw new Error("ANS SDK: No account provided");
    return this.client.useABI(ABI).entry.add_admin({
      type_arguments: [],
      arguments: [canvas, newAdmin],
      account: this.account,
    });
  }

  async removeAdmin(canvas: `0x${string}`, removedAdmin: `0x${string}`) {
    if (!this.account) throw new Error("ANS SDK: No account provided");
    return this.client.useABI(ABI).entry.remove_admin({
      type_arguments: [],
      arguments: [canvas, removedAdmin],
      account: this.account,
    });
  }

  // ================== ADMIN FUNCTIONS ==================

  async enableDrawing(canvas: `0x${string}`) {
    if (!this.account) throw new Error("ANS SDK: No account provided");
    return this.client.useABI(ABI).entry.enable_draw_for_non_admin({
      type_arguments: [],
      arguments: [canvas],
      account: this.account,
    });
  }

  async disableDrawing(canvas: `0x${string}`) {
    if (!this.account) throw new Error("ANS SDK: No account provided");
    return this.client.useABI(ABI).entry.disable_draw_for_non_admin({
      type_arguments: [],
      arguments: [canvas],
      account: this.account,
    });
  }

  async addToAllowList(canvas: `0x${string}`, addr: `0x${string}`) {
    if (!this.account) throw new Error("ANS SDK: No account provided");
    return this.client.useABI(ABI).entry.add_to_allowlist({
      type_arguments: [],
      arguments: [canvas, addr],
      account: this.account,
    });
  }

  async removeFromAllowList(canvas: `0x${string}`, addr: `0x${string}`) {
    if (!this.account) throw new Error("ANS SDK: No account provided");
    return this.client.useABI(ABI).entry.remove_from_allowlist({
      type_arguments: [],
      arguments: [canvas, addr],
      account: this.account,
    });
  }

  async addToBlockList(canvas: `0x${string}`, addr: `0x${string}`) {
    if (!this.account) throw new Error("ANS SDK: No account provided");
    return this.client.useABI(ABI).entry.add_to_blocklist({
      type_arguments: [],
      arguments: [canvas, addr],
      account: this.account,
    });
  }

  async removeFromBlockList(canvas: `0x${string}`, addr: `0x${string}`) {
    if (!this.account) throw new Error("ANS SDK: No account provided");
    return this.client.useABI(ABI).entry.remove_from_blocklist({
      type_arguments: [],
      arguments: [canvas, addr],
      account: this.account,
    });
  }

  async updateMaxNumberOfPixelsPerDraw(canvas: `0x${string}`, limit: number) {
    if (!this.account) throw new Error("ANS SDK: No account provided");
    return this.client.useABI(ABI).entry.update_max_number_of_piexls_per_draw({
      type_arguments: [],
      arguments: [canvas, limit],
      account: this.account,
    });
  }

  async updateTimeout(canvas: `0x${string}`, timeout: number) {
    if (!this.account) throw new Error("ANS SDK: No account provided");
    return this.client.useABI(ABI).entry.update_per_account_timeout({
      type_arguments: [],
      arguments: [canvas, timeout],
      account: this.account,
    });
  }

  // ================== USER FUNCTIONS ==================

  async draw(
    canvas: `0x${string}`,
    xs: number[],
    ys: number[],
    rs: number[],
    gs: number[],
    bs: number[]
  ) {
    if (!this.account) throw new Error("ANS SDK: No account provided");
    return this.client.useABI(ABI).entry.draw({
      type_arguments: [],
      arguments: [canvas, xs, ys, rs, gs, bs],
      account: this.account,
    });
  }
}
