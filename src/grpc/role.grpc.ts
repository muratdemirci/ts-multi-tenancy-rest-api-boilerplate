import * as grpc from '@grpc/grpc-js';
import * as loader from '@grpc/proto-loader';
import roleService from '../api/services/auth/role.service';
import { promiseCall } from '../utilities/grpc.utility';
import path from 'path';

const packageDefinition = loader.loadSync(path.join(process.env.PROTOS, 'role.proto'));
const proto = grpc.loadPackageDefinition(packageDefinition) as any;

export const init = async (server: any) => {
  server.addService(proto.Role.service, {
    getById: promiseCall(roleService.getById),
  });
};
