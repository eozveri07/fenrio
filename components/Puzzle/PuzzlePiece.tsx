"use client";

import React from "react";
import { generatePuzzlePiecePath } from "./utils/puzzleGenerator";
import { calculatePieceDimensions } from "./utils/puzzlePieceGenerator";

interface PuzzlePieceProps {
  code: string;
  rowIndex: number;
  colIndex: number;
  pieceSize: number;
  fillColor: string;
  strokeWidth: number;
  curvatureIntensity: number;
  content?: React.ReactNode;
  onRef?: (el: SVGSVGElement | null) => void;
}

export default function PuzzlePiece({
  code,
  rowIndex,
  colIndex,
  pieceSize,
  fillColor,
  strokeWidth,
  curvatureIntensity,
  content,
  onRef,
}: PuzzlePieceProps) {
  const { relativeStrokeWidth, viewBoxSize, tabDepth } =
    calculatePieceDimensions(pieceSize, strokeWidth, curvatureIntensity);

  const svgSize = pieceSize + tabDepth * 2;
  const overlap = tabDepth;
  const pathData = generatePuzzlePiecePath(code, pieceSize, curvatureIntensity);
  const gradientId = `gradient-${rowIndex}-${colIndex}`;

  return (
    <svg
      ref={onRef}
      data-code={code}
      data-row={rowIndex}
      data-col={colIndex}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      className="drop-shadow-sm"
      style={{
        width: `${svgSize}px`,
        height: `${svgSize}px`,
        marginLeft: `-${overlap}px`,
        marginTop: `-${overlap}px`,
        overflow: "visible",
        position: "relative",
      }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop
            offset="0%"
            style={{ stopColor: fillColor, stopOpacity: 1 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: fillColor, stopOpacity: 0.7 }}
          />
        </linearGradient>
      </defs>

      <g
        transform={`translate(${viewBoxSize / 2}, ${
          viewBoxSize / 2
        }) translate(${-pieceSize / 2}, ${-pieceSize / 2})`}
      >
        <path
          d={pathData}
          fill={`url(#${gradientId})`}
          stroke="#1e293b"
          strokeWidth={relativeStrokeWidth}
          strokeLinejoin="round"
        />
      </g>

      {content && (
        <foreignObject
          x={overlap}
          y={overlap}
          width={pieceSize}
          height={pieceSize}
        >
          <div className="w-full h-full flex items-center justify-center">
            {content}
          </div>
        </foreignObject>
      )}
    </svg>
  );
}

