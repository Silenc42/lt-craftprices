export enum crafterType {
  manufacturer = 'manufacturer',
  enchanter = 'enchanter',
  forger = 'forger'
}
export enum crafterRank {
  journeyman = 'journeyman',
  expert = 'expert',
  master = 'master'
}

export interface craftersStats {
  manufacturersStats: crafterStats[],
  enchantersStats: crafterStats[],
  forgersStats: crafterStats[],

}
export interface crafterStats {
  rank: crafterRank,
  speedFactor: number,
  modifier: number,
  hourlyRate: number,
  overtimeRate: number
}
