export function roundForDisplay(x: number): number {
  return Math.round(x * 100) / 100;
}

export function toGpText(n: number | undefined): string {
  return roundAndAppendOrDefault(n, "gp");
}
export function toHourText(n: number | undefined): string {
  const hourString: string = n === 1 ? "hour" : "hours";
  return roundAndAppendOrDefault(n, hourString);
}
export function toGpPerHourText(n: number | undefined): string {
  return roundAndAppendOrDefault(n, "gp / hour");
}
export function toModifierText(n: number | undefined): string {
  return n ? "+" + roundForDisplay(n) : "";
}
export function toDCText(n: number | undefined): string {
  return n?.toString() ?? "";
}
export function roundAndAppendOrDefault(
  n: number | undefined,
  s: string
): string {
  return n ? roundForDisplay(n) + " " + s : "";
}
export function toDisplayList(list: string[] | undefined): string[] {
  return list ?? [];
}

export const noItemNamePlaceholder: string = "Please, select an item!";
export const nothingToDisplayPlaceholder: string = "--";
