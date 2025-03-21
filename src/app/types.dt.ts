export interface Order {
  id: number;
  transactionId: number;
  date: string;
  status: string;
  game_name: string;
  gameId: number;
  amount: number;
  currency: string;
  your_goods: number;
  old_goods: number;
  total: number;
  earn: number;
}

export interface User {
  login: string;
  password: string;
  social?: boolean;
}

export interface Currency {
  id: number;
  name: string;
  symbol: string;
  rate: number;
  icon: string;
}

export interface Dropdown {
  id: number;
  Icon: string;
  Name: string;
}

export interface Language {
  id: number;
  name: string;
  icon: string;
}
