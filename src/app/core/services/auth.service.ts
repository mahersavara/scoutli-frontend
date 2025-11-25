import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api/users';
    private tokenKey = 'auth_token';
    private userSubject = new BehaviorSubject<any>(null);
    public user$ = this.userSubject.asObservable();

    constructor(private http: HttpClient, private router: Router) {
        this.loadUser();
    }

    register(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, data);
    }

    login(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, data).pipe(
            tap((response: any) => {
                if (response.token) {
                    this.setToken(response.token);
                }
            })
        );
    }

    logout() {
        localStorage.removeItem(this.tokenKey);
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) return false;
        try {
            const decoded: any = jwtDecode(token);
            return decoded.exp * 1000 > Date.now();
        } catch (e) {
            return false;
        }
    }

    private setToken(token: string) {
        localStorage.setItem(this.tokenKey, token);
        this.loadUser();
    }

    private loadUser() {
        const token = this.getToken();
        if (token && this.isAuthenticated()) {
            const decoded = jwtDecode(token);
            this.userSubject.next(decoded);
        } else {
            this.userSubject.next(null);
        }
    }
}
