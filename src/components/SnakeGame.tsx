import { useRef, useEffect, useState, useCallback } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const CELL = 16;
const COLS = 22;
const ROWS = 16;
const W = COLS * CELL;
const H = ROWS * CELL;
const TICK = 110;

type Dir = 'up' | 'down' | 'left' | 'right';
type Pos = [number, number];

const COLORS = {
  bg: '#0a0f0a',
  grid: '#14281f',
  snake: '#10B981',
  snakeHead: '#34D399',
  food: '#6EE7B7',
  foodGlow: 'rgba(16, 185, 129, 0.3)',
  text: '#ffffff',
  muted: 'rgba(255,255,255,0.3)',
};

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { language } = useLanguage();
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);

  const stateRef = useRef({
    snake: [[4, 7], [3, 7], [2, 7]] as Pos[],
    dir: 'right' as Dir,
    nextDir: 'right' as Dir,
    food: [10, 7] as Pos,
    score: 0,
    gameOver: false,
    started: false,
  });

  const spawnFood = useCallback((snake: Pos[]): Pos => {
    let pos: Pos;
    do {
      pos = [Math.floor(Math.random() * COLS), Math.floor(Math.random() * ROWS)];
    } while (snake.some(([x, y]) => x === pos[0] && y === pos[1]));
    return pos;
  }, []);

  const reset = useCallback(() => {
    const s = stateRef.current;
    s.snake = [[4, 7], [3, 7], [2, 7]];
    s.dir = 'right';
    s.nextDir = 'right';
    s.food = [10, 7];
    s.score = 0;
    s.gameOver = false;
    s.started = true;
    setScore(0);
    setGameOver(false);
    setStarted(true);
  }, []);

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    const s = stateRef.current;

    // Background
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, W, H);

    // Grid dots
    ctx.fillStyle = COLORS.grid;
    for (let x = 0; x < COLS; x++) {
      for (let y = 0; y < ROWS; y++) {
        ctx.fillRect(x * CELL + CELL / 2, y * CELL + CELL / 2, 1, 1);
      }
    }

    // Food glow
    ctx.fillStyle = COLORS.foodGlow;
    ctx.beginPath();
    ctx.arc(s.food[0] * CELL + CELL / 2, s.food[1] * CELL + CELL / 2, CELL, 0, Math.PI * 2);
    ctx.fill();

    // Food pixel
    ctx.fillStyle = COLORS.food;
    ctx.fillRect(s.food[0] * CELL + 2, s.food[1] * CELL + 2, CELL - 4, CELL - 4);

    // Snake
    s.snake.forEach(([x, y], i) => {
      ctx.fillStyle = i === 0 ? COLORS.snakeHead : COLORS.snake;
      ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2);
    });

    // Game over overlay
    if (s.gameOver) {
      ctx.fillStyle = 'rgba(10, 15, 10, 0.85)';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = COLORS.text;
      ctx.font = 'bold 16px "Space Grotesk", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', W / 2, H / 2 - 12);
      ctx.font = '11px "Inter", monospace';
      ctx.fillStyle = COLORS.muted;
      ctx.fillText(
        language === 'en' ? `Score: ${s.score} · Click to retry` : `Punkte: ${s.score} · Klick zum Neustarten`,
        W / 2,
        H / 2 + 12,
      );
    }

    // Start screen
    if (!s.started) {
      ctx.fillStyle = 'rgba(10, 15, 10, 0.8)';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = COLORS.snakeHead;
      ctx.font = 'bold 14px "Space Grotesk", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('🐍 SNAKE', W / 2, H / 2 - 10);
      ctx.font = '11px "Inter", monospace';
      ctx.fillStyle = COLORS.muted;
      ctx.fillText(
        language === 'en' ? 'Click to start · Arrow keys / WASD' : 'Klick zum Starten · Pfeiltasten / WASD',
        W / 2,
        H / 2 + 12,
      );
    }
  }, [language]);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let timer: ReturnType<typeof setInterval>;

    const tick = () => {
      const s = stateRef.current;
      if (!s.started || s.gameOver) return;

      s.dir = s.nextDir;
      const [hx, hy] = s.snake[0];
      let nx = hx, ny = hy;

      if (s.dir === 'up') ny--;
      if (s.dir === 'down') ny++;
      if (s.dir === 'left') nx--;
      if (s.dir === 'right') nx++;

      // Wall wrap
      if (nx < 0) nx = COLS - 1;
      if (nx >= COLS) nx = 0;
      if (ny < 0) ny = ROWS - 1;
      if (ny >= ROWS) ny = 0;

      // Self-collision
      if (s.snake.some(([x, y]) => x === nx && y === ny)) {
        s.gameOver = true;
        setGameOver(true);
        draw(ctx);
        return;
      }

      s.snake.unshift([nx, ny]);

      // Eat food
      if (nx === s.food[0] && ny === s.food[1]) {
        s.score++;
        setScore(s.score);
        s.food = spawnFood(s.snake);
      } else {
        s.snake.pop();
      }

      draw(ctx);
    };

    timer = setInterval(tick, TICK);
    draw(ctx);

    return () => clearInterval(timer);
  }, [draw, spawnFood]);

  // Key handler
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const s = stateRef.current;
      if (!s.started || s.gameOver) return;
      const map: Record<string, Dir> = {
        ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
        w: 'up', s: 'down', a: 'left', d: 'right',
        W: 'up', S: 'down', A: 'left', D: 'right',
      };
      const newDir = map[e.key];
      if (!newDir) return;
      const opposite: Record<Dir, Dir> = { up: 'down', down: 'up', left: 'right', right: 'left' };
      if (newDir !== opposite[s.dir]) {
        s.nextDir = newDir;
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Touch/swipe for mobile
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let startX = 0, startY = 0;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const s = stateRef.current;
      if (!s.started || s.gameOver) return;
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
      const opposite: Record<Dir, Dir> = { up: 'down', down: 'up', left: 'right', right: 'left' };
      let newDir: Dir;
      if (Math.abs(dx) > Math.abs(dy)) {
        newDir = dx > 0 ? 'right' : 'left';
      } else {
        newDir = dy > 0 ? 'down' : 'up';
      }
      if (newDir !== opposite[s.dir]) {
        s.nextDir = newDir;
      }
    };

    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  const handleClick = () => {
    const s = stateRef.current;
    if (!s.started || s.gameOver) {
      reset();
    }
  };

  const tagline = language === 'en'
    ? 'Still here? Guess my portfolio is working. 🎮'
    : 'Noch da? Scheint, als wirkt mein Portfolio. 🎮';

  return (
    <div className="snake-game">
      <p className="snake-game__tagline">{tagline}</p>
      <div className="snake-game__wrapper">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="snake-game__canvas"
          onClick={handleClick}
        />
        {started && !gameOver && (
          <span className="snake-game__score">
            {language === 'en' ? 'Score' : 'Punkte'}: {score}
          </span>
        )}
      </div>
    </div>
  );
}
