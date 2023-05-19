export function formatBytes(bytes: number, decimals?: number): FormatBytes;
export type FormatBytes = {
    value: number;
    unit: string;
};
