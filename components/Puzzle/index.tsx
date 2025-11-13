"use client";

import { useState, useMemo } from "react";
import { generatePuzzleGrid } from "./utils/puzzleMaker";
import { generatePuzzlePiecePath } from "./utils/puzzleGenerator";
import { calculatePieceDimensions } from "./utils/puzzlePieceGenerator";
import { FaSyncAlt } from "react-icons/fa";

export default function Puzzle() {
  const [rows, setRows] = useState(9);
  const [cols, setCols] = useState(9);
  const [pieceSize, setPieceSize] = useState(60);
  const [fillColor, setFillColor] = useState("#3b82f6");
  const [strokeWidth, setStrokeWidth] = useState(1);
  const [curvatureIntensity, setCurvatureIntensity] = useState(0.25);
  const [regenerateKey, setRegenerateKey] = useState(0);

  // Puzzle grid'i oluştur
  const puzzleGrid = useMemo(() => {
    return generatePuzzleGrid(rows, cols);
  }, [rows, cols, regenerateKey]);

  const { relativeStrokeWidth, viewBoxSize, tabDepth } =
    calculatePieceDimensions(pieceSize, strokeWidth, curvatureIntensity);

  const svgSize = pieceSize + tabDepth * 2;
  const overlap = tabDepth;

  const regenerateGrid = () => {
    setRegenerateKey((k) => k + 1);
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">
          Puzzle Oluşturucu
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Satır Sayısı: {rows}
            </label>
            <input
              type="range"
              min="3"
              max="15"
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Sütun Sayısı: {cols}
            </label>
            <input
              type="range"
              min="3"
              max="15"
              value={cols}
              onChange={(e) => setCols(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Parça Boyutu: {pieceSize}px
            </label>
            <input
              type="range"
              min="30"
              max="100"
              value={pieceSize}
              onChange={(e) => setPieceSize(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Çizgi Kalınlığı: {strokeWidth}px
            </label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.5"
              value={strokeWidth}
              onChange={(e) => setStrokeWidth(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Dolgu Rengi
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={fillColor}
                onChange={(e) => setFillColor(e.target.value)}
                className="w-16 h-12 rounded border border-slate-300 cursor-pointer"
              />
              <input
                type="text"
                value={fillColor}
                onChange={(e) => setFillColor(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg font-mono w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Eğrilik Yoğunluğu: {curvatureIntensity.toFixed(2)}
            </label>
            <input
              type="range"
              min="0.1"
              max="0.5"
              step="0.05"
              value={curvatureIntensity}
              onChange={(e) => setCurvatureIntensity(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={regenerateGrid}
              className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <FaSyncAlt className="w-5 h-5" />
              Yeniden Oluştur
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-center bg-slate-50 rounded-lg p-8 overflow-auto">
          <div
            className="inline-block"
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
                const pathData = generatePuzzlePiecePath(
                  piece.code,
                  pieceSize,
                  curvatureIntensity
                );

                return (
                  <svg
                    data-code={piece.code}
                    data-row={rowIndex}
                    data-col={colIndex}
                    key={`${rowIndex}-${colIndex}`}
                    viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
                    className="drop-shadow-sm"
                    style={{
                      width: `${svgSize}px`,
                      height: `${svgSize}px`,
                      marginLeft: `-${overlap}px`,
                      marginTop: `-${overlap}px`,
                      overflow: "visible",
                    }}
                  >
                    <defs>
                      <linearGradient
                        id={`gradient-${rowIndex}-${colIndex}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
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
                        fill={`url(#gradient-${rowIndex}-${colIndex})`}
                        stroke="#1e293b"
                        strokeWidth={relativeStrokeWidth}
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                );
              })
            )}
          </div>
        </div>

        <div className="mt-6 bg-slate-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-2">
            Grid Bilgisi
          </h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Toplam Parça:</span>
              <span className="font-mono font-semibold">{rows * cols}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Boyut:</span>
              <span className="font-mono font-semibold">
                {rows} × {cols}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
