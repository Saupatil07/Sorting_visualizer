import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const BubbleSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    const newArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    setCompleted(false);
  };

  const bubbleSort = async () => {
    setSorting(true);
    setCompleted(false);
    let arr = [...array];
    let n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          // Swap elements
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          
          // Update state and pause to visualize
          setArray([...arr]);
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }
    }
    
    setSorting(false);
    setCompleted(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bubble Sort Visualizer</h1>
      <div className="flex mb-4">
        <Button onClick={generateArray} disabled={sorting} className="mr-2">
          Generate New Array
        </Button>
        <Button onClick={bubbleSort} disabled={sorting || completed}>
          {sorting ? 'Sorting...' : 'Start Bubble Sort'}
        </Button>
      </div>
      <div className="flex items-end h-64 border-b border-gray-300">
        {array.map((value, index) => (
          <div
            key={index}
            style={{
              height: `${value}%`,
              width: '20px',
              backgroundColor: completed ? 'green' : 'blue',
              margin: '0 1px',
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BubbleSortVisualizer;