type EdgeType = "0" | "1" | "2";

export function generatePuzzlePiecePath(
  code: string,
  size: number,
  curvatureIntensity: number = 0.25
): string {
  const edges = code.padEnd(4, "0").split("") as EdgeType[];
  const tabWidth = size * 0.3;
  const tabDepth = size * curvatureIntensity;

  let path = `M 0 0`;

  path += drawTopEdge(edges[0], size, tabWidth, tabDepth);
  path += ` L ${size} 0`;

  path += drawRightEdge(edges[1], size, tabWidth, tabDepth);
  path += ` L ${size} ${size}`;

  path += drawBottomEdge(edges[2], size, tabWidth, tabDepth);
  path += ` L 0 ${size}`;

  path += drawLeftEdge(edges[3], size, tabWidth, tabDepth);
  path += ` Z`;

  return path;
}

function drawTopEdge(
  type: EdgeType,
  size: number,
  tabWidth: number,
  tabDepth: number
): string {
  if (type === "0") {
    return "";
  }

  const center = size / 2;
  const direction = type === "1" ? -1 : 1;
  const halfTab = tabWidth / 2;

  const tabStart = center - halfTab;
  const tabEnd = center + halfTab;
  const depth = tabDepth * direction;
  const controlDepth = depth * 0.55;

  return (
    ` L ${tabStart.toFixed(2)} 0` +
    ` C ${(tabStart - (tabEnd - tabStart) * 0.3).toFixed(2)} ${controlDepth.toFixed(2)}, ${(tabStart + (tabEnd - tabStart) * 0.1).toFixed(2)} ${depth.toFixed(2)}, ${((tabStart + tabEnd) / 2).toFixed(2)} ${depth.toFixed(2)}` +
    ` C ${(tabEnd - (tabEnd - tabStart) * 0.1).toFixed(2)} ${depth.toFixed(2)}, ${(tabEnd + (tabEnd - tabStart) * 0.3).toFixed(2)} ${controlDepth.toFixed(2)}, ${tabEnd.toFixed(2)} 0`
  );
}

function drawRightEdge(
  type: EdgeType,
  size: number,
  tabWidth: number,
  tabDepth: number
): string {
  if (type === "0") {
    return "";
  }

  const center = size / 2;
  const direction = type === "1" ? 1 : -1;
  const halfTab = tabWidth / 2;

  const tabStart = center - halfTab;
  const tabEnd = center + halfTab;
  const depth = tabDepth * direction;
  const controlDepth = depth * 0.55;

  return (
    ` L ${size} ${tabStart.toFixed(2)}` +
    ` C ${(size + controlDepth).toFixed(2)} ${(tabStart - (tabEnd - tabStart) * 0.3).toFixed(2)}, ${(size + depth).toFixed(2)} ${(tabStart + (tabEnd - tabStart) * 0.1).toFixed(2)}, ${(size + depth).toFixed(2)} ${((tabStart + tabEnd) / 2).toFixed(2)}` +
    ` C ${(size + depth).toFixed(2)} ${(tabEnd - (tabEnd - tabStart) * 0.1).toFixed(2)}, ${(size + controlDepth).toFixed(2)} ${(tabEnd + (tabEnd - tabStart) * 0.3).toFixed(2)}, ${size} ${tabEnd.toFixed(2)}`
  );
}

function drawBottomEdge(
  type: EdgeType,
  size: number,
  tabWidth: number,
  tabDepth: number
): string {
  if (type === "0") {
    return "";
  }

  const center = size / 2;
  const direction = type === "1" ? 1 : -1;
  const halfTab = tabWidth / 2;

  const tabStart = center - halfTab;
  const tabEnd = center + halfTab;
  const depth = tabDepth * direction;
  const controlDepth = depth * 0.55;

  return (
    ` L ${tabEnd.toFixed(2)} ${size}` +
    ` C ${(tabEnd + (tabEnd - tabStart) * 0.3).toFixed(2)} ${(size + controlDepth).toFixed(2)}, ${(tabEnd - (tabEnd - tabStart) * 0.1).toFixed(2)} ${(size + depth).toFixed(2)}, ${((tabStart + tabEnd) / 2).toFixed(2)} ${(size + depth).toFixed(2)}` +
    ` C ${(tabStart + (tabEnd - tabStart) * 0.1).toFixed(2)} ${(size + depth).toFixed(2)}, ${(tabStart - (tabEnd - tabStart) * 0.3).toFixed(2)} ${(size + controlDepth).toFixed(2)}, ${tabStart.toFixed(2)} ${size}`
  );
}

function drawLeftEdge(
  type: EdgeType,
  size: number,
  tabWidth: number,
  tabDepth: number
): string {
  if (type === "0") {
    return "";
  }

  const center = size / 2;
  const direction = type === "1" ? -1 : 1;
  const halfTab = tabWidth / 2;

  const tabStart = center - halfTab;
  const tabEnd = center + halfTab;
  const depth = tabDepth * direction;
  const controlDepth = depth * 0.55;

  return (
    ` L 0 ${tabEnd.toFixed(2)}` +
    ` C ${controlDepth.toFixed(2)} ${(tabEnd + (tabEnd - tabStart) * 0.3).toFixed(2)}, ${depth.toFixed(2)} ${(tabEnd - (tabEnd - tabStart) * 0.1).toFixed(2)}, ${depth.toFixed(2)} ${((tabStart + tabEnd) / 2).toFixed(2)}` +
    ` C ${depth.toFixed(2)} ${(tabStart + (tabEnd - tabStart) * 0.1).toFixed(2)}, ${controlDepth.toFixed(2)} ${(tabStart - (tabEnd - tabStart) * 0.3).toFixed(2)}, 0 ${tabStart.toFixed(2)}`
  );
}
