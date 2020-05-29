import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
	apiUrl = 'http://anubhuti.econ11.com/employee/';

	constructor(private http: HttpClient) { }

	getList() {
		let url = this.apiUrl;

		return this.http.get(url)
			.pipe(catchError(this.handleError));
	}

	getRowById(id) {
		let url = this.apiUrl;

		return this.http.get(url + '/' + id)
	}

	save(data) {
		let url = this.apiUrl;

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			})
		};

		return this.http.post(url, data, httpOptions)
			.pipe(catchError(this.handleError));
	}

	update(data, id) {
		let url = this.apiUrl + '/' + id;

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			})
		};

		return this.http.put(url, data, httpOptions)
			.pipe(catchError(this.handleError));
	}

	delete(id) {
		let url = this.apiUrl + '/' + id;

		return this.http.delete(url)
			.pipe(catchError(this.handleError));
	}

	handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		if (error instanceof Response) {
			return Promise.reject({ 'status': error.status, 'statusText': error.statusText })
		}
		return Promise.reject({ 'status': '', 'statusText': (error.message || error) });
	}
}