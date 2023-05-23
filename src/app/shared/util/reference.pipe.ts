import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reference',
  standalone: true,
})
export class ReferencePipe implements PipeTransform {
  transform(value: string = ''): string {
    const { host = '' } = new URL(value) ?? {};
    return host;
  }
}
