import { HttpClient } from "@angular/common/http";

/* 
    Classe genérica para serviço de requisição
*/
export class GenericService<T> {

    //private readonly API_URL :string = "http://localhost:3000";

    // TODO: Depois dar uma olhada sobre environment para ter variaveis q tenham cada url d requisição
    constructor(protected http: HttpClient, private API_URL :string) {}

    /**
     * Retorna todos os registros.
     */
    findAll() {
        return this.http.get<T[]>( `${this.API_URL}` );
    }

    /**
     * Retorna apenas um registro existente.
     */
    findOne(id: number) {
        return this.http.get<T>( `${this.API_URL}/${id}` );
    }

    private update(id: number, record: Object) {
        return this.http.put( `${this.API_URL}/${id}` , record);
    }

    private insert(record : Object) {
        return this.http.post( `${this.API_URL}` , record)
    }
    
    /**
     * Método para inserir ou atualizar.
     * @param id Identificador do objeto.
     * @param record Novo objeto a ser atualizado.
     */
    save(id :number, record: Object) {
        if (id) {
          return this.update(id, record);
        } else {
          return this.insert(record);
        }
    }
    
    delete(id :number) {
        return this.http.delete( `${this.API_URL}/${id}` );
    }
}
