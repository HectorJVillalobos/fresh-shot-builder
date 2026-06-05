import ginger from "@/assets/shot-ginger-lime.jpg";
import pineapple from "@/assets/shot-pineapple-cayenne.jpg";
import orange from "@/assets/shot-orange-turmeric.jpg";
import wheatgrass from "@/assets/shot-wheatgrass-mint.jpg";

export type Ingredient = { name: string; why: string; substitutes?: string[] };
export type Shot = {
  id: string; name: string; emoji: string; base: string;
  goals: string[]; benefit: string; ingredients: Ingredient[]; image?: string;
};

export const shots: Shot[] = [
  {
    id: "brickell-brain-booster", name: "Brickell Brain Booster", emoji: "🫚",
    base: "Ginger + lime", goals: ["focus"],
    image: ginger,
    benefit: "Sharpen focus and beat the afternoon fog",
    ingredients: [
      { name: "Ginger", why: "Supports circulation and a feeling of alertness", substitutes: ["Turmeric"] },
      { name: "Lime juice", why: "Vitamin C and a bright, waking kick", substitutes: ["Lemon juice"] },
      { name: "Matcha", why: "L-theanine + a little caffeine for calm, steady focus", substitutes: ["Green tea"] },
    ],
  },
  {
    id: "little-havana-heat", name: "Little Havana Heat", emoji: "🌶️",
    base: "Pineapple + cayenne", goals: ["energy"],
    image: pineapple,
    benefit: "Fire up metabolism and circulation",
    ingredients: [
      { name: "Cayenne", why: "Capsaicin gives a warming circulation and metabolism kick" },
      { name: "Pineapple juice", why: "Bromelain plus natural sugars for quick energy", substitutes: ["Orange juice"] },
      { name: "Ginger", why: "Adds warmth and supports digestion", substitutes: ["Turmeric"] },
    ],
  },
  {
    id: "coconut-grove-glow", name: "Coconut Grove Glow", emoji: "🍊",
    base: "Orange + turmeric", goals: ["immunity", "inflammation"],
    image: orange,
    benefit: "Immunity and a fresh-skin glow",
    ingredients: [
      { name: "Turmeric", why: "Curcumin is a well-known anti-inflammatory" },
      { name: "Black pepper", why: "Piperine helps your body absorb the curcumin — they have to go together" },
      { name: "Orange juice", why: "Loaded with vitamin C", substitutes: ["Lemon juice"] },
    ],
  },
  {
    id: "key-biscayne-calm", name: "Key Biscayne Calm", emoji: "🌿",
    base: "Cucumber + mint", goals: ["calm"],
    image: wheatgrass,
    benefit: "Wind down and ease tension",
    ingredients: [
      { name: "Cucumber juice", why: "Hydrating and cooling", substitutes: ["Coconut water"] },
      { name: "Mint", why: "Soothing and settles the stomach", substitutes: ["Lemon balm"] },
      { name: "Chamomile", why: "Traditionally used to relax and calm" },
    ],
  },
  {
    id: "wynwood-wake-up", name: "Wynwood Wake-Up", emoji: "🫐",
    base: "Beet + lemon", goals: ["energy", "vitality"],
    benefit: "Clean, caffeine-free stamina",
    ingredients: [
      { name: "Beet juice", why: "Nitrates support blood flow and endurance", substitutes: ["Pomegranate juice"] },
      { name: "Lemon juice", why: "Vitamin C and brightness", substitutes: ["Lime juice"] },
      { name: "Ginger", why: "A warming lift" },
    ],
  },
  {
    id: "coral-gables-cleanse", name: "Coral Gables Cleanse", emoji: "🍋",
    base: "Lemon + ginger", goals: ["digestion"],
    benefit: "Settle and reset your gut",
    ingredients: [
      { name: "Ginger", why: "Eases nausea and supports digestion", substitutes: ["Peppermint"] },
      { name: "Lemon juice", why: "Stimulates digestion; rich in vitamin C", substitutes: ["Lime juice"] },
      { name: "Apple cider vinegar", why: "Traditionally taken before meals to aid digestion" },
    ],
  },
  {
    id: "calle-ocho-cooldown", name: "Calle Ocho Cooldown", emoji: "🍍",
    base: "Pineapple + turmeric", goals: ["inflammation"],
    benefit: "Calm post-workout inflammation",
    ingredients: [
      { name: "Pineapple juice", why: "Bromelain is studied for easing inflammation", substitutes: ["Orange juice"] },
      { name: "Turmeric", why: "Curcumin, a classic anti-inflammatory" },
      { name: "Black pepper", why: "Piperine makes the turmeric absorbable — pair them always" },
    ],
  },
  {
    id: "ocean-drive-immunity", name: "Ocean Drive Immunity", emoji: "🍯",
    base: "Lemon + ginger + honey", goals: ["immunity"],
    benefit: "Shore up your defenses",
    ingredients: [
      { name: "Lemon juice", why: "High in vitamin C", substitutes: ["Orange juice"] },
      { name: "Ginger", why: "Warming and soothing for the throat" },
      { name: "Raw honey", why: "Naturally antimicrobial and soothing" },
      { name: "Cayenne", why: "Opens you up and adds a kick" },
    ],
  },
  {
    id: "star-island-soother", name: "Star Island Soother", emoji: "🌱",
    base: "Ginger + peppermint", goals: ["headache"],
    benefit: "Ease tension and head pressure",
    ingredients: [
      { name: "Ginger", why: "Studied for easing headache-related nausea", substitutes: ["Turmeric"] },
      { name: "Peppermint", why: "Traditionally used for tension headaches", substitutes: ["Mint"] },
      { name: "Lemon juice", why: "Hydrating and bright; vitamin C" },
    ],
  },
  {
    id: "south-beach-day-starter", name: "South Beach Day Starter", emoji: "🥕",
    base: "Orange + carrot", goals: ["energy", "vitality"],
    benefit: "A bright, balanced morning kickstart",
    ingredients: [
      { name: "Carrot juice", why: "Beta-carotene and natural sweetness", substitutes: ["Sweet potato juice"] },
      { name: "Orange juice", why: "Vitamin C and quick energy", substitutes: ["Pineapple juice"] },
      { name: "Turmeric", why: "Anti-inflammatory base note" },
      { name: "Black pepper", why: "Carries the turmeric into your bloodstream" },
    ],
  },
  {
    id: "tropical-vitality", name: "Tropical Vitality", emoji: "🍓",
    base: "Beet + pomegranate", goals: ["vitality"],
    benefit: "Circulation, stamina, and vitality",
    ingredients: [
      { name: "Beet juice", why: "Nitrates convert to nitric oxide, supporting blood flow" },
      { name: "Pomegranate juice", why: "Antioxidants linked to circulation", substitutes: ["Tart cherry juice"] },
      { name: "Maca", why: "A root traditionally used for energy and vitality" },
      { name: "Ginger", why: "Warming circulation support" },
    ],
  },
  {
    id: "biscayne-refresher", name: "Biscayne Refresher", emoji: "🥒",
    base: "Cucumber + lime", goals: ["calm"],
    benefit: "Cool, clean hydration reset",
    ingredients: [
      { name: "Cucumber juice", why: "Deeply hydrating", substitutes: ["Coconut water"] },
      { name: "Lime juice", why: "Bright vitamin C", substitutes: ["Lemon juice"] },
      { name: "Mint", why: "Cooling and refreshing" },
    ],
  },
];
