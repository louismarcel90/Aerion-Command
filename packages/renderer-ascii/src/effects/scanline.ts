export const buildScanline = (width: number, tick: number): string => {
  const safeWidth = Math.max(20, width);
  const cursor = tick % safeWidth;

  return Array.from({ length: safeWidth }, (_, index) =>
    index === cursor ? "◆" : "·",
  ).join("");
};