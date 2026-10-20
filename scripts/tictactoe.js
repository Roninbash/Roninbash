// Tic-tac-toe played through GitHub issues. A visitor's click opens an issue
// titled "move: B2"; this script applies it, answers for the bot, redraws the
// board in README.md and records the result in game.json. No dependencies.
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const gameFile = path.join(root, "game.json");
const readme = path.join(root, "README.md");
const repo = process.env.GITHUB_REPOSITORY || "OWNER/OWNER";
const cells = ["A1", "B1", "C1", "A2", "B2", "C2", "A3", "B3", "C3"];
const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

const game = JSON.parse(fs.readFileSync(gameFile, "utf8"));
const title = process.env.ISSUE_TITLE || "";
const player = process.env.ISSUE_AUTHOR || "";
const move = title.match(/move:\s*([abc][123])/i)?.[1]?.toUpperCase();
let reply = "";

function winner(board, mark) {
  return lines.find((line) => line.every((i) => board[i] === mark)) || null;
}
function free(board) { return board.map((v, i) => (v ? -1 : i)).filter((i) => i >= 0); }

// Minimax with a small preference for quick wins and slow losses.
function score(board, turn, depth) {
  if (winner(board, "O")) return 10 - depth;
  if (winner(board, "X")) return depth - 10;
  const open = free(board);
  if (!open.length) return 0;
  const scores = open.map((i) => { board[i] = turn; const s = score(board, turn === "O" ? "X" : "O", depth + 1); board[i] = null; return s; });
  return turn === "O" ? Math.max(...scores) : Math.min(...scores);
}
function botMove(board) {
  const open = free(board);
  // The bot is good but not cruel: one move in four it plays randomly.
  if (Math.random() < 0.25) return open[Math.floor(Math.random() * open.length)];
  let best = open[0], bestScore = -Infinity;
  for (const i of open) { board[i] = "O"; const s = score(board, "X", 0); board[i] = null; if (s > bestScore) { bestScore = s; best = i; } }
  return best;
}

if (move) {
  const index = cells.indexOf(move);
  if (game.status !== "playing") { Object.assign(game, { board: Array(9).fill(null), winningLine: null, status: "playing" }); }
  if (game.board[index]) {
    reply = `${move} is already taken. Pick an empty square on the board.`;
  } else {
    game.board[index] = "X";
    game.last = { player, move, at: new Date().toISOString() };
    let line = winner(game.board, "X");
    if (line) { game.scores.visitors++; game.winningLine = line; game.status = "visitors"; reply = `You won with ${move}. Well played, @${player}. A fresh board is up for the next visitor.`; }
    else if (!free(game.board).length) { game.scores.draws++; game.status = "draw"; reply = "A draw. The board resets for the next visitor."; }
    else {
      const b = botMove(game.board); game.board[b] = "O";
      line = winner(game.board, "O");
      if (line) { game.scores.bot++; game.winningLine = line; game.status = "bot"; reply = `I played ${cells[b]} and that's the game. Better luck next time, @${player}; the board resets for the next visitor.`; }
      else if (!free(game.board).length) { game.scores.draws++; game.status = "draw"; reply = `I played ${cells[b]}. A draw; the board resets for the next visitor.`; }
      else reply = `You played ${move}, I played ${cells[b]}. Your move: open the profile and click another square.`;
    }
  }
}

function cellImage(i) {
  const v = game.board[i];
  const win = game.winningLine?.includes(i);
  return !v ? "cell-empty" : `cell-${v.toLowerCase()}${win ? "-win" : ""}`;
}
function cellLink(i) {
  const body = encodeURIComponent("Just press Submit new issue. The board updates in about a minute.");
  return `https://github.com/${repo}/issues/new?title=${encodeURIComponent(`move: ${cells[i]}`)}&body=${body}`;
}
const rows = [0, 1, 2].map((r) => `<tr>${[0, 1, 2].map((c) => { const i = r * 3 + c; const img = `<img src="assets/${cellImage(i)}.svg" width="72" alt="${cells[i]}: ${game.board[i] || "empty"}">`; return `<td>${game.board[i] || game.status !== "playing" ? (game.status !== "playing" && !game.board[i] ? `<a href="${cellLink(i)}">${img}</a>` : img) : `<a href="${cellLink(i)}">${img}</a>`}</td>`; }).join("")}</tr>`).join("\n");
const status = game.status === "visitors" ? "Visitors won the last game. Click any square to start a new one."
  : game.status === "bot" ? "The bot won the last game. Click any square to start a new one."
  : game.status === "draw" ? "The last game was a draw. Click any square to start a new one."
  : game.last ? `Your move. Last play: ${game.last.move} by @${game.last.player}.` : "Your move. You are X; click a square.";
const section = `<!-- game:start -->
<table align="center"><tbody>
${rows}
</tbody></table>
<p align="center">${status}<br><sub>Visitors ${game.scores.visitors} · Bot ${game.scores.bot} · Draws ${game.scores.draws}</sub></p>
<!-- game:end -->`;

const text = fs.readFileSync(readme, "utf8");
if (!/<!-- game:start -->[\s\S]*<!-- game:end -->/.test(text)) throw new Error("README has no game markers");
fs.writeFileSync(readme, text.replace(/<!-- game:start -->[\s\S]*<!-- game:end -->/, section));
fs.writeFileSync(gameFile, JSON.stringify(game, null, 2) + "\n");
if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `reply=${reply.replace(/\n/g, " ")}\n`);
console.log(reply || "board rendered");
