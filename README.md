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
        HttpModule // esse import também
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

//adicine essas duas linhas
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

//retire essa linha
//import { USUARIOS } from '../mock/mock.usuarios';


@Injectable()
export class UsuarioService {
    //adicione essa linha
    private usuarioUrl = 'https://cursoangularjs2restful.herokuapp.com/usuario';

    //adicione o construtor da classe
    constructor(private http: Http) { }

    getListUsuario(): Promise<Usuario[]> {
        // retire esse return
        //return Promise.resolve(USUARIOS);

        //adicione esse trecho de código
        return this.http.get(this.usuarioUrl)
            .toPromise()
            .then(response => response.json().data as Usuario[])
            .catch(this.handleError);
    }

    //Crie esse método
    private handleError(error: any): Promise<any> {
        console.error('A casa caiu! Tem algo errado que nao está certo!', error); 
        return Promise.reject(error.message || error);
    }

}
~~~

Pronto! Agora falta somente mudarmos nossa classe de usuário:

~~~javascript
export class Usuario {
  _id: string;
  nome: string;
  idade:number;
}

~~~