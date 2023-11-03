import getTime from './getTime';

export default class TextPost {
  static create(content, geo) {
    return {
      content,
      time: getTime(),
      geo,
    };
  }
}
