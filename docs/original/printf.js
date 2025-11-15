// modern printf / sprintf replacement with correct HTML space padding for %3d, %5d, etc.

function sprintf(format, ...args) {
  let i = 0;
  return format.replace(/%([-0]?)(\*|\d+)?([sdxXoc%])/g, (match, flag, width, spec) => {
    if (spec === '%') return '%';
    let value = args[i++];
    let leftJustify = flag === '-';
    let zeroPad = flag === '0';
    width = width === '*' ? args[i++] : parseInt(width, 10) || 0;

    switch (spec) {
      case 's':
        value = value == null ? '' : String(value);
        break;
      case 'd':
      case 'u':
        value = parseInt(value) || 0;
        if (spec === 'u' && value < 0) value += 2**32;
        value = String(value);
        break;
      case 'x':
        value = (parseInt(value) || 0).toString(16);
        break;
      case 'X':
        value = (parseInt(value) || 0).toString(16).toUpperCase();
        break;
      case 'o':
        value = (parseInt(value) || 0).toString(8);
        break;
      case 'c':
        value = String.fromCharCode(parseInt(value) || 0);
        break;
    }

    let padlen = width - value.length;
    if (padlen > 0) {
      let padChar = zeroPad && !leftJustify ? '0' : ' ';
      let padding = padChar.repeat(padlen);
      if (leftJustify) {
        value = value + padding;
      } else {
        value = padding + value;
      }
    }

    // Replace leading/trailing spaces with &nbsp; for proper HTML rendering
    if (!leftJustify) {
      value = value.replace(/^ +/, m => '&nbsp;'.repeat(m.length));
    } else {
      value = value.replace(/ +$/g, m => '&nbsp;'.repeat(m.length));
    }

    return value ;
  });
}
