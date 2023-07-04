/* eslint-disable sort-keys */
const winningSequences = {
  firstRow: [ 0, 1, 2, 3, 4 ],
  secondRow: [ 5, 6, 7, 8, 9 ],
  thirdRow: [ 10, 11, 12, 13, 14 ],
  fourthRow: [ 15, 16, 17, 18, 19 ],
  fifthRow: [ 20, 21, 22, 23, 24 ],
  firstColumn: [ 0, 5, 10, 15, 20 ],
  secondColumn: [ 1, 6, 11, 16, 21 ],
  thirdColumn: [ 2, 7, 12, 17, 22 ],
  fourthColumn: [ 3, 8, 13, 18, 23 ],
  fifthColumn: [ 4, 9, 14, 19, 24 ],
  diagonal: [ 0, 6, 12, 18, 24 ],
  diagonalInverse: [ 4, 8, 12, 16, 20 ],
}

export default winningSequences