import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AuthStore } from './auth.store';
import { AuthState } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {
    isLoggedIn$ = this.select(state => !!state.token);
    selectUser$ = this.select('user');

    constructor(protected override store: AuthStore) {
        super(store);
    }
}
