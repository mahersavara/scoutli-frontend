import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthStore } from './auth.store';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private authStore: AuthStore, private http: HttpClient) { }

    login(credentials: any) {
        // Example API call
        return this.http.post<any>('/api/login', credentials).pipe(
            tap(response => {
                this.authStore.login(response.token);
                // this.authStore.update({ user: response.user });
            })
        );
    }

    logout() {
        this.authStore.logout();
    }
}
