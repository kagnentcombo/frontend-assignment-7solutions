'use client'
import React, { useState, useEffect } from 'react';

function App() {
  interface Item {
    type: string;
    name: string;
  }

  const items: Item[] = [
    {
      type: 'Fruit',
      name: 'Apple',
    },
    {
      type: 'Vegetable',
      name: 'Broccoli',
    },
    {
      type: 'Vegetable',
      name: 'Mushroom',
    },
    {
      type: 'Fruit',
      name: 'Banana',
    },
    {
      type: 'Vegetable',
      name: 'Tomato',
    },
    {
      type: 'Fruit',
      name: 'Orange',
    },
    {
      type: 'Fruit',
      name: 'Mango',
    },
    {
      type: 'Fruit',
      name: 'Pineapple',
    },
    {
      type: 'Vegetable',
      name: 'Cucumber',
    },
    {
      type: 'Fruit',
      name: 'Watermelon',
    },
    {
      type: 'Vegetable',
      name: 'Carrot',
    },
  ];
  const [all, setAll] = useState<Item[]>(items);
  const [fruits, setFruits] = useState<Item[]>([]);
  const [vegetables, setVegetables] = useState<Item[]>([]);
  const [timeoutIds, setTimeoutIds] = useState<Map<string, NodeJS.Timeout>>(new Map()); // Map to store timeoutIds

  const moveButton = (item: Item) => {
    if (item.type === 'Fruit') {
      //set Timeout 5s
      const newTimeoutId = setTimeout(() => {
        setAll((prevAll) => [...prevAll, item]);
        setFruits((prevFruits) => prevFruits.filter(prev => prev.name !== item.name));
        clearTimeout(timeoutIds.get(item.name)); // Clear timeout when it completes
      }, 5000);

      setTimeoutIds((prevTimeoutIds) => new Map(prevTimeoutIds).set(item.name, newTimeoutId)); // Store timeoutId in the map
      setFruits((prevFruits) => [...prevFruits, item]);
      setAll((prevAll) => prevAll.filter(prev => prev.name !== item.name));
    } else if (item.type === 'Vegetable') {
      //set Timeout 5s
      const newTimeoutId = setTimeout(() => {
        setAll((prevAll) => [...prevAll, item]);
        setVegetables((prevVegetables) => prevVegetables.filter(prev => prev.name !== item.name));
        clearTimeout(timeoutIds.get(item.name)); // Clear timeout when it completes
      }, 5000);
      setTimeoutIds((prevTimeoutIds) => new Map(prevTimeoutIds).set(item.name, newTimeoutId)); // Store timeoutId in the map
      setVegetables((prevVegetables) => [...prevVegetables, item]);
      setAll((prevAll) => prevAll.filter(prev => prev.name !== item.name));
    }
  };
  const moveBack = (item: Item) => {
    const timeoutId = timeoutIds.get(item.name); // Get timeoutId associated with the item
    if (timeoutId) {
      clearTimeout(timeoutId); // Clear timeout if it exists
      setTimeoutIds((prevTimeoutIds) => {
        const newTimeoutIds = new Map(prevTimeoutIds);
        newTimeoutIds.delete(item.name); // Remove timeoutId associated with the item
        return newTimeoutIds;
      });
    }
    if (item.type === 'Fruit') {
      setAll((prevAll) => [...prevAll, item]);
      setFruits((prevFruits) => prevFruits.filter(prev => prev.name !== item.name));

    } else if (item.type === 'Vegetable') {
      setAll((prevAll) => [...prevAll, item]);
      setVegetables((prevVegetables) => prevVegetables.filter(prev => prev.name !== item.name));

    }
  }
  return (
    <>
      <div>
        <div style={{padding:"20px"}}><a href="/solution2">solution2</a></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
          <div style={{ display: "flex", flexDirection: "column", margin: "20px", gap: "10px" }}>
            {all.map((item) => <button key={item.name} onClick={() => moveButton(item)} style={{ padding: "15px", backgroundColor: "#fff", border: "solid 1px #C7C8CC", cursor: "pointer", whiteSpace: "nowrap" }}>
              <p style={{ fontWeight: "700", fontSize: "14px" }}>{item.name}</p>
            </button>
            )}
          </div>
          <div

            style={{
              display: "flex",
              flexDirection: "column",
              margin: "20px",
              border: "solid 1px #C7C8CC",
              gap: "10px"
            }}><div style={{ backgroundColor: "#C7C8CC", padding: "15px", display: "flex", justifyContent: "center" }}>
              <p style={{ fontWeight: "700", fontSize: "18px" }}>Fruit</p>
            </div>
            {fruits.map((fruit, index) => (
              <div key={fruit.name} style={{ display: "flex", justifyContent: "center" }}><button onClick={() => moveBack(fruit)} style={{ padding: "15px", backgroundColor: "#fff", border: "solid 1px #C7C8CC", width: "80%", cursor: "pointer", whiteSpace: "nowrap" }}>
                {fruit.name}
              </button></div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "20px",
              border: "solid 1px #C7C8CC",
              gap: "10px"
            }}><div style={{ backgroundColor: "#C7C8CC", padding: "15px", display: "flex", justifyContent: "center" }}>
              <p style={{ fontWeight: "700", fontSize: "18px" }}>Vegetable</p>
            </div>
            {vegetables.map((vegetables, index) => (
              <div key={vegetables.name} style={{ display: "flex", justifyContent: "center" }}><button onClick={() => moveBack(vegetables)} style={{ padding: "15px", backgroundColor: "#fff", border: "solid 1px #C7C8CC", width: "80%", cursor: "pointer", whiteSpace: "nowrap" }}>
                {vegetables.name}
              </button></div>
            ))}
          </div>
        </div>
      </div>
    </>

  );
}

export default App;
