import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { AuthState, createInitialState } from './auth.model';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {
    constructor() {
        super(createInitialState());
    }

    login(token: string) {
        this.update({ token });
    }

    logout() {
        this.reset();
    }
}
