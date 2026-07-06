import { Component, input } from '@angular/core';
import { User } from '../../core/users.model';


@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {
  user = input.required<User>();
}
