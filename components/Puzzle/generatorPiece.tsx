import { useState } from "react";
import { getEdgeLabel } from "./utils/puzzlePieceGenerator";
import { FaSyncAlt } from "react-icons/fa";
import PuzzlePiece from "./PuzzlePiece";

const PuzzlePieceGenerator = () => {
  const [code, setCode] = useState("0211");
  const [size, setSize] = useState(200);
  const [fillColor, setFillColor] = useState("#3b82f6");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [curvatureIntensity, setCurvatureIntensity] = useState(0.25);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^012]/g, "").slice(0, 4);
    setCode(value);
  };

  const randomizeCode = () => {
    const random = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 3)
    ).join("");
    setCode(random);
  };


  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">
            Yapılandırma
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Puzzle Kodu
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={code}
                  onChange={handleCodeChange}
                  placeholder="0211"
                  maxLength={4}
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-2xl font-mono tracking-widest text-center"
                />
                <button
                  onClick={randomizeCode}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  title="Rastgele"
                >
                  <FaSyncAlt className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Üst, Sağ, Alt, Sol (saat yönünde 12'den başlayarak)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Boyut: {size}px
              </label>
              <input
                type="range"
                min="100"
                max="400"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
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
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Çizgi Kalınlığı: {strokeWidth}px
              </label>
              <input
                type="range"
                min="1"
                max="8"
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(Number(e.target.value))}
                className="w-full"
              />
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
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">
            Önizleme
          </h2>

          <div className="flex items-center justify-center bg-slate-50 rounded-lg p-4">
            <div className="max-w-full">
              <PuzzlePiece
                code={code}
                rowIndex={0}
                colIndex={0}
                pieceSize={size}
                fillColor={fillColor}
                strokeWidth={strokeWidth}
                curvatureIntensity={curvatureIntensity}
              />
            </div>
          </div>

          <div className="mt-6 bg-slate-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-slate-700 mb-2">
              Kenar Yapılandırması
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Üst:</span>
                <span className="font-mono font-semibold">
                  {code[0] || "-"} ({getEdgeLabel(code[0])})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Sağ:</span>
                <span className="font-mono font-semibold">
                  {code[1] || "-"} ({getEdgeLabel(code[1])})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Alt:</span>
                <span className="font-mono font-semibold">
                  {code[2] || "-"} ({getEdgeLabel(code[2])})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Sol:</span>
                <span className="font-mono font-semibold">
                  {code[3] || "-"} ({getEdgeLabel(code[3])})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuzzlePieceGenerator;
