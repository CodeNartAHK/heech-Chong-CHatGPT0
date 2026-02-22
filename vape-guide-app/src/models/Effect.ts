// src/models/Effect.ts

export type EffectCategory =
  | "beruhigend"
  | "anregend"
  | "entspannend"
  | "schmerzlindernd"
  | "verdauungsfördernd"
  | "schlaffördernd"
  | "sedierend"
  | "antibakteriell"
  | "entzündungshemmend"
  | "stimmungsaufhellend"
  | "wärmend"
  | "kühlend"
  | "nervenstärkend"
  | "andere";

export interface Effect {
  name: string;
  category: EffectCategory;
  weight: number;
  color: string;
  icon: string;
  description: string;
}

export const EFFECT_COLORS: Record<EffectCategory, string> = {
  beruhigend: "#5E7BA3",
  anregend: "#FFC107",
  entspannend: "#81C784",
  schmerzlindernd: "#FF6B9D",
  verdauungsfördernd: "#FFA726",
  schlaffördernd: "#6C5B7B",
  sedierend: "#78909C",
  antibakteriell: "#66BB6A",
  entzündungshemmend: "#EF5350",
  stimmungsaufhellend: "#FFD54F",
  wärmend: "#FF7043",
  kühlend: "#42A5F5",
  nervenstärkend: "#AB47BC",
  andere: "#9E9E9E",
};

export const EFFECT_ICONS: Record<EffectCategory, string> = {
  beruhigend: "🌸",
  anregend: "⚡",
  entspannend: "🧘",
  schmerzlindernd: "💊",
  verdauungsfördernd: "🌾",
  schlaffördernd: "😴",
  sedierend: "😌",
  antibakteriell: "🛡️",
  entzündungshemmend: "🔥",
  stimmungsaufhellend: "😊",
  wärmend: "🔥",
  kühlend: "❄️",
  nervenstärkend: "💪",
  andere: "🌿",
};
