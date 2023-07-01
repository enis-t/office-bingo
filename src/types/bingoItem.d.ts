export interface bingoItem {
  frequency: number,
  id: string,
  phrase: string
}

export interface checkableBingoItem extends bingoItem {
  checked: boolean
}
