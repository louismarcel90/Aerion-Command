export type PremiumRenderOptions = {
  readonly colorEnabled: boolean;
  readonly showScanline: boolean;
  readonly showControls: boolean;
};

export const defaultPremiumRenderOptions: PremiumRenderOptions = {
  colorEnabled: true,
  showScanline: true,
  showControls: true,
};