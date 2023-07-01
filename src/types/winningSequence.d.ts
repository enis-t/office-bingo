export type winningSequenceType = {
  firstRow: boolean
  secondRow: boolean
  thirdRow: boolean
  fourthRow: boolean
  fifthRow: boolean
  diagonal: boolean
  diagonalInverse: boolean
}

export type winningSequenceKey = keyof winningSequenceType
