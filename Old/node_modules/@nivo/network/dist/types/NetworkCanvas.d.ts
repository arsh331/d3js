/// <reference types="react" />
import { InputNode, InputLink } from './types';
export declare const NetworkCanvas: import("react").ForwardRefExoticComponent<Partial<import("./types").NetworkCommonProps<InputNode, InputLink>> & import("./types").NetworkDataProps<InputNode, InputLink> & import("@nivo/core").Dimensions & {
    layers?: (import("./types").LayerId | import("./types").CustomCanvasLayer<InputNode, InputLink>)[] | undefined;
    renderNode?: import("./types").NodeCanvasRenderer<InputNode> | undefined;
    renderLink?: import("./types").LinkCanvasRenderer<InputNode, InputLink> | undefined;
    pixelRatio?: number | undefined;
} & import("react").RefAttributes<HTMLCanvasElement>>;
//# sourceMappingURL=NetworkCanvas.d.ts.map