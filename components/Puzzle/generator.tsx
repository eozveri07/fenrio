import { useState } from "react";
import { generatePuzzlePiecePath } from "./utils/puzzleGenerator";
import { FaSyncAlt } from "react-icons/fa";

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

  const pathData = generatePuzzlePiecePath(code, size, curvatureIntensity);
  // Stroke width'i boyuta göre orantılı yap (200px için 2px = 1% oranında)
  const relativeStrokeWidth = (strokeWidth / 200) * size;
  // Tab depth'i hesapla (çıkıntılar için)
  const tabDepth = size * curvatureIntensity;
  // ViewBox'ı stroke ve çıkıntıları da içerecek şekilde ayarla
  // Stroke yarı yarıya içeri ve dışarı doğru genişler, bu yüzden yarısını ekliyoruz
  // Tab depth'i de ekliyoruz çünkü çıkıntılar dışarı doğru uzanıyor
  const padding = relativeStrokeWidth / 2 + tabDepth;
  const viewBoxSize = size + padding * 2;

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
            <svg
              id="puzzle-svg"
              viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
              className="max-w-full h-auto drop-shadow-xl"
              style={{ width: "100%" }}
            >
              <defs>
                <filter
                  id="shadow"
                  x="-50%"
                  y="-50%"
                  width="2010%"
                  height="200%"
                >
                  <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                  <feOffset dx="2" dy="2" result="offsetblur" />
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.3" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient
                  id="gradient"
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
                }) translate(${-size / 2}, ${-size / 2})`}
              >
                <path
                  d={pathData}
                  fill="url(#gradient)"
                  stroke="#1e293b"
                  strokeWidth={relativeStrokeWidth}
                  strokeLinejoin="round"
                  filter="url(#shadow)"
                />
              </g>
            </svg>
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

function getEdgeLabel(digit: string): string {
  switch (digit) {
    case "0":
      return "Düz";
    case "1":
      return "Çıkıntı";
    case "2":
      return "Girinti";
    default:
      return "Bilinmeyen";
  }
}

export default PuzzlePieceGenerator;
