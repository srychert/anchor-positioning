import type { Position } from "./types";

export const positionFallbackMap: Record<Position, Position[]> = {
    'top-left': ['top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center'],
    'top-start': ['top-end', 'bottom-start', 'bottom-end', 'top-center', 'bottom-center'],
    'top-center': ['bottom-center'],
    'top-end': ['top-start', 'bottom-end', 'bottom-start', 'top-center', 'bottom-center'],
    'top-right': ['top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'],
    'bottom-left': ['bottom-right', 'top-left', 'top-right', 'bottom-center', 'top-center'],
    'bottom-start': ['bottom-end', 'top-start', 'top-end', 'bottom-center', 'top-center'],
    'bottom-center': ['top-center'],
    'bottom-end': ['bottom-start', 'top-end', 'top-start', 'bottom-center', 'top-center'],
    'bottom-right': ['bottom-left', 'top-right', 'top-left', 'bottom-center', 'top-center'],
    'left-start': ['left-end', 'right-start', 'right-end', 'left-center', 'right-center'],
    'left-center': ['right-center'],
    'left-end': ['left-start', 'right-end', 'right-start', 'left-center', 'right-center'],
    'right-start': ['right-end', 'left-start', 'left-end', 'right-center', 'left-center'],
    'right-center': ['left-center'],
    'right-end': ['right-start', 'left-end', 'left-start', 'right-center', 'left-center'],
} as const
