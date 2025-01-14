import * as grpc from '@grpc/grpc-js';
import * as loader from '@grpc/proto-loader';
import userService from '../api/services/user/user.service';
import { promiseCall } from '../utilities/grpc.utility';
import path from 'path';

const protosPath = process.env.PROTOS || ''; // Set a default value for process.env.PROTOS if it is undefined
const packageDefinition = loader.loadSync(path.join(protosPath, 'user.proto'));
const proto = grpc.loadPackageDefinition(packageDefinition) as any;

export const init = async (server: any) => {
  server.addService(proto.User.service, {
    signIn: promiseCall(userService.login),
    create: promiseCall(userService.create),
    detail: promiseCall(userService.detail),
    getById: promiseCall(userService.getById),
    getTenantsByUserId: promiseCall(userService.getTenantsByUserId),
    list: promiseCall(userService.list),
    remove: promiseCall(userService.remove),
    update: promiseCall(userService.update),
  });
};
