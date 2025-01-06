package app

import (
	"fmt"
	"net"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func newGrpcServer() *grpc.Server {
	var opts []grpc.ServerOption
	server := grpc.NewServer(opts...)
	reflection.Register(server)
	return server
}

func grpcListener(port int) (net.Listener, error) {
	lis, err := net.Listen("tcp", fmt.Sprintf("0.0.0.0:%d", port))
	if err != nil {
		return nil, err
	}
	return lis, nil
}