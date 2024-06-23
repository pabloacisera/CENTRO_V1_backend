import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class ProtectedRouteGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.headers.authorization);

    return true;
  }
}
