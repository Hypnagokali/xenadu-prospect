/* code find on: https://gist.github.com/daraul/7057c25495dc0284d1c4e77997d25938 */

export default function (inputString) {
  const map = {
    '&amp;': '&',
    '&#038;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&#8217;': '’',
    '&#8216;': '‘',
    '&#8211;': '–',
    '&#8212;': '—',
    '&#8230;': '…',
    '&#8221;': '”',
  };
  return inputString.replace(/&[\w\d#]{2,5};/g, (m) => map[m]);
}
