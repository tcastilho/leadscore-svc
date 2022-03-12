export function isValueIncludedInEnum(value: any, enumType: any): boolean {
  return (Object as any).values(enumType).includes(value);
}
