import { Buffer } from "buffer";
import { Address } from "@stellar/stellar-sdk";
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from "@stellar/stellar-sdk/contract";
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Timepoint,
  Duration,
} from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";

if (typeof window !== "undefined") {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}




export const Errors = {
  1: {message:"NotInitialized"},
  2: {message:"AlreadyInitialized"},
  3: {message:"InvalidRate"},
  4: {message:"InvalidTime"},
  5: {message:"StreamNotFound"},
  6: {message:"NotAuthorized"},
  7: {message:"InsufficientBalance"},
  8: {message:"StreamAlreadyCanceled"},
  9: {message:"AmountMustBePositive"}
}


export interface Stream {
  amount_withdrawn: i128;
  employer: string;
  end_time: u64;
  id: u64;
  is_canceled: boolean;
  rate_per_second: i128;
  start_time: u64;
  token: string;
  total_amount: i128;
  worker: string;
}

export type DataKey = {tag: "Admin", values: void} | {tag: "FeeCollector", values: void} | {tag: "Stream", values: readonly [u64]} | {tag: "NextStreamId", values: void};

export interface Client {
  /**
   * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  initialize: ({admin, fee_collector}: {admin: string, fee_collector: string}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a cancel_stream transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  cancel_stream: ({employer, stream_id}: {employer: string, stream_id: u64}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a create_stream transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  create_stream: ({employer, worker, token, rate_per_second, start_time, end_time}: {employer: string, worker: string, token: string, rate_per_second: i128, start_time: u64, end_time: u64}, options?: MethodOptions) => Promise<AssembledTransaction<u64>>

  /**
   * Construct and simulate a update_fee_collector transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  update_fee_collector: ({admin, new_collector}: {admin: string, new_collector: string}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a withdraw_from_stream transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  withdraw_from_stream: ({worker, stream_id, amount}: {worker: string, stream_id: u64, amount: i128}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a get_claimable_balance transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_claimable_balance: ({stream_id}: {stream_id: u64}, options?: MethodOptions) => Promise<AssembledTransaction<i128>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAACQAAAAAAAAAOTm90SW5pdGlhbGl6ZWQAAAAAAAEAAAAAAAAAEkFscmVhZHlJbml0aWFsaXplZAAAAAAAAgAAAAAAAAALSW52YWxpZFJhdGUAAAAAAwAAAAAAAAALSW52YWxpZFRpbWUAAAAABAAAAAAAAAAOU3RyZWFtTm90Rm91bmQAAAAAAAUAAAAAAAAADU5vdEF1dGhvcml6ZWQAAAAAAAAGAAAAAAAAABNJbnN1ZmZpY2llbnRCYWxhbmNlAAAAAAcAAAAAAAAAFVN0cmVhbUFscmVhZHlDYW5jZWxlZAAAAAAAAAgAAAAAAAAAFEFtb3VudE11c3RCZVBvc2l0aXZlAAAACQ==",
        "AAAAAQAAAAAAAAAAAAAABlN0cmVhbQAAAAAACgAAAAAAAAAQYW1vdW50X3dpdGhkcmF3bgAAAAsAAAAAAAAACGVtcGxveWVyAAAAEwAAAAAAAAAIZW5kX3RpbWUAAAAGAAAAAAAAAAJpZAAAAAAABgAAAAAAAAALaXNfY2FuY2VsZWQAAAAAAQAAAAAAAAAPcmF0ZV9wZXJfc2Vjb25kAAAAAAsAAAAAAAAACnN0YXJ0X3RpbWUAAAAAAAYAAAAAAAAABXRva2VuAAAAAAAAEwAAAAAAAAAMdG90YWxfYW1vdW50AAAACwAAAAAAAAAGd29ya2VyAAAAAAAT",
        "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAABAAAAAAAAAAAAAAABUFkbWluAAAAAAAAAAAAAAAAAAAMRmVlQ29sbGVjdG9yAAAAAQAAAAAAAAAGU3RyZWFtAAAAAAABAAAABgAAAAAAAAAAAAAADE5leHRTdHJlYW1JZA==",
        "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAgAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAA1mZWVfY29sbGVjdG9yAAAAAAAAEwAAAAA=",
        "AAAAAAAAAAAAAAANY2FuY2VsX3N0cmVhbQAAAAAAAAIAAAAAAAAACGVtcGxveWVyAAAAEwAAAAAAAAAJc3RyZWFtX2lkAAAAAAAABgAAAAA=",
        "AAAAAAAAAAAAAAANY3JlYXRlX3N0cmVhbQAAAAAAAAYAAAAAAAAACGVtcGxveWVyAAAAEwAAAAAAAAAGd29ya2VyAAAAAAATAAAAAAAAAAV0b2tlbgAAAAAAABMAAAAAAAAAD3JhdGVfcGVyX3NlY29uZAAAAAALAAAAAAAAAApzdGFydF90aW1lAAAAAAAGAAAAAAAAAAhlbmRfdGltZQAAAAYAAAABAAAABg==",
        "AAAAAAAAAAAAAAAUdXBkYXRlX2ZlZV9jb2xsZWN0b3IAAAACAAAAAAAAAAVhZG1pbgAAAAAAABMAAAAAAAAADW5ld19jb2xsZWN0b3IAAAAAAAATAAAAAA==",
        "AAAAAAAAAAAAAAAUd2l0aGRyYXdfZnJvbV9zdHJlYW0AAAADAAAAAAAAAAZ3b3JrZXIAAAAAABMAAAAAAAAACXN0cmVhbV9pZAAAAAAAAAYAAAAAAAAABmFtb3VudAAAAAAACwAAAAA=",
        "AAAAAAAAAAAAAAAVZ2V0X2NsYWltYWJsZV9iYWxhbmNlAAAAAAAAAQAAAAAAAAAJc3RyZWFtX2lkAAAAAAAABgAAAAEAAAAL" ]),
      options
    )
  }
  public readonly fromJSON = {
    initialize: this.txFromJSON<null>,
        cancel_stream: this.txFromJSON<null>,
        create_stream: this.txFromJSON<u64>,
        update_fee_collector: this.txFromJSON<null>,
        withdraw_from_stream: this.txFromJSON<null>,
        get_claimable_balance: this.txFromJSON<i128>
  }
}