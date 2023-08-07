/// <reference types="react" />
import { ComputedNode, InputLink, InputNode, NetworkSvgProps } from './types';
interface NetworkNodeAnnotationsProps<Node extends InputNode, Link extends InputLink> {
    nodes: ComputedNode<Node>[];
    annotations: NonNullable<NetworkSvgProps<Node, Link>['annotations']>;
}
export declare const NetworkNodeAnnotations: <Node_1 extends InputNode, Link extends InputLink>({ nodes, annotations, }: NetworkNodeAnnotationsProps<Node_1, Link>) => JSX.Element;
export {};
//# sourceMappingURL=NetworkNodeAnnotations.d.ts.map