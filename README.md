# React Popover (Popover API + `position-try-fallbacks`)

A modern, headless **React Popover** component built on top of the
**native HTML Popover API**.

## Features

-   Non-modal popovers (`<div popover>`)
-   Modal popovers via `<dialog popover>`
-   Dynamic positioning using `position-try-fallbacks`
-   Fully typed (TypeScript)
-   Controlled and uncontrolled usage
-   Custom anchor render function
-   Optional page scroll locking

------------------------------------------------------------------------

## Preview

![Popover Position Grid](./grid.png)

The grid above demonstrates all supported `PopoverPosition` values and
their spatial relationship to the anchor element.

------------------------------------------------------------------------

## Supported Positions

``` ts
export type PopoverPosition =
  | 'top-left' | 'top-start' | 'top' | 'top-end' | 'top-right'
  | 'bottom-left' | 'bottom-start' | 'bottom' | 'bottom-end' | 'bottom-right'
  | 'left-start' | 'left' | 'left-end'
  | 'right-start' | 'right' | 'right-end'
```

Position grid:

| top-left    | top-start    | top           | top-end    | top-right    |
|-------------|--------------|---------------|------------|--------------|
| left-start  | -            | -             | -          | right-start  |
| left        | -            | -             | -          | right        |
| left-end    | -            | -             | -          | right-end    |
| bottom-left | bottom-start | bottom        | bottom-end | bottom-right |

------------------------------------------------------------------------

## Basic Usage (Non-Modal)

``` tsx
import { Popover } from "./popover";

<Popover
  position="top"
  anchor={({ open, close, style }) => (
    <button style={style} onClick={open}>
      Open popover
    </button>
  )}
>
  <div>
    Hello from popover
  </div>
</Popover>
```

------------------------------------------------------------------------

## Modal Usage

When `mode="modal"` is passed, the component renders a
`<dialog popover>`.

``` tsx
<Popover
  mode="modal"
  position="bottom"
  anchor={({ open, style }) => (
    <button style={style} onClick={open}>
      Open modal popover
    </button>
  )}
>
  <div>
    This is rendered inside a dialog element.
  </div>
</Popover>
```

------------------------------------------------------------------------

## Controlled Usage

``` tsx
const [open, setOpen] = useState(false);

<Popover
  isOpen={open}
  onOpen={() => setOpen(true)}
  onClose={() => setOpen(false)}
  position="right"
  anchor={({ open }) => (
    <button onClick={open}>Toggle</button>
  )}
>
  Content
</Popover>
```

------------------------------------------------------------------------

# Positioning Behavior

The component:

1.  Uses CSS anchor positioning
2.  Applies `position-try-fallbacks`
3.  Automatically flips when space is insufficient
4.  Applies optional `gap` offset
5.  Accepts custom fallback order via `fallbackPositions`

Example:

``` tsx
<Popover
  position="top"
  fallbackPositions={["bottom", "right", "left"]}
  gap={16}
/>
```

------------------------------------------------------------------------

# Scroll Locking

When `disablePageScroll` is enabled:

-   Body scrolling is disabled while open
-   Automatically restored on close

``` tsx
<Popover disablePageScroll />
```

------------------------------------------------------------------------

# Browser Support

Requires browsers that support:

-   HTML Popover API
-   CSS Anchor Positioning
-   `position-try-fallbacks`

Baseline 2026

------------------------------------------------------------------------


# Design Philosophy

This component is:

* Headless (no opinionated styling)
* Native-first (no positioning libraries)
* Lightweight
* Strictly typed
* Declarative

It intentionally avoids:

* Portals
* External layout engines
* Complex overlay managers


------------------------------------------------------------------------


# License

MIT
