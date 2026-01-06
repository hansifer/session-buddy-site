// template literal tag function that removes newlines
export function tw(strings: TemplateStringsArray, ...exprs: any[]) {
  const concatenated: string[] = [];

  // interpolate normally

  for (let i = 0; i < strings.length; i++) {
    concatenated.push(strings[i]);

    if (i < exprs.length) {
      concatenated.push(exprs[i].toString());
    }
  }

  // normalize all whitespace to single space and trim

  return concatenated.join('').replace(/\s+/g, ' ').trim();
}
