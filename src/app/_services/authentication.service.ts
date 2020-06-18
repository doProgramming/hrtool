import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) : Observable<User>{
        return new Observable(obs => {
            let user = new User();
            if(email === 'test@gmail.com' && password === '123456'){
                user.firstName = "Sladjana";
                user.lastName = 'Lukac';
                user.password = '123456';
                user.email = 'test@gmail.com';
                user.phone =123456;
                localStorage.setItem('currentUser', JSON.stringify(user));
               this.currentUserSubject.next(user);
               obs.next(user);
                obs.complete();
            }else{
                let res = {
                    message : "Login Falied !"
                }
                obs.error(res);
                obs.complete();
            }
        });
    }

    logout() {
        // remove user data from local storage for log out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}