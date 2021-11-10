import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { RespuestaPosts, Post } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  paginaPosts = 0;
  nuevoPost = new EventEmitter<Post>();

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { }
  getPosts(pull: boolean = false) {

    if (pull) {
      this.paginaPosts = 0;
    }

    this.paginaPosts ++;

    return this.http.get<RespuestaPosts>(`${ URL }/post/?pagina=${ this.paginaPosts }`);

   }
   crearPost(post) {
     const headers = new HttpHeaders({
        'x-token': this.usuarioService.token
     });
     return new Promise( resolve => {

       this.http.post(`${ URL }/post`, post, { headers })
      .subscribe(resp => {
        console.log(resp)
        this.nuevoPost.emit(resp['post']);
        resolve(true);
      });
     });


   }
}
