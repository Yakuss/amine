import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { AddBookComponent } from './add-book/add-book.component';
import { UpdatebookComponent } from './updatebook/updatebook.component';
import { RechercheParBooktypeComponent } from './recherche-par-booktype/recherche-par-booktype.component';
import { RechercheParTitleComponent } from './recherche-par-title/recherche-par-title.component';
import { ListeTypesComponent } from './liste-types/liste-types.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { BookGuard } from './book.guard';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';

const routes: Routes = [
  {path: "books" , component : BooksComponent},
  {path : "add-book" , component : AddBookComponent , canActivate : [BookGuard]},
  { path :"updatebook/:id" , component : UpdatebookComponent , canActivate : [BookGuard]},
  { path :"rechercheParBookType" , component : RechercheParBooktypeComponent},
  { path : "rechercheParTitle" , component : RechercheParTitleComponent},
  {path : "listTypes" , component : ListeTypesComponent , canActivate : [BookGuard]},
  { path : "login" , component : LoginComponent},
  {path: 'app-forbidden', component: ForbiddenComponent},
  {path:'register',component:RegisterComponent},
  { path: 'verifEmail', component: VerifEmailComponent },
  {path : "" , redirectTo : "books" , pathMatch : "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
