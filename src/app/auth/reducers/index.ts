import { ActionReducerMap, createReducer, on } from "@ngrx/store";
import { AuthActions } from "../action-types";
import { User } from "../model/user.model";

export const authFeatureKey = "auth";

export interface AuthState {
  user: User;
}

export const initialAuthState: AuthState = {
  user: null,
};

// export const reducers: ActionReducerMap<AuthState> = {};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    console.log("callinglogin reducer", state, action);
    return { user: action.user };
  })
);
