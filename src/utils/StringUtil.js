import DEFAULT_VALUES from '../consts/default_values.js';

class StringUtil {
  static splitByDefaultDelimiter(string) {
    const items = string.split(DEFAULT_VALUES.DEFAULT_DELIMITER);
    const trimmedItems = items.map((e) => e.trim());

    return trimmedItems;
  }
}

export default StringUtil;
