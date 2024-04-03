import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'height',
})
export class HeightPipe implements PipeTransform {
  transform(value: number | null): string {
    if (!value) {
      return 'Keine Größe hinterlegt';
    } else {
      return `${value} cm`;
    }
  }

  constructor() {}
}
