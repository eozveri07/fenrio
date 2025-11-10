"use client";

import { useState, useEffect, useRef } from "react";
import { PUZZLE_ROTATION_MAP, RotationInfo } from "./rotation-map";

interface PuzzlePiece {
  id: number;
  row: number;
  col: number;
  image: string | React.ReactNode;
  currentPosition: { x: number; y: number };
  correctPosition: { row: number; col: number };
  isPlaced: boolean;
  pieceCode: string; // Örnek: "1001" = üst çıkıntı, sağ düz, alt girinti, sol çıkıntı
  rotationInfo: RotationInfo; // Representative kod ve döndürme açısı
}

interface PuzzleProps {
  pieces: (string | React.ReactNode)[];
  rows?: number;
  cols?: number;
  maskPath?: string; // PNG mask dosyalarının bulunduğu path (varsayılan: "/puzzle-masks/")
  onComplete?: () => void;
}

// Edge kodunu parça koduna çevir (saat yönünde: üst-sağ-alt-sol)
// 0 = düz (flat), 1 = çıkıntı (tab), 2 = girinti (blank)
// Not: "0000" kodu oluşturulmaz - tüm kenarları düz olan puzzle parçası olamaz
// - Köşe parçalar: 2 kenar flat
// - Kenar parçalar (köşe değil): 1 kenar flat
// - İç parçalar: 0 kenar flat (hepsi tab/blank)
const generatePieceCode = (
  row: number,
  col: number,
  rows: number,
  cols: number,
  edgeMap: Map<string, "tab" | "blank" | "flat">
): string => {
  const key = (r: number, c: number, side: string) => `${r}-${c}-${side}`;

  // Kenar kontrolü
  const isTopEdge = row === 0;
  const isBottomEdge = row === rows - 1;
  const isLeftEdge = col === 0;
  const isRightEdge = col === cols - 1;

  // Kenar parçaları otomatik düz olmalı
  const top = isTopEdge ? "flat" : edgeMap.get(key(row - 1, col, "bottom")) === "tab" ? "blank" : "tab";
  const right = isRightEdge ? "flat" : Math.random() > 0.5 ? "tab" : "blank";
  const bottom = isBottomEdge ? "flat" : Math.random() > 0.5 ? "tab" : "blank";
  const left = isLeftEdge ? "flat" : edgeMap.get(key(row, col - 1, "right")) === "tab" ? "blank" : "tab";

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

  const code = `${codeToNumber(top)}${codeToNumber(right)}${codeToNumber(bottom)}${codeToNumber(left)}`;
  
  // Güvenlik kontrolü: "0000" kodu oluşturulmamalı
  if (code === "0000") {
    console.error(`Invalid puzzle piece code "0000" generated at row ${row}, col ${col}. This should never happen.`);
    // Fallback: İç parça gibi davran (rastgele tab/blank)
    return `${codeToNumber("tab")}${codeToNumber("blank")}${codeToNumber("tab")}${codeToNumber("blank")}`;
  }

  return code;
};

