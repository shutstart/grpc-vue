import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { BasicClient as _basic_BasicClient, BasicDefinition as _basic_BasicDefinition } from './basic/Basic';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  basic: {
    Basic: SubtypeConstructor<typeof grpc.Client, _basic_BasicClient> & { service: _basic_BasicDefinition }
    EchoRequest: MessageTypeDefinition
    EchoResponse: MessageTypeDefinition
  }
}

