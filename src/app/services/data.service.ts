import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { BadInput } from './../common/bad-input';
import { throwError } from 'rxjs'
import { Inject } from '@angular/core';

@Injectable()
export class DataService {

    constructor(@Inject(String) private url: string, private http: HttpClient) { }

    getAll() {
        return this.http.get(this.url, { responseType: 'json' })
            .pipe(
                catchError(this.handlerError)
            )
    }

    create(resource) {
        return this.http.post(this.url, JSON.stringify(resource), { responseType: 'json' })
            .pipe(
                catchError(this.handlerError)
            )
    }

    update(resource) {
        return this.http.patch(this.url + "/" + resource.id, JSON.stringify({ isRead: true }), { responseType: 'json' })
            .pipe(
                catchError(this.handlerError)
            )
    }

    delete(id) {
        return this.http.delete(this.url + "/" + id, { responseType: 'json' })
            .pipe(
                catchError(this.handlerError)
            )
    }

    handlerError(error: HttpErrorResponse) {
        console.error(error);
        if (error.status === 404)
            return throwError(new NotFoundError);
        if (error.status === 400)
            return throwError(new BadInput)
        return throwError(new AppError);
    }
}
