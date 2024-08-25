export function replace(inputString: string, replacements: { [target: string]: string }) {
  for (const targetWord in replacements) {
    inputString = inputString.replace(targetWord, replacements[targetWord]);
  }
  return inputString;
}
