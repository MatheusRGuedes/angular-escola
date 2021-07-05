import { Pipe, PipeTransform } from '@angular/core';

/**
 * Classe pipe para verificação de tipo de dados
 * 
 * - pipe serve para fornecer dados em execução, após uma mudança no determinado argumento é
 *   executado o transform (pipe puro);
 * - transform irá retornar algum valor para biding 
 */

@Pipe({
  name: 'typeof'
})
export class TypeofPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    let type = typeof value;
    console.log("Pipe works! " + type);

    if (type == "object") {
      return value.length == undefined ? "object" : "array";
    }

    return type;
  }
}