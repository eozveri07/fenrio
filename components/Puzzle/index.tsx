"use client";

import { useState, useEffect, useRef } from "react";
import { PUZZLE_ROTATION_MAP, RotationInfo } from "./rotation-map";

interface PuzzlePiece {
  id: number;
  row: number;
  col: number;
  image: string | React.ReactNode;
  correctPosition: { row: number; col: number };
  pieceCode: string; // Örnek: "1001" = üst çıkıntı, sağ düz, alt girinti, sol çıkıntı
  rotationInfo: RotationInfo; // Representative kod ve döndürme açısı
}

interface PuzzleProps {
  pieces: (string | React.ReactNode)[];
  rows?: number;
  cols?: number;
  maskPath?: string; // PNG mask dosyalarının bulunduğu path (varsayılan: "/puzzle-masks/")
}

// Edge kodunu parça koduna çevir (saat yönünde: üst-sağ-alt-sol)
// 0 = düz (flat), 1 = çıkıntı (tab), 2 = girinti (blank)
const generatePieceCode = (
  row: number,
  col: number,
  rows: number,
  cols: number,
  edgeMap: Map<string, "tab" | "blank" | "flat">
): string => {
  const key = (r: number, c: number, side: string) => `${r}-${c}-${side}`;

  // Kenar parçaları otomatik düz olmalı
  const top =
    row === 0
      ? "flat"
      : edgeMap.get(key(row - 1, col, "bottom")) === "tab"
      ? "blank"
      : "tab";
  const right =
    col === cols - 1 ? "flat" : Math.random() > 0.5 ? "tab" : "blank";
  const bottom =
    row === rows - 1 ? "flat" : Math.random() > 0.5 ? "tab" : "blank";
  const left =
    col === 0
      ? "flat"
      : edgeMap.get(key(row, col - 1, "right")) === "tab"
      ? "blank"
      : "tab";

  // Edge map'e kaydet
  edgeMap.set(key(row, col, "top"), top);
  edgeMap.set(key(row, col, "bottom"), bottom);
  edgeMap.set(key(row, col, "left"), left);
  edgeMap.set(key(row, col, "right"), right);

  // Saat yönünde üst-sağ-alt-sol formatında kod oluştur
  const codeToNumber = (edge: "tab" | "blank" | "flat"): string => {
    if (edge === "flat") return "0";
    if (edge === "tab") return "1";
    return "2"; // blank
  };

  return `${codeToNumber(top)}${codeToNumber(right)}${codeToNumber(
    bottom
  )}${codeToNumber(left)}`;
};

export default function Puzzle({
  pieces,
  rows = 3,
  cols = 3,
  maskPath = "/puzzle-masks/",
}: PuzzleProps) {
  const [puzzlePieces, setPuzzlePieces] = useState<PuzzlePiece[]>([]);
  const [containerSize, setContainerSize] = useState({
    width: 600,
    height: 600,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  // Container boyutunu güncelle (padding hariç)
  useEffect(() => {
    const updateSize = () => {
      const container = containerRef.current;
      if (container) {
        const padding = 32 * 2; // p-8 = 2rem = 32px, her iki taraftan
        setContainerSize({
          width: container.offsetWidth - padding,
          height: container.offsetHeight - padding,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Puzzle parçalarını oluştur ve karıştır
  useEffect(() => {
    if (pieces.length === 0) return;

    const totalPieces = rows * cols;
    const piecesToUse = pieces.slice(0, totalPieces);

    // Edge pattern'leri oluştur (komşular uyumlu olmalı)
    const edgeMap = new Map<string, "tab" | "blank" | "flat">();
    const newPieces: PuzzlePiece[] = piecesToUse.map((piece, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      const pieceCode = generatePieceCode(row, col, rows, cols, edgeMap);
      const rotationInfo = PUZZLE_ROTATION_MAP[pieceCode] || {
        representative: pieceCode,
        angle: 0,
      };

      return {
        id: index,
        row,
        col,
        image: piece,
        correctPosition: { row, col },
        pieceCode,
        rotationInfo,
      };
    });

    setPuzzlePieces(newPieces);
  }, [pieces, rows, cols, containerSize]);

  const pieceWidth = containerSize.width / cols;
  const pieceHeight = containerSize.height / rows;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] bg-gray-100 rounded-lg p-8"
      style={{ overflow: "visible" }}
    >
      {/* Puzzle pieces */}
      {puzzlePieces.map((piece) => {
        // Representative kodunu kullan (döndürme ile optimize edilmiş)
        const maskUrl = `${maskPath}puzzle-piece-${piece.rotationInfo.representative}.png`;
        const rotationAngle = piece.rotationInfo.angle;

        return (
          <div
            key={piece.id}
            className="absolute"
            style={{
              width: `${pieceWidth}px`,
              height: `${pieceHeight}px`,
              left: `${piece.correctPosition.col * pieceWidth}px`,
              top: `${piece.correctPosition.row * pieceHeight}px`,
              transform: `rotate(${rotationAngle}deg)`,
              transformOrigin: "center center",
            }}
          >
            {/* PNG mask ile puzzle parçası */}
            <div
              className="w-full h-full overflow-hidden shadow-lg"
              style={{
                maskImage: `url(${maskUrl})`,
                WebkitMaskImage: `url(${maskUrl})`,
                maskSize: "100% 100%",
                WebkitMaskSize: "100% 100%",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
              }}
            >
              {typeof piece.image === "string" ? (
                <img
                  src={piece.image}
                  alt={`Puzzle piece ${piece.id}`}
                  className="w-full h-full object-cover"
                  style={{
                    objectPosition: `${
                      (piece.correctPosition.col / (cols - 1 || 1)) * 100
                    }% ${(piece.correctPosition.row / (rows - 1 || 1)) * 100}%`,
                  }}
                />
              ) : (
                <div className="w-full h-full">{piece.image}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
