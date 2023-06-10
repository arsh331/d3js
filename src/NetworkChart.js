import React, {useState} from 'react';
import { ResponsiveNetwork } from '@nivo/network';
import Data from './Data';
const NetworkChart = (props) => {
  
  const chartData = props.data;
  console.log(chartData);
  
  return (
    chartData ?
    <div style={{ height: '1000px' }}>
      <ResponsiveNetwork
        data={chartData}
        width={1000}
        height={1000}
        repulsivity={50}
        iterations={120}
        centeringStrength={0.075}
        nodeBorderWidth={2}
        nodeColor={"#2284c9"}
        linkThickness={2}
        linkColor={{ from: 'source.color', modifiers: [] }}
        motionStiffness={160}
        motionDamping={12}
        nodeSize={20}
        activeNodeSize={40}
        inactiveNodeSize={10}
        isInteractive={true}
        colors={'red'}
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
