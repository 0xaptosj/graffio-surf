import { createClient } from "@thalalabs/surf";
import { Provider, type Network, AptosAccount } from "aptos";
import { ABI } from "./abi/canvas_token_optimized_version_abi";

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
    defaultColorID: number,
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
        defaultColorID,
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

  async addToUnlimitedArtists(canvas: `0x${string}`, addr: `0x${string}`) {
    if (!this.account) throw new Error("ANS SDK: No account provided");
    return this.client.useABI(ABI).entry.add_to_unlimited_artists({
      type_arguments: [],
      arguments: [canvas, addr],
      account: this.account,
    });
  }

  async removeFromUnlimitedArtists(canvas: `0x${string}`, addr: `0x${string}`) {
    if (!this.account) throw new Error("ANS SDK: No account provided");
    return this.client.useABI(ABI).entry.remove_from_unlimited_artists({
      type_arguments: [],
      arguments: [canvas, addr],
      account: this.account,
    });
  }

  async updateMaxNumberOfPixelsPerDraw(canvas: `0x${string}`, limit: number) {
    if (!this.account) throw new Error("ANS SDK: No account provided");
    return this.client.useABI(ABI).entry.update_max_number_of_pixels_per_draw({
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
    colorIDs: number[]
  ) {
    if (!this.account) throw new Error("ANS SDK: No account provided");
    return this.client.useABI(ABI).entry.draw({
      type_arguments: [],
      arguments: [canvas, xs, ys, colorIDs],
      account: this.account,
    });
  }
}
