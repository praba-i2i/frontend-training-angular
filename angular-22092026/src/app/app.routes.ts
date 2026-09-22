import { Routes } from '@angular/router';

import { AddPost } from './pages/add-post/add-post';
import { ListPost } from './pages/list-post/list-post';
import { EditPost } from './pages/edit-post/edit-post';

export const routes: Routes = [
  {
    path: 'add-post',
    component: AddPost
  },
  {
    path: 'posts',
    component: ListPost
  },
  {
    path: 'edit-post/:id',
    component: EditPost
  }
];