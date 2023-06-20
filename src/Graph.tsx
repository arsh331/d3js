import React, {useState} from 'react';
import { ResponsiveNetwork, NodeProps, LinkProps, NodeTooltipProps, NetworkSvgProps } from '@nivo/network';
import { animated, to } from '@react-spring/web';
import { InputNode } from '@nivo/network';
interface GraphProps {
    data: any;
    fetchData: Function;
}

const Graph = (props: GraphProps) => {
    type Node = (typeof props.data)['nodes'][number];
    type Link = (typeof props.data)['links'][number];
    
    const CustomNodeComponent = <Node extends InputNode>({
        node,
        animated: animatedProps,
        onClick,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
    }: NodeProps<Node>) => (
        <animated.g 
        transform={to([animatedProps.x, animatedProps.y, animatedProps.scale], (x, y, scale) => {
            return `translate(${x},${y}) scale(${scale})`
        })}
        onClick={onClick ? event => onClick(node, event) : undefined}
        onMouseEnter={onMouseEnter ? event => onMouseEnter(node, event) : undefined}
        onMouseMove={onMouseMove ? event => onMouseMove(node, event) : undefined}
        onMouseLeave={onMouseLeave ? event => onMouseLeave(node, event) : undefined}
        width={to([animatedProps.size], size => size / 2)}
        height={to([animatedProps.size], size => size / 2)}
        >
        <animated.circle
            data-testid={`node.${node.id}`}
            r={to([animatedProps.size], size => size / 2)}
            fill={animatedProps.color}
            strokeWidth={animatedProps.borderWidth}
            stroke={animatedProps.borderColor}
            opacity={animatedProps.opacity}
        />
        <animated.text 
        textAnchor='middle'
        alignmentBaseline='middle'
        >
            {node.id.length > 10 ? node.id.slice(0, 6) + '...' : node.id}
        </animated.text>
        </animated.g>
    )
    
    const CustomNodeTooltipComponent = ({ node }: NodeTooltipProps<Node>) => (
        <div
            style={{
                background: node.color,
                color: '#000000',
                padding: '9px 12px',
                borderRadius: 'px'
            }}
        >
            <strong>Name: {node.id}</strong>
            <br />
            MusicBrainz ID: {node.data.artist_mbid}
        </div>
    )

    const chartProperties: NetworkSvgProps<Node, Link> = {
        data: props.data,
        height: 1000,
        width: 1000,
        repulsivity: 200,
        iterations: 120,
        centeringStrength: 0.1,
        nodeBorderWidth: 5,
        nodeColor: node => node.color,
        linkThickness: 2,
        linkColor: { from: 'source.color', modifiers: [] },
        linkDistance: node => node.distance,
        nodeSize: node => node.size,
        activeNodeSize: node => node.size * 1.2,
        inactiveNodeSize: node => node.size / 1.2,
        isInteractive: true,
        onClick: node => props.fetchData(node.data.artist_mbid)
    }
    
    return (
        props.data ?
        <div style={{ height: '1000px' }}>
            <ResponsiveNetwork
                {...chartProperties}
                nodeComponent={CustomNodeComponent}
                nodeTooltip={CustomNodeTooltipComponent}
            />
        </div>
        :
        <p>
            Please wait...
        </p>
    );
}
export default Graph;
