import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'age',
})
export class AgePipe implements PipeTransform {
  transform(value: string | Date | null): string {
    if (!value) {
      return 'Kein Datum hinterlegt';
    } else {
      const formatedDate = formatDate(value, 'longDate', 'de-DE');
      const today = new Date();

      let difference = 0;
      if (value instanceof Date) {
        difference = Math.abs(today.getFullYear() - value.getFullYear());

        return `${formatedDate} (${difference})`;
      } else {
        difference = Math.abs(
          today.getFullYear() - new Date(value).getFullYear()
        );
      }

      return `${formatedDate} (${difference} Jahre)`;
    }
  }

  constructor() {}
}
