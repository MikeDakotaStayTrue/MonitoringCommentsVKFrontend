import {LOGIN_ROUTE, REGISTRATION_ROUTE, PROFILE_ROUTE, MONITOR_ROUTE, 
    MAIL_CONFIRM_ROUTE, BOARD_ROUTE, LIST_ROUTE, CHANGE_PASSWORD_ROUTE} from "./utils/consts";
import Auth from "./pages/Auth";
import List from "./pages/List";
import Profile from "./pages/Profile";
import Confirm from "./pages/Confirm";
import Board from "./pages/Board";
import Monitor from "./pages/Monitor";
import ChangePassword from "./pages/ChangePassword";

export const authRoutes = [
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
    {
        path: BOARD_ROUTE,
        Component: Board
    },
    {
        path: LIST_ROUTE,
        Component: List
    },
    {
        path: MONITOR_ROUTE + '/:id',
        Component: Monitor
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: MAIL_CONFIRM_ROUTE,
        Component: Confirm
    },
    {
        path: CHANGE_PASSWORD_ROUTE,
        Component: ChangePassword
    }
]
