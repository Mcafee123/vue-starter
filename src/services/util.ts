export const util = {
  CamelPad(str: string) {
    const stripped = str
    // Look for long acronyms and filter out the last letter
      .replace(/([A-Z]+)([A-Z][a-z])/g, ' $1 $2')
      // Look for lower-case letters followed by upper-case letters
      .replace(/([a-z\d])([A-Z])/g, '$1 $2')
      // Look for lower-case letters followed by numbers
      .replace(/([a-zA-Z])(\d)/g, '$1 $2')
      .replace(/^./, s =>  s.toUpperCase())
      // Remove any white space left around the word
      .trim()
    return stripped.toLowerCase().split(' ').join('-')
  }
}
