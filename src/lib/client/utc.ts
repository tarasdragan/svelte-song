import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any }
  ? Omit<T, "children">
  : T
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & {
  ref?: U | null
}

export function goBack() {
  if (window.history.length > 1) {
    window.history.back()
  } else {
    // Якщо історії немає (наприклад, відкрили посилання прямо в новому вікні),
    // краще відправити на головну або до списку
    import("$app/navigation").then((m) => m.goto("/"))
  }
}