export default function Puzzle({
  pieces,
  rows = 3,
  cols = 3,
  maskPath = "/puzzle-masks/",
  onComplete,
}: PuzzleProps) {
  const [puzzlePieces, setPuzzlePieces] = useState<PuzzlePiece[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [draggedPiece, setDraggedPiece] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(
    null
  );
  const [containerSize, setContainerSize] = useState({ width: 600, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);
  const piecesRef = useRef<Map<number, HTMLDivElement>>(new Map());

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
      const rotationInfo = PUZZLE_ROTATION_MAP[pieceCode] || { representative: pieceCode, angle: 0 };

      return {
        id: index,
        row,
        col,
        image: piece,
        currentPosition: { x: 0, y: 0 },
        correctPosition: { row, col },
        isPlaced: false,
        pieceCode,
        rotationInfo,
      };
    });

    // Parçaları karıştır ve rastgele pozisyonlara yerleştir
    const shuffled = [...newPieces];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Karıştırılmış parçaları rastgele pozisyonlara yerleştir
    const containerWidth = containerSize.width;
    const containerHeight = containerSize.height;
    const pieceWidth = containerWidth / cols;
    const pieceHeight = containerHeight / rows;

    shuffled.forEach((piece) => {
      const randomX = Math.random() * (containerWidth - pieceWidth);
      const randomY = Math.random() * (containerHeight - pieceHeight);
      piece.currentPosition = { x: randomX, y: randomY };
    });

    setPuzzlePieces(shuffled);
  }, [pieces, rows, cols, containerSize]);

  // Mouse event handlers
  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    pieceId: number
  ) => {
    e.preventDefault();
    const piece = puzzlePieces.find((p) => p.id === pieceId);
    if (!piece || piece.isPlaced) return;

    const rect = e.currentTarget.getBoundingClientRect();
    setSelectedPiece(pieceId);
    setDraggedPiece(pieceId);
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (draggedPiece === null || dragOffset === null) return;

    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const x = e.clientX - containerRect.left - dragOffset.x;
    const y = e.clientY - containerRect.top - dragOffset.y;

    setPuzzlePieces((prev) =>
      prev.map((piece) =>
        piece.id === draggedPiece
          ? { ...piece, currentPosition: { x, y } }
          : piece
      )
    );
  };

  const handleMouseUp = () => {
    if (draggedPiece === null) return;

    const draggedPieceData = puzzlePieces.find((p) => p.id === draggedPiece);
    if (!draggedPieceData || draggedPieceData.isPlaced) {
      setSelectedPiece(null);
      setDraggedPiece(null);
      setDragOffset(null);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // Snap kontrolü - doğru pozisyona yakınsa yerleştir
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const pieceWidth = containerWidth / cols;
    const pieceHeight = containerHeight / rows;

    const correctX = draggedPieceData.correctPosition.col * pieceWidth;
    const correctY = draggedPieceData.correctPosition.row * pieceHeight;

    const currentX = draggedPieceData.currentPosition.x;
    const currentY = draggedPieceData.currentPosition.y;

    const threshold = Math.min(pieceWidth, pieceHeight) * 0.25;

    if (
      Math.abs(currentX - correctX) < threshold &&
      Math.abs(currentY - correctY) < threshold
    ) {
      // Doğru pozisyona yerleştir
      setPuzzlePieces((prev) => {
        const updated = prev.map((piece) =>
          piece.id === draggedPiece
            ? {
                ...piece,
                currentPosition: { x: correctX, y: correctY },
                isPlaced: true,
              }
            : piece
        );

        // Tüm parçalar yerleştirildi mi kontrol et
        const allPlaced = updated.every((p) => p.isPlaced);
        if (allPlaced && onComplete) {
          setTimeout(() => onComplete(), 100);
        }

        return updated;
      });
    }

    setSelectedPiece(null);
    setDraggedPiece(null);
    setDragOffset(null);
  };

  const pieceWidth = containerSize.width / cols;
  const pieceHeight = containerSize.height / rows;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] bg-gray-100 rounded-lg p-8"
      style={{ overflow: "visible" }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Puzzle pieces */}
      {puzzlePieces.map((piece) => {
        // Representative kodunu kullan (döndürme ile optimize edilmiş)
        const maskUrl = `${maskPath}puzzle-piece-${piece.rotationInfo.representative}.png`;
        const rotationAngle = piece.rotationInfo.angle;

        // Transform: scale + rotation
        const transform = selectedPiece === piece.id && !piece.isPlaced
          ? `scale(1.1) rotate(${rotationAngle}deg)`
          : `rotate(${rotationAngle}deg)`;

        return (
          <div
            key={piece.id}
            ref={(el) => {
              if (el) piecesRef.current.set(piece.id, el);
            }}
            className={`absolute cursor-move ${
              piece.isPlaced ? "cursor-default" : "cursor-grab active:cursor-grabbing"
            } ${selectedPiece === piece.id ? "z-50" : "z-10"}`}
            style={{
              width: `${pieceWidth}px`,
              height: `${pieceHeight}px`,
              left: piece.isPlaced
                ? `${piece.correctPosition.col * pieceWidth}px`
                : `${piece.currentPosition.x}px`,
              top: piece.isPlaced
                ? `${piece.correctPosition.row * pieceHeight}px`
                : `${piece.currentPosition.y}px`,
              transform,
              transformOrigin: "center center",
              transition: piece.isPlaced ? "all 0.3s ease" : "transform 0.2s ease",
            }}
            onMouseDown={(e) => handleMouseDown(e, piece.id)}
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
                    }% ${
                      (piece.correctPosition.row / (rows - 1 || 1)) * 100
                    }%`,
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
