package app

import (
	"context"
	"fmt"
	"io"
	"os"
	"os/signal"

	"github.com/shutstart/grpc-vue/api/grpc/basic/golang/basic"
	basicSrv "github.com/shutstart/grpc-vue/pkg/transport/grpc/basic"
	"golang.org/x/sync/errgroup"
	"google.golang.org/grpc"
)

func Run(ctx context.Context, w io.Writer, args []string) error {
	// Create a context that listens for OS interrupt signals
	ctx, cancel := signal.NotifyContext(ctx, os.Interrupt)
	defer cancel()

	// Create gRPC server
	grpcServer := grpc.NewServer()
	listener, err := grpcListener(5001)
	if err != nil {
		cancel()
		return fmt.Errorf("failed to create listener: %w", err)
	}

	fmt.Fprintln(w, "gRPC server is running on port 5001")

	// Register your gRPC service
	basicServer := basicSrv.New()
	basic.RegisterBasicServer(grpcServer, basicServer)

	// Use an errgroup to manage goroutines
	var g errgroup.Group

	// Start the gRPC server in a goroutine
	g.Go(func() error {
		if err := grpcServer.Serve(listener); err != nil {
			return fmt.Errorf("gRPC server error: %w", err)
		}
		return nil
	})

	// Handle context cancellation
	g.Go(func() error {
		<-ctx.Done() // Wait for the context to be canceled (e.g., by SIGINT)
		fmt.Fprintln(w, "Shutting down gRPC server...")
		grpcServer.GracefulStop() // Cleanly stop the gRPC server
		return nil
	})

	// Wait for all goroutines to finish
	if err := g.Wait(); err != nil {
		return fmt.Errorf("error while running gRPC server: %w", err)
	}

	return nil
}
