import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';


import { ApiService } from '../api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  rows = [];
	constructor(private api: ApiService,
		private router: Router,
		private route: ActivatedRoute) {
	}

  	ngOnInit() {
		this.getList();
	}

	onRowClicked(row) {
		this.router.navigate([this.router.url, row.id]);
	}

	getList() {
		this.api.getList().subscribe((res) => {
			this.rows = res.data;
		}, (err) => {
			console.log('Server error occured!');
		});
	}
}
