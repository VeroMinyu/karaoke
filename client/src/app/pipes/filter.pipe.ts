import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], field: string, value: string): any[] {
    if (!items) {
      return [];
    }
    if (!value) {
      return items;
    }

    const fields = field.split(",");

    const myPattern = new RegExp(value, 'i');
    const result= items.filter(it => {
      let match = false;
      for (let i = 0; i < fields.length; i++) {
        if (it[fields[i]].match(myPattern)) {
          match = true;
        }
      }
      
      return match;
    });

    if (result.length==0){
      return [-1];
    } else{
      return result;
    }
  }

}
