import * as grpc from '@grpc/grpc-js';

export const init = async () => {
  const server = new grpc.Server();

  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
};
