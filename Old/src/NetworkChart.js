import React, {useState} from 'react';
import { ResponsiveNetwork, NodeProps, LinkProps, NodeTooltipProps, NetworkSvgProps } from '@nivo/network'
const NetworkChart = (props) => {
  
  const chartData = props.data;
  chartData ? console.log(chartData) : console.log("No data yet");
  
  return (
    chartData ?
    <div style={{ height: '1000px' }}>
      <ResponsiveNetwork
        data={chartData}
        width={1000}
        height={1000}
        repulsivity={200}
        iterations={120}
        centeringStrength={0.1}
        nodeBorderWidth={5}
        nodeColor={n => n.color}
        linkThickness={2}
        linkColor={{ from: 'source.color', modifiers: [] }}
        linkDistance={n => n.distance}
        motionStiffness={160}
        motionDamping={12}
        nodeSize={n => n.size}
        activeNodeSize={n => n.size * 1.5}
        inactiveNodeSize={n => n.size / 1.5} 
        isInteractive={true}
        onClick={(node) => props.fetchData(node.data.artist_mbid)}
      />
    </div>
    :
    <p>
      Please wait...
    </p>
  
  );
};


export default NetworkChart;
