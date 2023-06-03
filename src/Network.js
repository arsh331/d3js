import React, {useState} from 'react';
import { ResponsiveNetwork } from '@nivo/network';
import data from './data.json';
import data2 from './data2.json';
import data3 from './data3.json';
import data4 from './data4.json';
import data5 from './data5.json';
import data6 from './data6.json';
const NetworkChart = () => {
  
  const [chartData, setData] = useState(data);

  const handleNodeClick = (node) => {
    console.log(node.id);
    const updatedData = node.id === 'NF' ? data2 : node.id === 'Logic' ? data3 : 
    node.id === 'Dr. Dre' ? data4 : node.id === 'Snoop Dogg' ? data5 : node.id === 'J Cole' ? data6 : data;
    setData(updatedData);
  };
  return (
    <div style={{ height: '500px' }}>
      <ResponsiveNetwork
        data={chartData}
        width={1000}
        height={1000}
        repulsivity={30}
        iterations={10}
        centeringStrength={0.1}
        nodeBorderWidth={2}
        linkThickness={2}
        motionStiffness={160}
        motionDamping={12}
        nodeSize={20}
        activeNodeSize={40}
        inactiveNodeSize={10}
        isInteractive={true}
        onClick={(node) => handleNodeClick(node)}
        onMouseEnter={(node) => console.log(node)}
        colors={'red'}
      />
    </div>
  );
};


export default NetworkChart;
