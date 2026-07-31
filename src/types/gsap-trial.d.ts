declare module "gsap-trial/ScrollSmoother" {
    export class ScrollSmoother {
        static create(config?: Record<string, unknown>): ScrollSmoother;
        static refresh(force?: boolean): void;
        scrollTo(
            target: string | number | Record<string, unknown> | null,
            y?: number | boolean,
            position?: string
        ): void;
        scrollTop(value?: number): void;
        paused(value?: boolean): boolean | void;
    }
}

declare module "gsap-trial/SplitText" {
    export class SplitText {
        constructor(
            target:
                | string
                | string[]
                | Element
                | Element[]
                | ArrayLike<Element>
                | NodeListOf<Element>,
            vars?: Record<string, unknown>
        );
        chars: any[];
        words: any[];
        revert(): void;
    }
}
