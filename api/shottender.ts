type Req = { method?: string; body?: { feeling?: string } };
type Res = {
  status: (code: number) => { json: (body: unknown) => void };
};

type IngredientOut = { name: string; why: string; substitutes?: string[] };
type ShotOut = {
  name: string;
  emoji: string;
  base: string;
  benefit: string;
  ingredients: IngredientOut[];
};

const DISCLAIMER =
  "Wellness suggestions only — not medical advice. Consult a professional for health concerns.";

export default async function handler(req: Req, res: Res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Shot-Tender is not configured" });
  }

  let body: { feeling?: string } = {};
  try {
    body =
      typeof req.body === "string"
        ? (JSON.parse(req.body) as { feeling?: string })
        : (req.body ?? {});
  } catch {
    body = {};
  }
  const feeling = typeof body.feeling === "string" ? body.feeling.trim() : "";

  if (!feeling) {
    return res.status(400).json({ error: "feeling is required" });
  }

  const system = `You are a friendly Miami wellness bar "Shot-Tender". Given how someone feels, invent ONE small wellness shot (2-4 ingredients). Respond with ONLY valid JSON, no markdown:
{"name":"string","emoji":"single emoji","base":"short base description","benefit":"one sentence benefit","ingredients":[{"name":"string","why":"one sentence why it helps","substitutes":["optional alt"]}]}
Keep ingredients realistic for a juice/wellness shot bar. ${DISCLAIMER}`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 1024,
        system,
        messages: [{ role: "user", content: `How I feel: ${feeling}` }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic error", response.status, errText);
      return res.status(502).json({ error: "AI request failed" });
    }

    const data = (await response.json()) as {
      content?: Array<{ type: string; text?: string }>;
    };
    const text = data.content?.find((c) => c.type === "text")?.text?.trim() ?? "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(502).json({ error: "Invalid AI response" });
    }

    const parsed = JSON.parse(jsonMatch[0]) as ShotOut;
    if (!parsed.name || !parsed.ingredients?.length) {
      return res.status(502).json({ error: "Incomplete shot from AI" });
    }

    const shot = {
      id: "shot-tender-custom",
      name: parsed.name,
      emoji: parsed.emoji || "✨",
      base: parsed.base || "Custom blend",
      goals: [] as string[],
      benefit: parsed.benefit || "A blend tuned to how you feel",
      ingredients: parsed.ingredients.map((i) => ({
        name: i.name,
        why: i.why,
        substitutes: i.substitutes,
      })),
    };

    return res.status(200).json({ shot, disclaimer: DISCLAIMER });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Shot-Tender failed" });
  }
}
