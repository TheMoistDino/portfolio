"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  canDouble,
  CHIPS,
  deal,
  dealerStep,
  double,
  handValue,
  hit,
  newGame,
  stand,
  START_BANKROLL,
  type Card,
  type Game,
  type Result,
} from "./logic";

const KEY = "portfolio-blackjack-chips";

function loadBankroll() {
  try {
    const n = Number(localStorage.getItem(KEY));
    return Number.isFinite(n) && n >= CHIPS[0] ? n : START_BANKROLL;
  } catch {
    return START_BANKROLL;
  }
}

const RESULT_TEXT: Record<Result, string> = {
  blackjack: "Blackjack! It pays 3 to 2.",
  win: "You win.",
  push: "Push. Your bet comes back.",
  lose: "The dealer wins.",
  bust: "Bust. You went over 21.",
};

function PlayingCard({ card, hidden }: { card: Card; hidden?: boolean }) {
  const red = card.suit === "♥" || card.suit === "♦";
  return (
    <motion.div
      initial={{ opacity: 0, y: -14, rotate: -5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      aria-label={hidden ? "Face-down card" : `${card.rank} of ${card.suit}`}
      role="img"
      className={`grid h-[84px] w-[60px] shrink-0 place-items-center rounded-lg border shadow-md ${
        hidden ? "border-transparent bg-acc" : "border-black/10 bg-[#f7f6f1]"
      }`}
      style={{ color: red ? "#c2283a" : "#1b1d26" }}
    >
      {hidden ? (
        <span className="h-[68px] w-[44px] rounded border-2 border-on-acc/40" />
      ) : (
        <span className="flex flex-col items-center leading-none">
          <span className="font-display text-2xl font-bold">{card.rank}</span>
          <span className="text-xl">{card.suit}</span>
        </span>
      )}
    </motion.div>
  );
}

function Hand({ label, cards, hideSecond }: { label: string; cards: Card[]; hideSecond?: boolean }) {
  const shown = hideSecond ? cards.slice(0, 1) : cards;
  const { total, soft } = handValue(shown);
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline gap-2 text-xs font-bold tracking-wider text-dim uppercase">
        <span>{label}</span>
        {cards.length > 0 && (
          <span className="font-mono text-sm text-ink tabular-nums">
            {soft && total < 21 ? `${total - 10} or ${total}` : total}
          </span>
        )}
      </div>
      <div className="flex min-h-[84px] flex-wrap gap-2">
        {cards.map((c, i) => (
          <PlayingCard key={i} card={c} hidden={hideSecond && i === 1} />
        ))}
      </div>
    </div>
  );
}

export function BlackjackApp() {
  const [g, setG] = useState<Game>(() => newGame(loadBankroll()));
  const [bet, setBet] = useState(20);

  // The dealer draws one card at a time so the hand is easy to follow.
  useEffect(() => {
    if (g.phase !== "dealer") return;
    const t = setTimeout(() => setG(dealerStep(g)), 600);
    return () => clearTimeout(t);
  }, [g]);

  // Remember the chip count between visits.
  useEffect(() => {
    if (g.phase !== "betting" && g.phase !== "done") return;
    try {
      localStorage.setItem(KEY, String(g.bankroll));
    } catch {
      // Storage blocked: chips last for this visit only.
    }
  }, [g.phase, g.bankroll]);

  const betting = g.phase === "betting" || g.phase === "done";
  const broke = betting && g.bankroll < CHIPS[0];
  const wager = Math.min(bet, [...CHIPS].reverse().find((c) => c <= g.bankroll) ?? 0);

  const status =
    g.phase === "betting"
      ? "Pick a bet and deal."
      : g.phase === "player"
        ? "Your move."
        : g.phase === "dealer"
          ? "Dealer's turn."
          : RESULT_TEXT[g.result ?? "push"];

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex justify-between font-mono text-sm tabular-nums">
        <span>
          <span className="text-dim">Chips</span> {g.bankroll}
        </span>
        <span>
          <span className="text-dim">Bet</span> {betting ? wager : g.bet}
        </span>
      </div>

      <Hand label="Dealer" cards={g.dealer} hideSecond={g.phase === "player"} />
      <Hand label="You" cards={g.player} />

      <p className="font-display text-lg font-bold" role="status" aria-live="polite">
        {broke ? "You are out of chips." : status}
      </p>

      <div className="mt-auto flex flex-col gap-3">
        {broke ? (
          <button type="button" className="btn btn-pri self-start" onClick={() => setG(newGame())}>
            Take {START_BANKROLL} fresh chips
          </button>
        ) : betting ? (
          <>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Bet size">
              {CHIPS.map((c) => (
                <button
                  key={c}
                  type="button"
                  disabled={c > g.bankroll}
                  aria-pressed={wager === c}
                  onClick={() => setBet(c)}
                  className={`h-11 w-11 cursor-pointer rounded-full border-2 border-dashed font-mono text-sm font-bold disabled:cursor-not-allowed disabled:opacity-35 ${
                    wager === c ? "border-on-acc bg-acc text-on-acc" : "border-edge hover:border-acc"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <button type="button" className="btn btn-pri self-start" onClick={() => setG(deal(g, wager))}>
              {g.phase === "done" ? "Deal again" : "Deal"}
            </button>
          </>
        ) : (
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn btn-pri" disabled={g.phase !== "player"} onClick={() => setG(hit(g))}>
              Hit
            </button>
            <button type="button" className="btn" disabled={g.phase !== "player"} onClick={() => setG(stand(g))}>
              Stand
            </button>
            <button type="button" className="btn disabled:opacity-40" disabled={!canDouble(g)} onClick={() => setG(double(g))}>
              Double down
            </button>
          </div>
        )}
        <p className="text-xs text-dim">
          Play chips only, nothing is at stake. The dealer stands on 17 and blackjack pays 3 to 2.
        </p>
      </div>
    </div>
  );
}
