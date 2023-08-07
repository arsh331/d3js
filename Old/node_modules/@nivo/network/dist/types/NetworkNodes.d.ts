/// <reference types="react" />
import { InputNode, ComputedNode, NetworkSvgProps, InputLink } from './types';
interface NetworkNodesProps<Node extends InputNode, Link extends InputLink> {
    nodes: ComputedNode<Node>[];
    nodeComponent: NonNullable<NetworkSvgProps<Node, Link>['nodeComponent']>;
    onMouseEnter: NetworkSvgProps<Node, Link>['onMouseEnter'];
    onMouseMove: NetworkSvgProps<Node, Link>['onMouseMove'];
    onMouseLeave: NetworkSvgProps<Node, Link>['onMouseLeave'];
    onClick: NetworkSvgProps<Node, Link>['onClick'];
    tooltip: NonNullable<NetworkSvgProps<Node, Link>['nodeTooltip']>;
    setActiveNodeIds: (nodeIds: string[]) => void;
    isInteractive: NonNullable<NetworkSvgProps<Node, Link>['isInteractive']>;
}
export declare const NetworkNodes: <Node_1 extends InputNode, Link extends InputLink>({ nodes, nodeComponent, onMouseEnter, onMouseMove, onMouseLeave, onClick, tooltip, setActiveNodeIds, isInteractive, }: NetworkNodesProps<Node_1, Link>) => JSX.Element;
export {};
//# sourceMappingURL=NetworkNodes.d.ts.map