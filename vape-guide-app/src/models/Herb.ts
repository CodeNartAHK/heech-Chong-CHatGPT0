// src/models/Herb.ts

import { Dosage } from "./Dosage";

export interface Herb {
  id: number;
  name: string;
  nameLatin: string;
  primaryEffect: string;
  primaryEffectWeight: number;
  secondaryEffect: string;
  secondaryEffectWeight: number;
  vaporizationTempMin: number;
  vaporizationTempMax: number;
  description: string;
  dosage: Dosage;
  isFavorite?: boolean;
}

export interface HerbsData {
  version: string;
  lastUpdated: string;
  herbs: Herb[];
}

export const isHerbValid = (herb: any): herb is Herb => {
  return (
    herb &&
    typeof herb.id === "number" &&
    typeof herb.name === "string" &&
    typeof herb.nameLatin === "string" &&
    typeof herb.primaryEffect === "string" &&
    typeof herb.vaporizationTempMin === "number" &&
    typeof herb.vaporizationTempMax === "number"
  );
};
