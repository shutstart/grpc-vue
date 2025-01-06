import { BasicClient, EchoResponse } from "~/grpc/basic";

export default defineEventHandler(async (event) => {
  return new Promise((resolve, reject) => {
    BasicClient.Echo(
      { message: "Hello from server-side!" },
      (error, response: EchoResponse | undefined) => {
        if (error) {
          console.error("gRPC Error:", error);
          reject(error);
        } else {
          console.log("gRPC Response:", response);
          resolve(response);
        }
      }
    );
  });
});
