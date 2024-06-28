export function makeSentenceReadyForSearch(sentence: string) {
  return sentence.trim().replaceAll(/\s+/g, ' ').split(' ');
}
