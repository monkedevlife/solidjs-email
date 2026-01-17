type PaddingType = string | number | undefined;

interface PaddingProperties {
  padding?: PaddingType;
  paddingTop?: PaddingType;
  paddingRight?: PaddingType;
  paddingBottom?: PaddingType;
  paddingLeft?: PaddingType;
}

export function convertToPx(value: PaddingType): number {
  if (!value) return 0;
  if (typeof value === 'number') return value;

  const matches = /^([\d.]+)(px|em|rem|%)$/.exec(value);
  if (matches && matches.length === 3) {
    const numValue = Number.parseFloat(matches[1]);
    const unit = matches[2];

    switch (unit) {
      case 'px':
        return numValue;
      case 'em':
      case 'rem':
        return numValue * 16;
      case '%':
        return (numValue / 100) * 600;
      default:
        return numValue;
    }
  }
  return 0;
}

function parsePaddingValue(value: PaddingType) {
  if (typeof value === 'number') {
    return {
      paddingTop: value,
      paddingBottom: value,
      paddingLeft: value,
      paddingRight: value,
    };
  }

  if (typeof value === 'string') {
    const values = value.trim().split(/\s+/);

    if (values.length === 1) {
      return {
        paddingTop: values[0],
        paddingBottom: values[0],
        paddingLeft: values[0],
        paddingRight: values[0],
      };
    }

    if (values.length === 2) {
      return {
        paddingTop: values[0],
        paddingRight: values[1],
        paddingBottom: values[0],
        paddingLeft: values[1],
      };
    }

    if (values.length === 3) {
      return {
        paddingTop: values[0],
        paddingRight: values[1],
        paddingBottom: values[2],
        paddingLeft: values[1],
      };
    }

    if (values.length === 4) {
      return {
        paddingTop: values[0],
        paddingRight: values[1],
        paddingBottom: values[2],
        paddingLeft: values[3],
      };
    }
  }

  return {
    paddingTop: undefined,
    paddingBottom: undefined,
    paddingLeft: undefined,
    paddingRight: undefined,
  };
}

export function parsePadding(properties: PaddingProperties) {
  let paddingTop: string | number | undefined;
  let paddingRight: string | number | undefined;
  let paddingBottom: string | number | undefined;
  let paddingLeft: string | number | undefined;

  for (const [key, value] of Object.entries(properties)) {
    if (key === 'padding') {
      ({ paddingTop, paddingBottom, paddingLeft, paddingRight } =
        parsePaddingValue(value));
    } else if (key === 'paddingTop') {
      paddingTop = value;
    } else if (key === 'paddingRight') {
      paddingRight = value;
    } else if (key === 'paddingBottom') {
      paddingBottom = value;
    } else if (key === 'paddingLeft') {
      paddingLeft = value;
    }
  }

  return {
    paddingTop: paddingTop ? convertToPx(paddingTop) : undefined,
    paddingRight: paddingRight ? convertToPx(paddingRight) : undefined,
    paddingBottom: paddingBottom ? convertToPx(paddingBottom) : undefined,
    paddingLeft: paddingLeft ? convertToPx(paddingLeft) : undefined,
  };
}
