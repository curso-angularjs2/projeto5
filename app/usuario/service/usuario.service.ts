
import { Injectable } from '@angular/core';
import { Usuario } from '../class/usuario';


//adicine essas duas linhas
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

//retire essa linha
//import { USUARIOS } from '../mock/mock.usuarios';


@Injectable()
export class UsuarioService {
    //adicione essa linha
    private usuarioUrl = 'https://cursoangularjs2restful.herokuapp.com/usuario';

    //adicione o construtor da classe
    constructor(private http: Http) { }

    getListUsuario(): Observable<Usuario[]> {
        // retire esse return
        //return Promise.resolve(USUARIOS);

        //adicione esse trecho de código
        return this.http.get(this.usuarioUrl)
            .map(res => res.json())
            .catch(this.handleError);
    }

    //Crie esse método
    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}