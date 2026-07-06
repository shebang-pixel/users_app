import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userEndpoint = "http://localhost:3000/users";
  private http = inject(HttpClient);

  // READ (All): Fetch all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userEndpoint);
  }

  // READ (Single): Fetch a single user by ID
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.userEndpoint}/${id}`);
  }

  // CREATE: Add a new user
  addUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.userEndpoint, user);
  }

  // UPDATE: Update an existing user using PATCH for partial updates
  updateUser(id: string, user: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.userEndpoint}/${id}`, user);
  }

  // DELETE: Remove a user
  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.userEndpoint}/${id}`);
  }
}
