import { Component, computed, inject, input } from '@angular/core';
import { UsersService } from '../../core/users-service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-detail-page',
  imports: [RouterLink],
  templateUrl: './user-detail-page.html',
  styleUrl: './user-detail-page.css',
})
export class UserDetailPage {
  id = input.required<string>()
  private usersService = inject(UsersService)
  private router = inject(Router)

  // Read: Fetch single user data based on the route ID
  user = toSignal(
    toObservable(this.id).pipe(
      switchMap((userId) => this.usersService.getUserById(userId))
    )
  )

  // Delete: Remove the user and navigate back to the list
  deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.usersService.deleteUser(id).subscribe({
        next: () => {
          console.log("User Deleted successfully");
          this.router.navigate(['/users']);
        },
        error: (err) => {
          console.error("Error deleting user", err);
        }
      });
    }
  }
}
