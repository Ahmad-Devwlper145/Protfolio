declare module "gsap-trial/ScrollSmoother" {
    export class ScrollSmoother {
        static create(config?: Record<string, unknown>): ScrollSmoother;
        static refresh(force?: boolean): void;
        scrollTo(target: string | number | Record<string, unknown>, y?: number | boolean, position?: string): void;
        scrollTop(value?: number): void;
        paused(value?: boolean): boolean | void;
    }
}

declare module "gsap-trial/SplitText" {
    export class SplitText {
        constructor(
            target: string | Element | ArrayLike<Element> | Element[],
            vars?: Record<string, unknown>
        );
        chars: unknown[];
        words: unknown[];
        revert(): void;
    }
}
