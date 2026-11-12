// Blackjack rules, kept free of React so they are easy to test.
// One deck, dealer stands on 17, blackjack pays 3 to 2, double down on the first two cards, no splitting.

export type Suit = "♠" | "♥" | "♦" | "♣";
export type Card = { rank: string; suit: Suit };
export type Result = "blackjack" | "win" | "push" | "lose" | "bust";
export type Phase = "betting" | "player" | "dealer" | "done";

export type Game = {
  deck: Card[];
  player: Card[];
  dealer: Card[];
  phase: Phase;
  bet: number;
  bankroll: number;
  result: Result | null;
};

export const START_BANKROLL = 500;
export const CHIPS = [10, 20, 50, 100];

const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const SUITS: Suit[] = ["♠", "♥", "♦", "♣"];

export function freshDeck(rng: () => number = Math.random): Card[] {
  const deck = SUITS.flatMap((suit) => RANKS.map((rank) => ({ rank, suit })));
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

/** Best total for a hand. `soft` means an ace is still being counted as 11. */
export function handValue(hand: Card[]) {
  let total = 0;
  let aces = 0;
  for (const c of hand) {
    if (c.rank === "A") {
      aces++;
      total += 11;
    } else if (c.rank === "K" || c.rank === "Q" || c.rank === "J") {
      total += 10;
    } else {
      total += Number(c.rank);
    }
  }
  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }
  return { total, soft: aces > 0 };
}

export const isBlackjack = (hand: Card[]) => hand.length === 2 && handValue(hand).total === 21;

export function newGame(bankroll = START_BANKROLL): Game {
  return { deck: [], player: [], dealer: [], phase: "betting", bet: 0, bankroll, result: null };
}

function draw(deck: Card[]): [Card, Card[]] {
  const d = deck.length > 0 ? deck : freshDeck();
  return [d[0], d.slice(1)];
}

function settle(g: Game): Game {
  const p = handValue(g.player).total;
  const d = handValue(g.dealer).total;
  const playerBJ = isBlackjack(g.player);
  const dealerBJ = isBlackjack(g.dealer);

  let result: Result;
  if (p > 21) result = "bust";
  else if (playerBJ && !dealerBJ) result = "blackjack";
  else if (dealerBJ && !playerBJ) result = "lose";
  else if (d > 21 || p > d) result = "win";
  else if (p === d) result = "push";
  else result = "lose";

  const payout =
    result === "blackjack" ? g.bet * 2.5 : result === "win" ? g.bet * 2 : result === "push" ? g.bet : 0;
  return { ...g, phase: "done", result, bankroll: g.bankroll + payout };
}

export function deal(g: Game, bet: number): Game {
  if ((g.phase !== "betting" && g.phase !== "done") || bet <= 0 || bet > g.bankroll) return g;
  // Reshuffle between hands when the deck runs low.
  let deck = g.deck.length < 20 ? freshDeck() : g.deck;
  const cards: Card[] = [];
  for (let i = 0; i < 4; i++) {
    let c: Card;
    [c, deck] = draw(deck);
    cards.push(c);
  }
  const next: Game = {
    deck,
    player: [cards[0], cards[2]],
    dealer: [cards[1], cards[3]],
    phase: "player",
    bet,
    bankroll: g.bankroll - bet,
    result: null,
  };
  // A two-card 21 on either side ends the hand at once.
  return isBlackjack(next.player) || isBlackjack(next.dealer) ? settle(next) : next;
}

export function hit(g: Game): Game {
  if (g.phase !== "player") return g;
  const [card, deck] = draw(g.deck);
  const next = { ...g, deck, player: [...g.player, card] };
  const total = handValue(next.player).total;
  if (total > 21) return settle(next);
  return total === 21 ? { ...next, phase: "dealer" } : next;
}

export function stand(g: Game): Game {
  return g.phase === "player" ? { ...g, phase: "dealer" } : g;
}

export const canDouble = (g: Game) => g.phase === "player" && g.player.length === 2 && g.bankroll >= g.bet;

/** Double the bet, take exactly one more card, then stand. */
export function double(g: Game): Game {
  if (!canDouble(g)) return g;
  const [card, deck] = draw(g.deck);
  const next = { ...g, deck, player: [...g.player, card], bankroll: g.bankroll - g.bet, bet: g.bet * 2 };
  return handValue(next.player).total > 21 ? settle(next) : { ...next, phase: "dealer" };
}

/** One step of the dealer's turn: draw below 17, otherwise settle the hand. */
export function dealerStep(g: Game): Game {
  if (g.phase !== "dealer") return g;
  if (handValue(g.dealer).total < 17) {
    const [card, deck] = draw(g.deck);
    return { ...g, deck, dealer: [...g.dealer, card] };
  }
  return settle(g);
}
