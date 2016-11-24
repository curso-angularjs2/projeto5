# Cosumindo Rest com AngularJS

Agora vamos criar uma cópia do projeto4, porém vamos modificar alguns arquivos, para que possamos consumir um serviço rest que está no seguinte endereço:

<a href="https://cursoangularjs2restful.herokuapp.com/usuario">demo</a>

Vamos ver o quanto é simples consumir esse serviço com as seguintes alterações:

* projeto5/app/config/app.module.ts

~~~javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './../component/app.component';
import { UsuarioComponent } from '../../usuario/component/usuario.component';
import { UsuarioService } from '../../usuario/service/usuario.service';

//adicione essa linha
import { HttpModule }    from '@angular/http';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        UsuarioComponent
    ],
    providers:[
        UsuarioService
        
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

~~~

Agora vamos para a nossa service

* projeto5/app/usuario/service/usuario.service.ts

~~~javascript


import { Injectable } from '@angular/core';
import { Usuario } from '../class/usuario';


//adicione essas duas linhas
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
        /*return Promise.resolve(USUARIOS);*/

        //adicione esse trecho de código
        return this.http.get(this.usuarioUrl)
            .map(res => res.json())
            .catch(this.handleError);
    }

    //Crie esse método
    private handleError(error: Response | any) {
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
~~~

Pronto! Agora vamos mudar a nossa classe de usuário:

~~~javascript
export class Usuario {
  _id: string;
  nome: string;
  idade:number;
}

~~~

E agora nosso usuario.component.ts

~~~javascript
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../class/usuario';
import { UsuarioService } from '../service/usuario.service';


@Component({
    selector: 'usuario-component',
    templateUrl: 'app/usuario/templates/usuario.template.html',
    providers: [UsuarioService]
})
export class UsuarioComponent implements OnInit {
    usuarios: Usuario[];
    usuarioObject = new Usuario();
    edit = false;
    errorMessage: string;

    constructor(private usuarioService: UsuarioService) {

    }

    getListUsuarios(): void {
        this.usuarioService.getListUsuario()
            .subscribe(
            usuarios => this.usuarios = usuarios,
            error => this.errorMessage = <any>error);
        
    }

    deletarUsuario(index): void {
        this.usuarios.splice(index, 1);
    }

    salvarUsuario(usuario): void {
        this.usuarios.push(usuario);
        this.usuarioObject = new Usuario();
    }

    editarUsuario(usuario, persistir = false): void {
        this.edit = true;
        this.usuarioObject = usuario;
        if (persistir) {
            this.usuarioObject = new Usuario();
            this.edit = false;
        }
    }

    ngOnInit(): void {
        this.getListUsuarios();
    }

}
~~~

Pronto! Viu como é bem simples consumir um serviço Rest com AngularJS?

Agora em nosso próximo projeto faremos um CRUD completo consumindo esse mesmo serviço Rest.
