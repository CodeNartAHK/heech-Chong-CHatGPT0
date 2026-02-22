// src/models/Dosage.ts

export interface Dosage {
  chamberSmall_mg: number;
  chamberMedium_mg: number;
  chamberLarge_mg: number;
  maxDailyDose_mg: number;
  warnings: string;
  notes: string;
}

export const createEmptyDosage = (): Dosage => ({
  chamberSmall_mg: 0,
  chamberMedium_mg: 0,
  chamberLarge_mg: 0,
  maxDailyDose_mg: 0,
  warnings: "",
  notes: "",
});
