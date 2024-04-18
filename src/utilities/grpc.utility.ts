export function promiseCall(f: any) {
  return (call: any, callback: any) => {
    f(call.request)
      .then((result: any) => callback(null, result))
      .catch((e: Error) => {
        callback({
          message: e.message,
        });
      });
  };
}
