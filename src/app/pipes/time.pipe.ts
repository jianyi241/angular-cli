import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'timePipe'
})
export class TimePipe implements PipeTransform {

    transform(value: string, type: string): string {
        const minutes = moment().diff(moment(value, 'YYYY-MM-DD\'T\'HH:mm:ssSSS'), 'minutes');
        if (type === 'asc') {
            return minutes + 'min';
        } else {
            return (minutes - 10) + 'min';
        }

    }

}
