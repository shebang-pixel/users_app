import { Routes } from '@angular/router';
import { UsersPage } from './user-route/users-page/users-page';
import { UserDetailPage } from './user-route/user-detail-page/user-detail-page';
import { UserForm } from './user-route/user-form/user-form';


export const routes: Routes = [
    {
        path: 'users',
        component: UsersPage
    },
    {
        path: 'users/add',
        component: UserForm
    },
    {
        path: 'users/:id',
        component: UserDetailPage
    },
    {
        path: 'users/add/:id',
        component: UserForm
    },

];
