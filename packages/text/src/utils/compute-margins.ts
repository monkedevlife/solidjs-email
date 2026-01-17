type MarginType = string | number | undefined;

interface MarginProperties {
  margin?: MarginType;
  marginTop?: MarginType;
  marginRight?: MarginType;
  marginBottom?: MarginType;
  marginLeft?: MarginType;
  'margin-top'?: MarginType;
  'margin-right'?: MarginType;
  'margin-bottom'?: MarginType;
  'margin-left'?: MarginType;
}

interface MarginResult {
  'margin-top': MarginType;
  'margin-right': MarginType;
  'margin-bottom': MarginType;
  'margin-left': MarginType;
}

function parseMarginValue(value: MarginType): MarginResult {
  if (typeof value === 'number') {
    return {
      'margin-top': value,
      'margin-bottom': value,
      'margin-left': value,
      'margin-right': value,
    };
  }

  if (typeof value === 'string') {
    const values = value.trim().split(/\s+/);

    if (values.length === 1) {
      return {
        'margin-top': values[0],
        'margin-bottom': values[0],
        'margin-left': values[0],
        'margin-right': values[0],
      };
    }

    if (values.length === 2) {
      return {
        'margin-top': values[0],
        'margin-right': values[1],
        'margin-bottom': values[0],
        'margin-left': values[1],
      };
    }

    if (values.length === 3) {
      return {
        'margin-top': values[0],
        'margin-right': values[1],
        'margin-bottom': values[2],
        'margin-left': values[1],
      };
    }

    if (values.length === 4) {
      return {
        'margin-top': values[0],
        'margin-right': values[1],
        'margin-bottom': values[2],
        'margin-left': values[3],
      };
    }
  }

  return {
    'margin-top': undefined,
    'margin-bottom': undefined,
    'margin-left': undefined,
    'margin-right': undefined,
  };
}

export function computeMargins(properties: MarginProperties): MarginResult {
  let result: MarginResult = {
    'margin-top': undefined,
    'margin-right': undefined,
    'margin-bottom': undefined,
    'margin-left': undefined,
  };

  for (const [key, value] of Object.entries(properties)) {
    if (key === 'margin') {
      result = parseMarginValue(value);
    } else if (key === 'marginTop' || key === 'margin-top') {
      result['margin-top'] = value;
    } else if (key === 'marginRight' || key === 'margin-right') {
      result['margin-right'] = value;
    } else if (key === 'marginBottom' || key === 'margin-bottom') {
      result['margin-bottom'] = value;
    } else if (key === 'marginLeft' || key === 'margin-left') {
      result['margin-left'] = value;
    }
  }

  return result;
}
