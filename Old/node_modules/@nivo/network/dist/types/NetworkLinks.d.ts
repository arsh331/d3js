/// <reference types="react" />
import { ComputedLink, InputLink, InputNode, LinkComponent, NetworkSvgProps } from './types';
interface NetworkLinksProps<Node extends InputNode, Link extends InputLink> {
    links: ComputedLink<Node, Link>[];
    linkComponent: LinkComponent<Node, Link>;
    blendMode: NonNullable<NetworkSvgProps<Node, Link>['linkBlendMode']>;
}
export declare const NetworkLinks: <Node_1 extends InputNode, Link extends InputLink>({ links, linkComponent, blendMode, }: NetworkLinksProps<Node_1, Link>) => JSX.Element;
export {};
//# sourceMappingURL=NetworkLinks.d.ts.map