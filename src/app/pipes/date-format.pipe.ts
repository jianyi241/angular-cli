import {Pipe, PipeTransform} from '@angular/core';
import * as moment from "moment";

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

    transform(value: string | Date, format?: string): unknown {
        format = format || 'DD MMM YYYY';
        return moment(value).format(format);
    }

}
