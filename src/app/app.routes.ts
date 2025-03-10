import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ProfileComponent } from './profile/profile.component';
import { SavedRecipeComponent } from './saved-recipe/saved-recipe.component';
import { ViewComponent } from './view/view.component';
import { PnfComponent } from './pnf/pnf.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

    // lazy loaded admiule
    {
        path:'admin',canActivate:[authGuard], loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)

    },

    // http://localhost:4200/
    {
        path:"",component:HomeComponent,title:"Home"
    },
    {
        path:"about",component:AboutComponent,title:"About"
    },
    {
        path:"contact",component:ContactComponent,title:"Contact"
    },
    {
        path:"login",component:LoginComponent,title:"Login"
    },
    {
        path:"register",component:RegisterComponent,title:"Register"
    },
    {
        path:"all-recipes",component:RecipesComponent,title:"All Recipes"
    },
    {
        path:"profile",canActivate:[authGuard],component:ProfileComponent,title:"Profile" //authorized
    },
    {
        path:"save-recipe",canActivate:[authGuard],component:SavedRecipeComponent,title:"Save Recipes collection"  //authorized
    },
    {
        path:"recipe/:id/view",canActivate:[authGuard],component:ViewComponent,title:"View Recipe"
    },
    {
        path:"**",component:PnfComponent,title:"Page not found"
    },
];
