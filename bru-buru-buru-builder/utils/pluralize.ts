export function pluralize(moduleName: string): string {
  return moduleName.endsWith('y')
    ? `${moduleName.slice(0, -1)}ies`
    : `${moduleName}s`
}
