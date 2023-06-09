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

export interface craftersList {
  manufacturers: craftersOfType,
  enchanters: craftersOfType,
  forgers: craftersOfType,
}
export interface craftersOfType {
  journeyman: crafterStats,
  expert: crafterStats,
  master: crafterStats,
}

export interface crafterStats {
  speedFactor: number,
  modifier: number,
  hourlyRate: number,
  overtimeRate: number
}
