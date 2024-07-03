import {LoginPage}  from "../pages/LoginPage";
import {AdminPage}  from "../pages/AdminPage";
import {RouteProps} from "react-router-dom";

export enum AppRoutes{
    LOGIN = 'login',
    ADMIN = 'admin'
}

export const RoutePath: Record<AppRoutes,string> = {
    [AppRoutes.ADMIN]: '/admin',
    [AppRoutes.LOGIN]: '/'
}

export const routeConfig: Record<AppRoutes,RouteProps> = {
    [AppRoutes.ADMIN]: {
        path: RoutePath.admin,
        element: <AdminPage/>
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginPage/>
    }
}