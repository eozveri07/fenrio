"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FaRandom,
  FaSyncAlt,
  FaArrowDown,
  FaArrowUp,
  FaArrowLeft,
  FaArrowRight,
  FaArrowCircleDown,
  FaArrowCircleUp,
} from "react-icons/fa";
import { generatePuzzleGrid, type PuzzleGrid } from "./utils/puzzleMaker";
import { calculatePieceDimensions } from "./utils/puzzlePieceGenerator";
import PuzzlePiece from "./PuzzlePiece";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface PuzzlePieceComponent {
  id: string;
  component: React.ReactNode;
  selected?: boolean;
}

interface PuzzleProps {
  pieces?: PuzzlePieceComponent[];
}

const icons = [
  FaRandom,
  FaSyncAlt,
  FaArrowDown,
  FaArrowUp,
  FaArrowLeft,
  FaArrowRight,
  FaArrowCircleDown,
  FaArrowCircleUp,
];

const defaultPieces: PuzzlePieceComponent[] = [
  ...icons.map((Icon, index) => ({
    id: `icon-${index}`,
    component: <Icon className="w-16 h-16 text-white" />,
    selected: false,
  })),
  {
    id: "logo",
    component: (
      <h3 className="text-2xl font-semibold text-white uppercase">F logo</h3>
    ),
    selected: true,
  },
];

export default function Puzzle({ pieces = defaultPieces }: PuzzleProps) {
  const rows = 3;
  const cols = 5;
  const pieceSize = 200;
  const fillColor = "#3b82f6";
  const strokeWidth = 1;
  const curvatureIntensity = 0.25;

  const [mounted, setMounted] = useState(false);
  const [puzzleGrid, setPuzzleGrid] = useState<PuzzleGrid | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const piecesRef = useRef<Map<string, SVGSVGElement>>(new Map());

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setPuzzleGrid(generatePuzzleGrid(rows, cols, true));
    }
  }, [mounted]);

  const { tabDepth } = calculatePieceDimensions(
    pieceSize,
    strokeWidth,
    curvatureIntensity
  );

  const overlap = tabDepth;

  useEffect(() => {
    if (!puzzleGrid || !containerRef.current) return;

    const initAnimation = () => {
      const pieces = Array.from(piecesRef.current.values());
      if (pieces.length !== rows * cols) {
        setTimeout(initAnimation, 50);
        return;
      }

      const centerX = (cols * pieceSize) / 2;
      const centerY = (rows * pieceSize) / 2;
      const animCenterRow = Math.floor(rows / 2);
      const animCenterCol = Math.floor(cols / 2);

      pieces.forEach((piece) => {
        const rowIndex = parseInt(piece.getAttribute("data-row") || "0");
        const colIndex = parseInt(piece.getAttribute("data-col") || "0");

        const finalX = colIndex * pieceSize + overlap;
        const finalY = rowIndex * pieceSize + overlap;

        const distanceFromCenter = Math.sqrt(
          Math.pow(colIndex - animCenterCol, 2) +
            Math.pow(rowIndex - animCenterRow, 2)
        );

        const angle = Math.atan2(
          rowIndex - animCenterRow,
          colIndex - animCenterCol
        );
        const scatterDistance = 400 + distanceFromCenter * 150;
        const scatterY = -300 - distanceFromCenter * 100;

        const startX = centerX + Math.cos(angle) * scatterDistance;
        const startY =
          centerY + scatterY + Math.sin(angle) * scatterDistance * 0.3;
        const startRotation = (Math.random() - 0.5) * 180;

        gsap.set(piece, {
          x: startX - finalX,
          y: startY - finalY,
          rotation: startRotation,
          opacity: 0.1,
        });

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top bottom",
          end: "center 60%+=100px",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            gsap.to(piece, {
              x: (startX - finalX) * (1 - progress),
              y: (startY - finalY) * (1 - progress),
              rotation: startRotation * (1 - progress),
              opacity: 0.1 + 0.9 * progress,
              duration: 0.3,
              ease: "power2.out",
            });
          },
        });
      });
    };

    initAnimation();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [puzzleGrid, rows, cols, pieceSize, overlap]);

  const centerRow = Math.floor(rows / 2);
  const centerCol = Math.floor(cols / 2);
  const selectedPiece = pieces.find((p) => p.selected);
  const otherPieces = pieces.filter((p) => !p.selected);

  const getPieceContent = (rowIndex: number, colIndex: number) => {
    const isCenter = rowIndex === centerRow && colIndex === centerCol;

    if (isCenter && selectedPiece) {
      return selectedPiece.component;
    }

    const pieceIndex = rowIndex * cols + colIndex;
    const nonCenterIndex =
      pieceIndex > centerRow * cols + centerCol ? pieceIndex - 1 : pieceIndex;

    return otherPieces[nonCenterIndex % otherPieces.length]?.component || null;
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-20">
      {!puzzleGrid ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-slate-500">Yükleniyor...</div>
        </div>
      ) : (
        <div
          ref={containerRef}
          className="inline-block relative"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, ${pieceSize}px)`,
            gridTemplateRows: `repeat(${rows}, ${pieceSize}px)`,
            gap: 0,
            overflow: "visible",
            padding: `${overlap}px`,
          }}
        >
          {puzzleGrid.pieces.map((row, rowIndex) =>
            row.map((piece, colIndex) => {
              const key = `${rowIndex}-${colIndex}`;
              const content = getPieceContent(rowIndex, colIndex);

              return (
                <PuzzlePiece
                  key={key}
                  code={piece.code}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  pieceSize={pieceSize}
                  fillColor={fillColor}
                  strokeWidth={strokeWidth}
                  curvatureIntensity={curvatureIntensity}
                  content={content}
                  onRef={(el) => {
                    if (el) {
                      piecesRef.current.set(key, el);
                    }
                  }}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
