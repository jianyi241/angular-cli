import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'arrayFilter'
})
export class ArrayFilterPipe implements PipeTransform {

    transform(value: any[], func: any, flag: boolean): any[] {
        return value.filter((i) => func(i) === flag);
    }

}
