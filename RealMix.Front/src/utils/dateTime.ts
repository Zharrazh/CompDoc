import parseFn from 'date-fns/parseISO';
import formatFn from 'date-fns/format';

export class DateTime {
  public static parse(dateTime: string) {
    const value = parseFn(dateTime);
    return value;
  }

  public static format(date: Date, format?: 'date' | 'datetime' | 'iso') {
    let useFormat: string;
    switch (format) {
      case 'date':
        useFormat = 'MM/dd/yyyy';
        break;
      case 'datetime':
        useFormat = 'MM/dd/yyyy HH:mm:ss';
        break;
      case 'iso':
        useFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx";
        break;
      default:
        useFormat = 'MM/dd/yyyy HH:mm';
        break;
    }
    const value = formatFn(date, useFormat);
    return value;
  }
}
