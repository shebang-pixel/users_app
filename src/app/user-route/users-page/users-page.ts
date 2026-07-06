import {
  Component, signal,
  inject
} from '@angular/core';
import { User } from '../../core/users.model';
import { UsersService } from '../../core/users-service';
import { UserCard } from '../user-card/user-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-page',
  imports: [UserCard, RouterLink],
  templateUrl: './users-page.html',
  styleUrl: './users-page.css',
})
export class UsersPage {
  // page states
  users = signal<User[]>([])
  loading = signal(true)
  error = signal('')

  usersService = inject(UsersService);

  // READ (All): Fetch the list of users when the component initializes
  ngOnInit() {
    this.usersService
      .getUsers()
      .subscribe({
        next: (usersData) => {
          this.users.set(usersData)
          this.loading.set(false)
        },
        error: (errMsg: string) => {
          this.error.set(`Fetch Failed: ${errMsg}`)
          this.loading.set(false)
        }
      })
  }
}
