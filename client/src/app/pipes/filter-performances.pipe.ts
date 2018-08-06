import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPerformances'
})
export class FilterPerformancesPipe implements PipeTransform {

  transform(items: any[], field: string, value: string): any[] {
    if (!items) {
      return [];
    }
    if (!value) {
      return items;
    }

    const fields = field.split("-");
    const myPattern = new RegExp(value, 'i');
    return items.filter(it => {
      let match = false;

      for (let i = 0; i < fields.length; i++) {
        const subFields = fields[i].split(",");

        if (it[subFields[0]][subFields[1]].match(myPattern)) {
          match = true;
        }
      }
      
      return match;
    });
  }

}
