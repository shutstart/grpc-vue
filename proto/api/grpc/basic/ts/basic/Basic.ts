// Original file: grpc/basic/basic.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { EchoRequest as _basic_EchoRequest, EchoRequest__Output as _basic_EchoRequest__Output } from '../basic/EchoRequest';
import type { EchoResponse as _basic_EchoResponse, EchoResponse__Output as _basic_EchoResponse__Output } from '../basic/EchoResponse';

export interface BasicClient extends grpc.Client {
  Echo(argument: _basic_EchoRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_basic_EchoResponse__Output>): grpc.ClientUnaryCall;
  Echo(argument: _basic_EchoRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_basic_EchoResponse__Output>): grpc.ClientUnaryCall;
  Echo(argument: _basic_EchoRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_basic_EchoResponse__Output>): grpc.ClientUnaryCall;
  Echo(argument: _basic_EchoRequest, callback: grpc.requestCallback<_basic_EchoResponse__Output>): grpc.ClientUnaryCall;
  echo(argument: _basic_EchoRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_basic_EchoResponse__Output>): grpc.ClientUnaryCall;
  echo(argument: _basic_EchoRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_basic_EchoResponse__Output>): grpc.ClientUnaryCall;
  echo(argument: _basic_EchoRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_basic_EchoResponse__Output>): grpc.ClientUnaryCall;
  echo(argument: _basic_EchoRequest, callback: grpc.requestCallback<_basic_EchoResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface BasicHandlers extends grpc.UntypedServiceImplementation {
  Echo: grpc.handleUnaryCall<_basic_EchoRequest__Output, _basic_EchoResponse>;
  
}

export interface BasicDefinition extends grpc.ServiceDefinition {
  Echo: MethodDefinition<_basic_EchoRequest, _basic_EchoResponse, _basic_EchoRequest__Output, _basic_EchoResponse__Output>
}
