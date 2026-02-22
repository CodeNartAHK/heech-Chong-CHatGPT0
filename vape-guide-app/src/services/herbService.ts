// src/services/herbService.ts

import { Herb, HerbsData } from "@models/Herb";
import herbsData from "../../assets/data/herbs.json";

class HerbService {
  private static instance: HerbService;
  private herbs: Herb[] = [];

  private constructor() {
    this.loadHerbs();
  }

  static getInstance(): HerbService {
    if (!HerbService.instance) {
      HerbService.instance = new HerbService();
    }
    return HerbService.instance;
  }

  private loadHerbs(): void {
    try {
      const data = herbsData as HerbsData;
      this.herbs = data.herbs.map((herb) => ({
        ...herb,
        isFavorite: false,
      }));
      console.log(`✓ ${this.herbs.length} Kräuter geladen`);
    } catch (error) {
      console.error("Fehler beim Laden der Kräuter:", error);
      this.herbs = [];
    }
  }

  getAllHerbs(): Herb[] {
    return [...this.herbs];
  }

  getHerbById(id: number): Herb | undefined {
    return this.herbs.find((herb) => herb.id === id);
  }

  searchHerbs(query: string): Herb[] {
    const lowerQuery = query.toLowerCase();
    return this.herbs.filter(
      (herb) =>
        herb.name.toLowerCase().includes(lowerQuery) ||
        herb.nameLatin.toLowerCase().includes(lowerQuery) ||
        herb.primaryEffect.toLowerCase().includes(lowerQuery) ||
        herb.secondaryEffect.toLocaleLowerCase().includes(lowerQuery)
    );
  }

  getHerbsByEffect(effect: string): Herb[] {
    return this.herbs.filter(
      (herb) =>
        herb.primaryEffect.toLowerCase() === effect.toLowerCase() ||
        herb.secondaryEffect.toLowerCase() === effect.toLowerCase()
    );
  }

  getHerbsByTemperatureRange(min: number, max: number): Herb[] {
    return this.herbs.filter(
      (herb) =>
        herb.vaporizationTempMin >= min && herb.vaporizationTempMax <= max
    );
  }

  getUniquePrimaryEffects(): string[] {
    const effects = new Set(this.herbs.map((herb) => herb.primaryEffect));
    return Array.from(effects).sort();
  }

  getTemperatureRange(): { min: number; max: number } {
    const temperatures = this.herbs.flatMap((herb) => [
      herb.vaporizationTempMin,
      herb.vaporizationTempMax,
    ]);

    return {
      min: Math.min(...temperatures),
      max: Math.max(...temperatures),
    };
  }
}

export default HerbService.getInstance();
