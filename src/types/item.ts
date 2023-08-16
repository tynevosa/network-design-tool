export enum ItemTypes {
  UDMSE = 'UDM-SE',
  M1000E = 'M1000E'
}

export interface IItem {
  id: string
  type: ItemTypes
  width: number
  height: number
  location: 'left' | 'center' | 'right'
  position: number
  image: string
}

export interface ItemMap {
  [key: string]: IItem
}
