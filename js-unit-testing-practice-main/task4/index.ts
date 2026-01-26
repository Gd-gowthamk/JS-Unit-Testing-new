export const validateMathExpression = (input: string) => {
  const str = input.replace(/\s+/g, '');
  const regex = /^([0-9]+(\.[0-9]+)?|value|\([^\(\)]+\))([+\-*/^]([0-9]+(\.[0-9]+)?|value|\([^\(\)]+\)))*$/;
  return regex.test(str);
};


