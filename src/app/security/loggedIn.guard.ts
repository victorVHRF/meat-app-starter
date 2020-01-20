import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {LoginService} from './login/login.service';

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {

    constructor(private logginService: LoginService) {

    }

    checkAuthentication(path: string): boolean {
        const loggeIn = this.logginService.isLoggedIn();
        if (!loggeIn) {
            this.logginService.handleLogin(`/${path}`);
        }
        return loggeIn;
    }

        canLoad(route: Route): boolean {
        console.log('canload');
            return this.checkAuthentication(route.path);
        }

        canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
        console.log('canActivete');
            return this.checkAuthentication(activatedRoute.routeConfig.path);
        }
}
