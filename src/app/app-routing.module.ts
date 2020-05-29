import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { EmployeeComponent } from './employee/employee.component';


const routes: Routes = [
	{
		path: 'employee',
		component: ListComponent,
		data: { pageTitle: 'Employee' },
	},
	{
		path: 'employee/add',
		component: EmployeeComponent,
		data: { pageTitle: 'Add Employee' },
	},
	{
		path: 'employee/:id',
		component: EmployeeComponent,
		data: { pageTitle: 'Edit Employee' },
	},
	{ path: '', redirectTo: 'employee', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
