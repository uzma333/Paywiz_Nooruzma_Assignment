import React, { useRef, useEffect, useState } from "react";


function Canvas({ tool, color, brushSize, fontSize }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctxRef.current = ctx;

   
  }, [brushSize,color]);

  
  
  const startDrawing = (e) => {
    if (tool === "pencil" || tool === "eraser") {
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(e.clientX, e.clientY);
    }
    setStartPos({ x: e.clientX, y: e.clientY });
    setDrawing(true);
  };

  const finishDrawing = () => {
    if (tool !== "text") {
      ctxRef.current.closePath();
    }
    setDrawing(false);
    
  };

  const draw = (e) => {
    if (!drawing) return;

    const x = e.clientX;
    const y = e.clientY;
    ctxRef.current.strokeStyle = color;
    ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);


    if (tool === "pencil") {
      ctxRef.current.lineTo(x, y);
      ctxRef.current.stroke();
    } else if (tool === "eraser") {
      ctxRef.current.globalCompositeOperation = "destination-out";
      ctxRef.current.lineTo(x, y);
      ctxRef.current.stroke();
      ctxRef.current.globalCompositeOperation = "source-over";
    } else if (tool === "line") {
       ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(startPos.x, startPos.y);
      ctxRef.current.lineTo(x, y);
      ctxRef.current.stroke();
    } else if (tool === "rectangle") {
      ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      
      
      ctxRef.current.strokeRect(
        startPos.x,
        startPos.y,
        x - startPos.x,
        y - startPos.y
      );
    } else if (tool === "circle") {
      ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      const radius = Math.sqrt(
        Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2)
      );
      ctxRef.current.beginPath();
      ctxRef.current.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
      ctxRef.current.stroke();
    }
  };

  const handleCanvasClick = (e) => {
    if (tool === "text") {
      const text = prompt("Enter text:");
      if (text) {
        ctxRef.current.font = `${fontSize}px Arial`;
        ctxRef.current.fillStyle = color;
        ctxRef.current.fillText(text, e.clientX, e.clientY);
         
      }
    }
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onClick={handleCanvasClick}
        className="border flex-1"
      />
     
    </>
  );
}

export default Canvas;