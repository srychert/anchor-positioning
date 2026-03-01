import {
    useCallback,
    useEffect,
    useId,
    useImperativeHandle,
    useMemo,
    useRef,
    type ComponentPropsWithoutRef,
    type CSSProperties,
    type ReactNode,
    type RefObject,
    type ToggleEvent
} from "react";
import type { Position } from "./types";
import { positionFallbackMap } from "./positionFallbackMap.ts";

export type PopoverBaseProps = {
    anchor: (props: {
        style: CSSProperties;
        open: () => void;
        close: () => void;
    }) => ReactNode;
    disablePageScroll?: boolean
    isOpen?: boolean;
    position: Position;
    fallbacks?: Position[];
    onClose?: () => void;
    onOpen?: () => void;
};

export type PopoverNonModalProps =
    PopoverBaseProps &
    ComponentPropsWithoutRef<"div"> & {
        mode?: "non-modal";
        ref?: RefObject<HTMLDivElement | null>;
    };

export type PopoverModalProps =
    PopoverBaseProps &
    ComponentPropsWithoutRef<"dialog"> & {
        mode: "modal";
        ref?: RefObject<HTMLDialogElement | null>;
    };

export type PopoverProps = PopoverNonModalProps | PopoverModalProps;

export function Popover({ ref, anchor, className, disablePageScroll, isOpen, position, fallbacks, onClose, onOpen, children, popover = 'auto', ...props }: PopoverProps) {
    const id = useId();
    const isModal = props.mode === "modal"

    const divRef = useRef<HTMLDivElement>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const elementRef = isModal ? dialogRef : divRef;

    useImperativeHandle(
        ref as RefObject<HTMLElement>,
        () => elementRef.current!,
        [elementRef]
    );

    const anchorName = `--popover-anchor-${id}`;

    const positionFallbacks = useMemo(() => {
        return (fallbacks ?? (positionFallbackMap[position]))?.map((fallback) => `--${fallback}`).join();
    }, [fallbacks, position]);

    const lockPageScroll = () => {
        document.body.style.overflow = 'hidden'
    }

    const unlockPageScroll = () => {
        document.body.style.overflow = ''
    }

    const open = useCallback(() => {
        if (!isModal) {
            divRef.current?.togglePopover?.(true);
        }

        if (isModal) {
            if (!dialogRef.current?.open) {
                dialogRef.current?.showModal();
            }
        }

        if (disablePageScroll) lockPageScroll()
    }, [disablePageScroll, isModal]);

    const close = useCallback(() => {
        if (!isModal) {
            divRef.current?.togglePopover?.(false);
        }

        if (isModal) {
            if (dialogRef.current?.open) {
                dialogRef.current?.close();
            }
        }

        unlockPageScroll()
    }, [isModal]);

    const handleToggle = (e: ToggleEvent<HTMLDivElement> & ToggleEvent<HTMLDialogElement>) => {
        if (e.newState === "open") {
            if (disablePageScroll) lockPageScroll()
            onOpen?.()
        }
        if (e.newState === "closed") {
            unlockPageScroll()
            onClose?.()
        }
        props.onToggle?.(e)
    }

    useEffect(() => {
        if (isOpen === undefined) return;

        const isPopoverOpen = (isModal ? dialogRef?.current?.open : divRef.current?.matches?.(":popover-open")) ?? false

        if (isOpen && !isPopoverOpen) open()
        if (!isOpen && isPopoverOpen) close()

    }, [isOpen, isModal, open, close]);

    const mergedClassName = useMemo(() => (
        [
            "popover",
            position && `popover--${position}`,
            className,
        ]
            .filter(Boolean)
            .join(" ")
    ), [className, position])

    return (
        <>
            {/* eslint-disable-next-line react-hooks/refs */}
            {anchor({ style: { anchorName }, open, close })}

            <div
                className="popover"
                style={
                    {
                        "--anchor-name": anchorName,
                        "--position-fallbacks": positionFallbacks,
                    } as CSSProperties
                }
            >
                {isModal ? (
                    <dialog
                        {...(props)}
                        ref={dialogRef}
                        className={mergedClassName}
                        popover={popover}
                        onClick={(e) => {
                            if (e.target === dialogRef.current) {
                                close();
                            }
                            props.onClick?.(e)
                        }}
                        onToggle={handleToggle}
                    >
                        {children}
                    </dialog>
                ) : (
                    <div
                        {...(props)}
                        ref={divRef}
                        className={mergedClassName}
                        popover={popover}
                        onToggle={handleToggle}
                    >
                        {children}
                    </div>
                )}
            </div>
        </>
    );
}