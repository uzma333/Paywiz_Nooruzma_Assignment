import { useState } from "react";
import Canvas from "./components/Canvas.js";
import Toolbar from "./components/Toolbar";



function App() {
  const [tool,setTool]=useState("pencil");
  const[color,setColor]=useState("#000000")
  const [brushSize, setBrushSize] = useState(5);
  const [fontSize, setFontSize] = useState(20);

  return (
    <div className="flex flex-col h-screen">
      <Toolbar
        tool={tool}
        setTool={setTool}
        color={color}
        setColor={setColor}
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />
      <Canvas
        tool={tool}
        color={color}
        brushSize={brushSize}
        fontSize={fontSize}
      />
    </div>
  );
}

export default App;
