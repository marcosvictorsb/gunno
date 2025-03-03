import { createNamespace, getNamespace } from 'cls-hooked';
import { NextFunction, Request, Response } from 'express';

const NAMESPACE = 'myAppNamespace';
const ns = createNamespace(NAMESPACE);

export const getNamespaceInstance = () => getNamespace(NAMESPACE);

export const setRequestContext = (context: { requestId: string, method: string, path: string }) => {
  const namespace = getNamespaceInstance();
  if (namespace) {
    namespace.set('request_id', context.requestId);
    namespace.set('method', context.method);
    namespace.set('path', context.path);
  }
};

export const getRequestContext = (): { requestId?: string, method?: string, path?: string } => {
  const namespace = getNamespaceInstance();
  return {
    requestId: namespace ? namespace.get('request_id') : undefined,
    method: namespace ? namespace.get('method') : undefined,
    path: namespace ? namespace.get('path') : undefined,
  };
};

export const asyncMiddleware = (request: Request, response: Response, next: NextFunction) => {
  ns.run(() => {
    setRequestContext({
      requestId: request.headers['x-request-id'] as string,
      method: request.method,
      path: request.url,
    });
    next();
  });
};