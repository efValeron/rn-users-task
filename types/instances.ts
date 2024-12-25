export type Address = {
  address: string
  city: string
  coordinates: Coordinates
  country: string
  postalCode: string
  state: string
  stateCode: string
}

export type Bank = {
  cardExpire: string
  cardNumber: string
  cardType: string
  currency: string
  iban: string
}

export type Company = {
  address: Address
  department: string
  name: string
  title: string
}

export type Coordinates = {
  lat: number
  lng: number
}

export type Crypto = {
  coin: string
  network: string
  wallet: string
}

export type Hair = {
  color: string
  type: string
}

export type Users = {
  address: Address
  age: number
  bank: Bank
  birthDate: string
  bloodGroup: string
  company: Company
  crypto: Crypto
  ein: string
  email: string
  eyeColor: string
  firstName: string
  gender: string
  hair: Hair
  height: number
  id: number
  image: string
  ip: string
  lastName: string
  macAddress: string
  maidenName: string
  password: string
  phone: string
  role: 'admin' | 'moderator' | 'user'
  ssn: string
  university: string
  userAgent: string
  username: string
  weight: number
}
