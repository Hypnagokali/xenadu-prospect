export default function (inputString) {
  const regex = /:\)|;\)|:p|;p|xD|:D|:\(|:\//gi;
  const emoji = {
    ':)': '\u{1F60A}',
    ';)': '\u{1F609}',
    ':p': '\u{1F61C}',
    ';p': '\u{1F61C}',
    ':(': '\u{1F61E}',
    ':/': '\u{1F615}',
    ':D': '\u{1F604}',
    xD: '\u{1F601}',
  };

  const resultString = inputString.replaceAll(regex, (chars) => emoji[chars]);
  return resultString;
}
