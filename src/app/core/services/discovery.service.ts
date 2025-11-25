import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class DiscoveryService {
    private apiUrl = 'http://localhost:8080/api/discoveries';

    constructor(private http: HttpClient, private authService: AuthService) { }

    private getHeaders(): HttpHeaders {
        const token = this.authService.getToken();
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
    }

    getDiscoveries(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    createDiscovery(data: any): Observable<any> {
        return this.http.post(this.apiUrl, data, { headers: this.getHeaders() });
    }

    // Add other methods as needed (getById, update, delete)
}
