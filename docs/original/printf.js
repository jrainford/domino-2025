// modern printf / sprintf replacement - chatGPT

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

    if (value.length < width) {
      const pad = (zeroPad && !leftJustify ? '0' : ' ').repeat(width - value.length);
      value = leftJustify ? value + pad : pad + value;
    }
    return value;
  });
}

function printf(format, ...args) {
  document.write(sprintf(format, ...args));
}