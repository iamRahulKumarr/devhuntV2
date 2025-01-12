import { Routes } from "@angular/router";
import { LayoutComponent } from "./modules/layout/layout.component";

export const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children:[
      {
        path:"",
        title:"Pages",
        loadChildren: ()=> import('./modules/pages/pages.module').then((m)=> m.PagesModule)
      },
      {
        path: "auth",
        title: "Auth",
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
      },
    ]
  }

]
