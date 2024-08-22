function replaceSubstring(s: string, a: string, b: string) {
  return s.replace(new RegExp(a, 'g'), b);
}

export function replace(inputString: string, replacements: { [target: string]: string }) {
  for (const targetWord in replacements) {
    inputString = replaceSubstring(inputString, targetWord, replacements[targetWord]);
  }
  return inputString;
}
