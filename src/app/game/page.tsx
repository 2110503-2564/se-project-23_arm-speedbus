"use client";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface Obstacle {
  x: number;
  width: number;
  height: number;
}

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  function startGame() {
    setIsRunning(true);
    setScore(0);
    setGameOver(false);
  }

  useEffect(() => {
    if (!isRunning) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dinoY = 150;
    let velocity = 0;
    const gravity = 0.5;
    let isJumping = false;
    let obstacles: Obstacle[] = [{ x: 300, width: 20, height: 40 }];
    let currentScore = 0;

    function jump() {
      if (!isJumping) {
        velocity = -10;
        isJumping = true;
      }
    }

    function update() {
      if (!isRunning) return;
      if (!ctx) return;
      if (!canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'black';
      ctx.fillRect(50, dinoY, 20, 20);
      dinoY += velocity;
      velocity += gravity;
      if (dinoY >= 150) {
        dinoY = 150;
        isJumping = false;
      }

      ctx.fillStyle = 'red';
      obstacles.forEach(obstacle => {
        obstacle.x -= 5;
        ctx.fillRect(obstacle.x, 160 - obstacle.height, obstacle.width, obstacle.height);
      });

      if (obstacles[0].x < -20) {
        obstacles.shift();
        obstacles.push({ x: 300 + Math.random() * 200, width: 20, height: 40 });
        currentScore++;
        setScore(currentScore);
      }

      if (obstacles.some(obstacle => obstacle.x < 70 && obstacle.x > 30 && dinoY + 20 > 160 - obstacle.height)) {
        setIsRunning(false);
        setGameOver(true);
        setHighScore(prev => Math.max(prev, currentScore));
        setTimeout(() => startGame(), 2000); // Restart automatically after 2 seconds
      } else {
        requestAnimationFrame(update);
      }
    }

    window.addEventListener('keydown', (e) => { if (e.code === 'Space') jump(); });
    update();
  }, [isRunning]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-white">Car Jumper</h1>
      <canvas ref={canvasRef} width={300} height={200} className="border border-black m-5 bg-white" />
      <p className="mt-2 text-xl">Score: {score}</p>
      <p className="mt-2 text-xl">High Score: {highScore}</p>
      {gameOver && <p className="mt-4 text-red-500 text-2xl">Game Over</p>}
      {!isRunning && (
        <button onClick={startGame} className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Start Game
        </button>
      )}
      <Link href="/">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Back to Home
        </button>
      </Link>
    </div>
  );
}
