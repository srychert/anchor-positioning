import type { PopoverPosition } from "./types";

export const positionFallbackMap: Record<PopoverPosition, PopoverPosition[]> = {
    'top-left': ['top-right', 'bottom-left', 'bottom-right', 'top', 'bottom'],
    'top-start': ['top-end', 'bottom-start', 'bottom-end', 'top', 'bottom'],
    'top': ['bottom'],
    'top-end': ['top-start', 'bottom-end', 'bottom-start', 'top', 'bottom'],
    'top-right': ['top-left', 'bottom-right', 'bottom-left', 'top', 'bottom'],
    'bottom-left': ['bottom-right', 'top-left', 'top-right', 'bottom', 'top'],
    'bottom-start': ['bottom-end', 'top-start', 'top-end', 'bottom', 'top'],
    'bottom': ['top'],
    'bottom-end': ['bottom-start', 'top-end', 'top-start', 'bottom', 'top'],
    'bottom-right': ['bottom-left', 'top-right', 'top-left', 'bottom', 'top'],
    'left-start': ['left-end', 'right-start', 'right-end', 'left', 'right'],
    'left': ['right'],
    'left-end': ['left-start', 'right-end', 'right-start', 'left', 'right'],
    'right-start': ['right-end', 'left-start', 'left-end', 'right', 'left'],
    'right': ['left'],
    'right-end': ['right-start', 'left-end', 'left-start', 'right', 'left'],
} as const
