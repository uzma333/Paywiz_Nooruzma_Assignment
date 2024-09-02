import React from 'react'
import pencil from "../Assests/pencil.png";
import eraser from "../Assests/eraser.png";
import line from "../Assests/line.png";
import rectangle from "../Assests/rectangle.png";
import circle from "../Assests/circle.png";
import text from "../Assests/text.png";


function Toolbar({
    tool,
    setTool,
    color,
    setColor,
    brushSize,
    setBrushSize,
    fontSize,
    setFontSize,
   

 }){
        


    

   
    
    return (
      <div className="p-2 bg-gray-200 flex space-x-3">
        <button className='btn' onClick={() => setTool("pencil")}><img className='h-8 w-8, md:h-10 w-10' src={pencil} alt='pencil'/></button>
        <button className='btn' onClick={() => setTool("eraser")}><img className='h-8 w-8,md:h-10 w-10' src={eraser} alt='eraser'/></button>
        <button className='btn' onClick={() => setTool("line")}><img className='h-8 w-8,md:h-10 w-10' src={line} alt='line'/></button>
        <button className='btn' onClick={() => setTool("rectangle")}><img className='h-8 w-8,md:h-10 w-10' src={rectangle} alt='rectangle'/></button>
        <button className='btn' onClick={() => setTool("circle")}><img className='h-8 w-8,md:h-10 w-10' src={circle} alt='circle'/></button>
        <button className='btn' onClick={() => setTool("text")}><img className='h-8 w-8,md:h-10 w-10' src={text} alt='text'/></button>
       
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className='h-10'
        />
        <input
          type="range"
          min="1"
          max="50"
          value={brushSize}
          onChange={(e) => setBrushSize(e.target.value)}
          className='slider'
        />
        {tool === "text" && (
          <input
            type="number"
            min="10"
            max="100"
            name='number'
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
          />
        )} 
    
      </div>
    );
  }
  
  export default Toolbar;