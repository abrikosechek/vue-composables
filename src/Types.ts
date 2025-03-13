export interface Rules {
  [key: string]: Rule;
}

export interface Rule {
  required?: boolean
  maxChars?: number
  minChars?: number
  regexp?: RegExp
}