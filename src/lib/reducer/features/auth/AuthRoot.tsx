import {Reducer} from 'redux';
import { authReducer } from "./auth.reducer";
import { authActionType } from '@/lib/action/auth.action';
import { AuthRoot } from '@/lib/types/rootTypes';

export const authRootReducer: Reducer<AuthRoot, authActionType> = (rootState, action) => {
  return {
    authState: authReducer(rootState && rootState.authState, action),
  };
};
