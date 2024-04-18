import * as grpc from '@grpc/grpc-js';
import * as loader from '@grpc/proto-loader';
import authService from '../api/services/auth/auth.service';
import { promiseCall } from '../utilities/grpc.utility';
import path from 'path';

const packageDefinition = loader.loadSync(path.join(process.env.PROTOS, 'auth.proto'));
const proto = grpc.loadPackageDefinition(packageDefinition) as any;

export const init = async (server: any) => {
  server.addService(proto.Auth.service, {
    assignRole: promiseCall(authService.assignRole),
    getUserRoles: promiseCall(authService.getUserRoles),
    unAssignRole: promiseCall(authService.unAssignRole),
  });
};
