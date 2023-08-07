/// <reference types="react" />
import { AnnotationMatcher } from '@nivo/annotations';
import { InputLink, InputNode, NetworkCommonProps, DerivedProp, ComputedNode, ComputedLink } from './types';
export declare const useNetwork: <Node_1 extends InputNode = InputNode, Link extends InputLink = InputLink>({ center, nodes, links, linkDistance, centeringStrength, repulsivity, distanceMin, distanceMax, iterations, nodeSize, activeNodeSize, inactiveNodeSize, nodeColor, nodeBorderWidth, nodeBorderColor, linkThickness, linkColor, isInteractive, defaultActiveNodeIds, }: {
    center: [number, number];
    nodes: Node_1[];
    links: Link[];
    linkDistance?: DerivedProp<Link, number> | undefined;
    centeringStrength?: number | undefined;
    repulsivity?: number | undefined;
    distanceMin?: number | undefined;
    distanceMax?: number | undefined;
    iterations?: number | undefined;
    nodeSize?: DerivedProp<Node_1, number> | undefined;
    activeNodeSize?: DerivedProp<Node_1, number> | undefined;
    inactiveNodeSize?: DerivedProp<Node_1, number> | undefined;
    nodeColor?: DerivedProp<Node_1, string> | undefined;
    nodeBorderWidth?: DerivedProp<Node_1, number> | undefined;
    nodeBorderColor?: import("@nivo/colors").InheritedColorConfig<Omit<ComputedNode<Node_1>, "size" | "borderWidth" | "borderColor">> | undefined;
    linkThickness?: DerivedProp<Omit<ComputedLink<Node_1, Link>, "color" | "thickness">, number> | undefined;
    linkColor?: import("@nivo/colors").InheritedColorConfig<Omit<ComputedLink<Node_1, Link>, "color" | "thickness">> | undefined;
    isInteractive?: boolean | undefined;
    defaultActiveNodeIds?: string[] | undefined;
}) => {
    nodes: ComputedNode<Node_1>[] | null;
    links: ComputedLink<Node_1, Link>[] | null;
    activeNodeIds: string[];
    setActiveNodeIds: import("react").Dispatch<import("react").SetStateAction<string[]>>;
};
export declare const useNodeAnnotations: <Node_1 extends InputNode>(nodes: ComputedNode<Node_1>[], annotations: AnnotationMatcher<ComputedNode<Node_1>>[]) => import("@nivo/annotations").BoundAnnotation<ComputedNode<Node_1>>[];
//# sourceMappingURL=hooks.d.ts.map