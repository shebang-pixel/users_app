import { Component, inject, input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../core/users-service';

@Component({
  selector: 'app-user-form',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm implements OnInit {
  id = input<string>();
  private fb = inject(FormBuilder);
  private usersService = inject(UsersService);
  private router = inject(Router);

  userForm = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  ngOnInit() {
    const userId = this.id();
    console.log('UserForm loaded with id:', userId);
    // READ (Single): If an ID is provided, fetch the user data to populate the form for editing
    if (userId) {
      this.usersService.getUserById(userId).subscribe({
        next: (user) => {
          console.log('Fetched user data:', user);
          this.userForm.patchValue(user);
        },
        error: (err) => console.error('Error fetching user:', err)
      });
    }
  }

  onSubmit() {
    console.log('Form Submit Triggered');
    if (this.userForm.invalid) {
      console.warn('Form is invalid:', this.userForm.value);
      return;
    }

    const userData = this.userForm.getRawValue();
    const userId = this.id();

    if (userId) {
      console.log('Updating user:', userId, userData);
      // UPDATE: If ID exists, update the existing user using the service's update method
      this.usersService.updateUser(userId, userData).subscribe({
        next: () => {
          console.log('Update success, navigating...');
          this.router.navigate(['/users', userId]);
        },
        error: (err) => console.error('Update failed:', err)
      });
    } else {
      console.log('Adding new user:', userData);
      // CREATE: If no ID, create a new user
      this.usersService.addUser(userData).subscribe({
        next: () => {
          console.log('Create success, navigating...');
          this.router.navigate(['/users']);
        },
        error: (err) => console.error('Create failed:', err)
      });
    }
  }
}
