import React, { useRef, useEffect, useState } from "react";


function Canvas({ tool, color, brushSize, fontSize }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(0);


  
  useEffect(() => {
    const canvas = canvasRef.current;
    resizeCanvas();
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctxRef.current = ctx;
     saveState();
     window.addEventListener("resize", resizeCanvas);
     return () => window.removeEventListener("resize", resizeCanvas);
  }, [brushSize,color]);


  

const resizeCanvas = () => {
  const canvas = canvasRef.current;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctxRef.current = canvas.getContext("2d");
};



  const saveState = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(dataUrl);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  
  
  const startDrawing = (e) => {
    
    if (tool === "pencil" || tool === "eraser") {
      ctxRef.current.beginPath();
     
      ctxRef.current.moveTo(e.clientX, e.clientY);
    }
    setStartPos({ x: e.clientX, y: e.clientY })
     getPointerPosition(e)
    setDrawing(true);
  };

  const finishDrawing = () => {
    if (tool !== "text") {
      ctxRef.current.closePath();
    }
    setDrawing(false);
    saveState();
    
  };

  const draw = (e) => {

    if (!drawing) return;

    const x = e.clientX;
    const y = e.clientY;
    getPointerPosition(e)
    ctxRef.current.strokeStyle = color;
   


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
        saveState();
         
      }
    }
  }
  const getPointerPosition = (e) => {
    if (e.touches && e.touches[0]) {
      return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
    }
    return { clientX: e.clientX, clientY: e.clientY };
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onTouchStart={startDrawing}
        onTouchEnd={finishDrawing}
        onTouchMove={draw}
        onClick={handleCanvasClick}
        className="border flex-1"
        style={{ touchAction: "none" }} 
      />
     
    </>
  );
}

export default Canvas;


// import React, { useRef, useEffect, useState } from "react";

// function Canvas({ tool, color, brushSize, fontSize }) {
//   const canvasRef = useRef(null);
//   const ctxRef = useRef(null);
//   const [drawing, setDrawing] = useState(false);
//   const [startPos, setStartPos] = useState({ x: 0, y: 0 });

//   // History states
//   const [history, setHistory] = useState([]);
//   const [historyIndex, setHistoryIndex] = useState(0);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     resizeCanvas(); // Ensure canvas is resized initially
//     const ctx = canvas.getContext("2d");
//     ctx.lineCap = "round";
//     ctx.strokeStyle = color;
//     ctx.lineWidth = brushSize;
//     ctxRef.current = ctx;

//     // Save the initial empty canvas state
//     saveState();

//     // Resize the canvas when the window is resized
//     window.addEventListener("resize", resizeCanvas);
//     return () => window.removeEventListener("resize", resizeCanvas);
//   }, [brushSize,color]);

//   const resizeCanvas = () => {
//     const canvas = canvasRef.current;
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//   };

//   const saveState = () => {
//     const canvas = canvasRef.current;
//     const dataUrl = canvas.toDataURL();
//     const newHistory = history.slice(0, historyIndex + 1);
//     newHistory.push(dataUrl);
//     setHistory(newHistory);
//     setHistoryIndex(newHistory.length - 1);
//   };

 

  

//   const startDrawing = (e) => {
//     setDrawing(true);
//     const { clientX, clientY } = getPointerPosition(e);
//     setStartPos({ x: clientX, y: clientY });
//   };

//   const finishDrawing = () => {
//     setDrawing(false);
//     saveState();
//   };

//   const draw = (e) => {
//     if (!drawing) return;

//     const { clientX, clientY } = getPointerPosition(e);
//     ctxRef.current.strokeStyle = color;

//     if (tool === "pencil") {
//       ctxRef.current.lineTo(clientX, clientY);
//       ctxRef.current.stroke();
//     } else if (tool === "eraser") {
//       ctxRef.current.globalCompositeOperation = "destination-out";
//       ctxRef.current.lineTo(clientX, clientY);
//       ctxRef.current.stroke();
//       ctxRef.current.globalCompositeOperation = "source-over";
//     } else if (tool === "line") {
//       ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//       ctxRef.current.beginPath();
//       ctxRef.current.moveTo(startPos.x, startPos.y);
//       ctxRef.current.lineTo(clientX, clientY);
//       ctxRef.current.stroke();
//     } else if (tool === "rectangle") {
//       ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//       ctxRef.current.strokeRect(startPos.x, startPos.y, clientX - startPos.x, clientY - startPos.y);
//     } else if (tool === "circle") {
//       ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//       const radius = Math.sqrt(Math.pow(clientX - startPos.x, 2) + Math.pow(clientY - startPos.y, 2));
//       ctxRef.current.beginPath();
//       ctxRef.current.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
//       ctxRef.current.stroke();
//     }
//   };

//   const getPointerPosition = (e) => {
//     if (e.touches && e.touches[0]) {
//       return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
//     }
//     return { clientX: e.clientX, clientY: e.clientY };
//   };

//   return (
//     <div>
//       <canvas
//         ref={canvasRef}
//         onMouseDown={startDrawing}
//         onMouseUp={finishDrawing}
//         onMouseMove={draw}
//         onTouchStart={startDrawing}
//         onTouchEnd={finishDrawing}
//         onTouchMove={draw}
//         className="border flex-1"
//       />
//     </div>
//   );
// }

// export default Canvas;