import { ActionReducer, MetaReducer } from '@ngrx/store';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

const stateKeysToPersist = ['users', 'lang', 'selectedCurrency', 'auth'];

export function localStorageSyncMetaReducer(
  reducer: ActionReducer<any>,
  localStorageService: LocalStorageService
): ActionReducer<any> {
  return (state, action) => {
    const nextState = reducer(state, action);
    const stateToSave = stateKeysToPersist.reduce((acc: any, key: string) => {
      if (nextState[key]) {
        acc[key] = nextState[key];
      }
      return acc;
    }, {});

    localStorageService.saveState(stateToSave);
    return nextState;
  };
}

export function createMetaReducers(
  localStorageService: LocalStorageService
): MetaReducer[] {
  return [
    (reducer: ActionReducer<any>) =>
      localStorageSyncMetaReducer(reducer, localStorageService),
  ];
}

export function hydrateState(localStorageService: LocalStorageService): any {
  return localStorageService.loadState();
}
