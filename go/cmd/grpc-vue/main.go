package main

import (
	"context"
	"log"
	"os"

	"github.com/shutstart/grpc-vue/pkg/app"
)

func main() {
	ctx := context.Background()
	if err := app.Run(ctx, os.Stdout, os.Args); err != nil {
		log.Fatal(err)
		os.Exit(1)
	}
}