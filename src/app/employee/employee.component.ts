import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {
	FormBuilder,
	FormGroup,
} from '@angular/forms';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

demoForm: FormGroup;
id: number = 0;

constructor(private route: ActivatedRoute,
	private formBuilder: FormBuilder,
	public router: Router,
	private api: ApiService) {

	// To initialize FormGroup
	this.demoForm = formBuilder.group({
		'id': [0], 
		'title': ['Mr'],
		'first_name': [''],
		'last_name': [''],
		'address1': [''],
		'address2': [''],
		'designation': ['UI Developer'],
		'dob': [''],
		});

		this.route.params.subscribe((params) => {
			this.id = params.id || 0;

			if (this.id != 0) {
				this.api.getRowById(this.id).subscribe((res) => {
					if (res['data']) {
						this.demoForm.setValue({
							title: res['data'].title,
							first_name: res['data'].first_name,
							last_name: res['data'].last_name,
							address1: res['data'].address1,
							address2: res['data'].address2,
							designation: res['data'].designation,
							dob: res['data'].dob,
						});
					} else {
						this.id = 0;
						console.log('Record not found !');
					}
				}, (err) => {
					console.log(err);
				});
			}
		});
  }

  ngOnInit() {
  }

	onFormSubmit(this.demoForm) {
		if (this.id != 0) {
			this.api.update(this.demoForm.value, this.id).subscribe((res) => {
				console.log(res.data['message'], 'success');
				this.router.navigate(['list']);
			}, (err) => {
				console.log(err);
				console.log('Server error occured!');
			});
		} else {
			this.api.save(this.demoForm.value).subscribe((res) => {
				console.log(res.data['message'], 'success');
				this.router.navigate(['list']);
			}, (err) => {
				console.log(err);
				console.log('Server error occured!');
			});
		}
	 }

	onDelete() {
		if (confirm("Are you sure to delete ?")) {
			this.api.delete(this.id).subscribe((res) => {
				console.log(res.data['message'], 'success');
				this.router.navigate(['list']);
			}, (err) => {
				console.log(err);
			});
		}
	}

}