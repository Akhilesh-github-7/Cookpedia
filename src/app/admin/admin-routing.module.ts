import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DownloadListComponent } from './download-list/download-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { ManageRecipeComponent } from './manage-recipe/manage-recipe.component';
import { UsersListComponent } from './users-list/users-list.component';
import { RequestListComponent } from './request-list/request-list.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  
       // http://localhost:4200/admin
      {
          path:"",component:DashboardComponent,title:"Admin Dashboard"
      },
      // http://localhost:4200/admin/download-list
      {
          path:"download-list",component:DownloadListComponent,title:"recipe Download List"
      },
      // http://localhost:4200/admin/recipe-list
      {
        path:"recipe-list",component:RecipeListComponent,title:"recipe  List"
    },
    // http://localhost:4200/admin/user-list
    {
      path:"user-list",component:UsersListComponent,title:"User  List"
  },
   // http://localhost:4200/admin/recipe-list
   {
    path:"request-list",component:RequestListComponent,title:"Client request  List"
},
    // http://localhost:4200/admin/recipe/add
    {
      path:"recipe/add",component:ManageRecipeComponent,title:"Add recipe page"
  },
   // http://localhost:4200/admin/recipe/id/edit
   {
    path:"recipe/:id/edit",component:ManageRecipeComponent,title:"Edit recipe page"
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
