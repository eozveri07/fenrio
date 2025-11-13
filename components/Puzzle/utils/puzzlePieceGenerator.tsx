import { generatePuzzlePiecePath } from "./puzzleGenerator";

export function calculatePieceDimensions(
  size: number,
  strokeWidth: number,
  curvatureIntensity: number
) {
  const relativeStrokeWidth = (strokeWidth / 200) * size;
  const tabDepth = size * curvatureIntensity;
  const padding = relativeStrokeWidth / 2 + tabDepth;
  const viewBoxSize = size + padding * 2;

  return {
    relativeStrokeWidth,
    tabDepth,
    padding,
    viewBoxSize,
  };
}

export function getEdgeLabel(digit: string): string {
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

export { generatePuzzlePiecePath };

