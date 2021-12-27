import { validate } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join('0') + num;
}

export function base64LengthToBytes(length: number) {
  return length * (3 / 4) - 1;
}

export function toJson(str: string) {
  let object;
  try {
    object = JSON.parse(str);
  } catch (error) {}
  return object;
}

export async function validator(
  data: object,
  Type: any,
): Promise<{ valid: any; err: any }> {
  const valid = new Type();
  for (let i in data) {
    valid[i] = data[i];
  }
  const _err = await validate(valid);
  if (_err.length) return { valid: null, err: _err };
  return { valid, err: null };
}

export function generateTransactionId(prefix?: string): string {
  prefix = prefix || '';
  const transactionId = uuidv4();
  return `${prefix}${transactionId}`;
}

export function sortObject(o) {
  var sorted = {},
    key,
    a = [];

  for (key in o) {
    if (o.hasOwnProperty(key)) {
      a.push(key);
    }
  }

  a.sort();

  for (key = 0; key < a.length; key++) {
    sorted[a[key]] = o[a[key]];
  }
  return sorted;
}

export function getSort(
  value: string | undefined,
  lastSort: string[] = ['id', 'ASC'],
): any[] {
  if (!value) return [lastSort];

  const { direction, field, association } = buildDirectionAndField(value);
  if (association == null) return [[field, direction], lastSort];
  return [[association, field, direction], lastSort];
}

function buildDirectionAndField(value: string) {
  let field: any;
  let direction: 'ASC' | 'DESC';
  let association: string | undefined;
  let associationAndField;

  if (value.substring(0, 1) === '-') {
    direction = 'DESC';
    associationAndField = value.substring(1);
  } else {
    direction = 'ASC';
    associationAndField = value;
  }

  if (associationAndField.includes('.')) {
    const splitted = associationAndField.split('.');
    association = splitted[0];
    field = splitted[1];
  } else {
    field = associationAndField;
  }

  return { direction, field, association };
}

export function removeAllSpacingBetweenWords(str: string) {
  return str.replace(/\s+/g, ' ').trim();
}

export function parsePhoneTo84Format(phone: string) {
  phone = phone.replace('+84', '84');
  if (phone.indexOf('0') == 0) {
    phone = phone.slice(1, phone.length);
    phone = `84${phone}`;
  }
  return phone;
}

export function keysToCamel(o) {
  if (isObject(o) && !isDate(o)) {
    const n = {};

    Object.keys(o).forEach((k) => {
      n[toCamel(k)] = keysToCamel(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i) => {
      return keysToCamel(i);
    });
  }

  return o;
}

const isObject = function (o) {
  return o === Object(o) && !isArray(o) && typeof o !== 'function';
};

const isDate = function (o) {
  return o instanceof Date;
};

const isArray = function (a) {
  return Array.isArray(a);
};

const toCamel = (s) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};
