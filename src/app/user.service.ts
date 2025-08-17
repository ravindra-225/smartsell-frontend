import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/auth'; // Adjust endpoint

  constructor(private http: HttpClient) {}

  getSellers(): Observable<User[]> {
    // Assuming an endpoint to get all users or sellers
    return this.http.get<User[]>(this.apiUrl);
  }
}