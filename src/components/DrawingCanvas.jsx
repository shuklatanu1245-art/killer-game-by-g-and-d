import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Pencil, Trash2 } from 'lucide-react';

export default function DrawingCanvas({ onSave }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#FFFFFF'); // Default white
  const [lineWidth, setLineWidth] = useState(3);
  
  // Set up canvas context and sizing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Make canvas responsive
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Fill background with transparent color so base64 isn't just black on black
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    e.preventDefault(); // Prevent scrolling on touch
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing) return;
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    
    // Add glow effect if not erasing
    if (color !== 'rgba(255, 255, 255, 0.05)') {
      ctx.shadowBlur = 10;
      ctx.shadowColor = color;
    } else {
      ctx.shadowBlur = 0;
    }
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleSave = () => {
    const dataUrl = canvasRef.current.toDataURL('image/png');
    onSave(dataUrl);
  };

  const selectEraser = () => {
    setColor('rgba(255, 255, 255, 0.05)'); // Acts as an eraser on this background
    setLineWidth(20);
  };

  const selectPen = (newColor) => {
    setColor(newColor);
    setLineWidth(3);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 w-full bg-black/40 rounded-2xl border border-white/10 overflow-hidden relative shadow-inner touch-none">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-full cursor-crosshair"
        />
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-2">
          <button 
            onClick={() => selectPen('#FFFFFF')} 
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${color === '#FFFFFF' ? 'border-primary bg-white/20' : 'border-white/20 bg-transparent'}`}
          >
            <div className="w-5 h-5 bg-white rounded-full shadow-[0_0_10px_white]"></div>
          </button>
          <button 
            onClick={() => selectPen('#FF5A4A')} 
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${color === '#FF5A4A' ? 'border-primary bg-primary/20' : 'border-white/20 bg-transparent'}`}
          >
            <div className="w-5 h-5 bg-primary rounded-full shadow-[0_0_10px_#FF5A4A]"></div>
          </button>
          
          <button 
            onClick={selectEraser} 
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${color === 'rgba(255, 255, 255, 0.05)' ? 'border-primary bg-white/10' : 'border-white/20 bg-transparent'}`}
          >
            <Eraser size={18} className="text-gray-300" />
          </button>
          
          <button 
            onClick={clearCanvas} 
            className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center bg-transparent hover:bg-white/5"
          >
            <Trash2 size={18} className="text-gray-400" />
          </button>
        </div>
        
        <button 
          onClick={handleSave}
          className="glass-btn glass-btn-red px-6 py-2 rounded-xl font-bold tracking-widest text-sm"
        >
          DONE
        </button>
      </div>
    </div>
  );
}
