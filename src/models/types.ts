export enum N_INTERVAL {
  weekly = 'weekly',
  monthly = 'monthly',
  yearly = 'yearly',
}

type KeysOfValue<T, TCondition> = {
  [K in keyof T]: T[K] extends TCondition ? K : never
}[keyof T]

export type W_DAYS =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'
