export default class Validator {
  static getData(value) {
    if (value.includes(', ')) {
      console.log('есть запятая');
    }
  }

  static check(value) {
    // eslint-disable-next-line
    if (/\[?\-?\d{1,3}\.\d+\, ?\-?\d{1,3}\.\d+\]?/.test(value.trim())) {
      const arr = value.split(',');

      const coords = {
        latitude: arr[0].replace(/\[|\]| /g, ''),
        longitude: arr[1].replace(/\[|\]| /g, ''),
      };

      return coords;
    }
    return false;
  }
}
