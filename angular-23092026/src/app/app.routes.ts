import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Main } from './pages/main/main';
import { AddPost } from './pages/add-post/add-post';
import { ListPost } from './pages/list-post/list-post';
import { EditPost } from './pages/edit-post/edit-post';
import { authGuard } from './guards/auth.guard';
import { Appointment } from './pages/appointment/appointment';

export const routes: Routes = [
    {
        path: '',
        component: Login
    },
    {
        path: 'main',
        component: Main,
        canActivate: [authGuard]
    },
    {
        path: 'add-post',
        component: AddPost,
        canActivate: [authGuard]
    },
    {
        path: 'posts',
        component: ListPost,
        canActivate: [authGuard]
    },
    {
        path: 'edit-post/:id',
        component: EditPost,
        canActivate: [authGuard]
    },
    {
        path: 'appointment',
        component: Appointment,
        canActivate: [authGuard]
    },
    {
        path: '**',
        component: Login,
        canActivate: [authGuard]
    }
];