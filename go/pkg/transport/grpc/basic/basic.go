package basic

import (
	"context"
	"fmt"
	"math/rand"

	"github.com/shutstart/grpc-vue/api/grpc/basic/golang/basic"
)

type Server struct {
	basic.UnimplementedBasicServer
}

// New creates a new instance of the Server.
func New() *Server {
	return &Server{}
}

// Echo handles the EchoRequest and returns an EchoResponse with a randomly generated Echo value based on the message.
func (s *Server) Echo(ctx context.Context, req *basic.EchoRequest) (*basic.EchoResponse, error) {

	// Generate a random integer
	randomNumber := rand.Intn(1000) // Generates a random number between 0 and 999

	// Construct the echo message based on the input message and random number
	echoMessage := fmt.Sprintf("echo %d from message '%s'", randomNumber, req.Message)

	return &basic.EchoResponse{
		Message: req.Message,
		Echo:    echoMessage,
	}, nil
}
