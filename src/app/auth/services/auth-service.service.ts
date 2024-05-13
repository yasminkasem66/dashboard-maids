import { Injectable, WritableSignal, signal } from '@angular/core';
import { ILogin } from '../models/iuser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: WritableSignal<ILogin[]> = signal([
    {
      email: 'test@gmail.com',
      password: 'test',
      id: '1',
    },
  ]);

  updateUser(user: ILogin): void {
    this.users.update((users) => [...users, user]);
  }

  get getUsers() {
    return this.users();
  }
}
