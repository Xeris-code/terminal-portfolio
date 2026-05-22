import { WebState, WebStateAction } from "@/lib/types";

export function webStateReducer (state: WebState, action: WebStateAction): WebState {
    switch (action.type) {
        case "SET_ACTIVE_NAV_MENU":
            return {...state, activeMenu: action.value}
        default:
            return state
    }
}