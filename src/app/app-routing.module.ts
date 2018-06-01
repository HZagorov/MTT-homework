import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { PostInputComponent } from './post-input/post-input.component';
import { ROOT_DIRECTIVE_INDICES } from '@angular/core/src/render3/instructions';
import {PostListComponent } from './post-list/post-list.component';

const routes : Routes = [
  { path: 'list', component: PostListComponent},
  { path: 'input', component: PostInputComponent},
  { path: '', redirectTo: '/list', pathMatch: 'full' },
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],

  exports: [
    RouterModule
  ]
 
})
export class AppRoutingModule { }
