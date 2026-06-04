import ginger from "@/assets/shot-ginger-lime.jpg";
import pineapple from "@/assets/shot-pineapple-cayenne.jpg";
import orange from "@/assets/shot-orange-turmeric.jpg";
import wheatgrass from "@/assets/shot-wheatgrass-mint.jpg";

export type Shot = {
  slug: string;
  name: string;
  emoji: string;
  benefit: string;
  base: string;
  image?: string;
  ingredients: string[];
  why: string[];
};

export const FEATURED: Shot[] = [
  {
    slug: "brickell-brain-booster",
    name: "Brickell Brain Booster",
    emoji: "🫚",
    benefit: "Sharpen focus, beat the afternoon fog",
    base: "Ginger + Lime",
    image: ginger,
    ingredients: ["1 in. fresh ginger", "Juice of 1 lime", "1 tsp raw honey", "Pinch of cayenne"],
    why: ["Ginger supports circulation and alertness.", "Lime adds a sharp vitamin C lift.", "Cayenne nudges blood flow to the brain."],
  },
  {
    slug: "little-havana-heat",
    name: "Little Havana Heat",
    emoji: "🌶️",
    benefit: "Fire up metabolism and circulation",
    base: "Pineapple + Cayenne",
    image: pineapple,
    ingredients: ["1/2 cup pineapple juice", "Pinch of cayenne", "1 tsp lemon", "Slice of fresh chili"],
    why: ["Pineapple delivers natural enzymes.", "Cayenne wakes up circulation.", "Citrus brightens the kick."],
  },
  {
    slug: "coconut-grove-glow",
    name: "Coconut Grove Glow",
    emoji: "🍊",
    benefit: "Immunity and a fresh-skin glow",
    base: "Orange + Turmeric",
    image: orange,
    ingredients: ["Juice of 2 oranges", "1/2 tsp turmeric", "Pinch of black pepper", "1 tsp coconut oil"],
    why: ["Vitamin C feeds collagen.", "Turmeric calms inflammation.", "Black pepper boosts absorption."],
  },
  {
    slug: "key-biscayne-calm",
    name: "Key Biscayne Calm",
    emoji: "🌿",
    benefit: "Wind down and ease tension",
    base: "Wheatgrass + Mint",
    image: wheatgrass,
    ingredients: ["1 oz wheatgrass", "Handful of fresh mint", "Juice of 1/2 lemon", "Splash of coconut water"],
    why: ["Wheatgrass is rich in chlorophyll.", "Mint soothes the gut and breath.", "Coconut water replenishes electrolytes."],
  },
];

export const MORE: Shot[] = [
  ...FEATURED,
  {
    slug: "biscayne-refresher",
    name: "Biscayne Refresher",
    emoji: "🥒",
    benefit: "Hydrate and reset midday",
    base: "Cucumber + Aloe",
    ingredients: ["1/2 cucumber", "1 tbsp aloe", "Juice of 1/2 lime"],
    why: ["Cooling and hydrating.", "Aloe supports digestion."],
  },
  {
    slug: "south-beach-day-starter",
    name: "South Beach Day Starter",
    emoji: "🌅",
    benefit: "Bright morning energy without the crash",
    base: "Beet + Apple",
    ingredients: ["1 small beet", "1 apple", "1 in. ginger"],
    why: ["Beets support stamina.", "Apple keeps it bright and sweet."],
  },
];

export const GOALS = [
  { key: "focus", label: "Focus", emoji: "🧠" },
  { key: "energy", label: "Energy", emoji: "⚡" },
  { key: "calm", label: "Calm", emoji: "🌿" },
  { key: "digestion", label: "Digestion", emoji: "🥒" },
  { key: "inflammation", label: "Inflammation", emoji: "🔥" },
  { key: "immunity", label: "Immunity", emoji: "🛡️" },
  { key: "vitality", label: "Vitality", emoji: "✨" },
  { key: "headache", label: "Headache", emoji: "💆" },
];