export function flattenFirestoreData(fields: any): Record<string, any> {
  const parseValue = (val: any): any => {
    if (val === null || typeof val !== 'object') return val;

    if ('stringValue' in val) return val.stringValue;
    if ('integerValue' in val) return parseInt(val.integerValue, 10);
    if ('doubleValue' in val) return parseFloat(val.doubleValue);
    if ('booleanValue' in val) return val.booleanValue;
    if ('timestampValue' in val) return val.timestampValue;
    if ('nullValue' in val) return null;
    if ('mapValue' in val) return flattenFirestoreData(val.mapValue.fields || {});
    if ('arrayValue' in val)
      return (val.arrayValue.values || []).map(parseValue);

    return val; // fallback
  };

  return Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, parseValue(value)])
  );
}