import protoLoader from "@grpc/proto-loader";
import grpc from "@grpc/grpc-js";
import { BASIC_DOMAIN } from "../endpoints";
import { FILE_PATH } from "./constants";
import type { EchoRequest } from "~/proto/api/grpc/basic/ts/basic/EchoRequest";
import type { EchoResponse } from "~/proto/api/grpc/basic/ts/basic/EchoResponse";
import type { ProtoGrpcType } from "~/proto/api/grpc/basic/ts/basic";

const PROTO_PATH = FILE_PATH + "/basic/basic.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;
export const BasicClient = new proto.basic.Basic(
  BASIC_DOMAIN,
  grpc.credentials.createInsecure()
);
export type { EchoRequest, EchoResponse };
