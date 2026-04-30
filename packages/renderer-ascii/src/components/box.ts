import { AsciiSymbol } from "../theme/ascii-symbols.js";

export const renderBox = (
  title: string,
  width: number,
  contentLines: readonly string[],
): readonly string[] => {
  const safeWidth = Math.max(20, width);
  const innerWidth = safeWidth - 2;
  const top = `${AsciiSymbol.TopLeft}${AsciiSymbol.Horizontal.repeat(innerWidth)}${AsciiSymbol.TopRight}`;
  const bottom = `${AsciiSymbol.BottomLeft}${AsciiSymbol.Horizontal.repeat(innerWidth)}${AsciiSymbol.BottomRight}`;
  const titleLine = renderBoxLine(` ${title}`, innerWidth);

  return [
    top,
    titleLine,
    `${AsciiSymbol.LeftT}${AsciiSymbol.Horizontal.repeat(innerWidth)}${AsciiSymbol.RightT}`,
    ...contentLines.map((line) => renderBoxLine(line, innerWidth)),
    bottom,
  ];
};

export const renderBoxLine = (content: string, innerWidth: number): string => {
  const clipped = content.length > innerWidth ? content.slice(0, innerWidth) : content;
  const padded = clipped.padEnd(innerWidth, " ");

  return `${AsciiSymbol.Vertical}${padded}${AsciiSymbol.Vertical}`;
};