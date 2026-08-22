import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Trash2, Circle } from 'lucide-react';

const COLORS = [
  { hex: '#FFFFFF', name: 'White' },
  { hex: '#FF5A4A', name: 'Coral' },
  { hex: '#3B82F6', name: 'Blue' },
  { hex: '#10B981', name: 'Green' },
  { hex: '#F59E0B', name: 'Yellow' }
];

const THICKNESS_OPTIONS = [
  { value: 3, label: 'Thin' },
  { value: 8, label: 'Medium' },
  { value: 15, label: 'Thick' }
];

export default function DrawingCanvas({ onSave }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#FFFFFF'); 
  const [lineWidth, setLineWidth] = useState(3);
  const [isErasing, setIsErasing] = useState(false);
  
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
    e.preventDefault(); 
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    
    ctx.globalCompositeOperation = isErasing ? 'destination-out' : 'source-over';
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing) return;
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    
    ctx.strokeStyle = isErasing ? 'rgba(0,0,0,1)' : color;
    ctx.lineWidth = isErasing ? 30 : lineWidth; // Eraser is always thick
    
    // Removed shadowBlur to prevent spreading/bleeding effect
    ctx.shadowBlur = 0;
    
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
  };

  const handleSave = () => {
    // Before saving, we want to make sure it's not totally transparent 
    // by filling a black background behind the drawing so results screen looks good.
    const canvas = canvasRef.current;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    
    tempCtx.fillStyle = '#1A1C23'; // Dark background
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(canvas, 0, 0);
    
    const dataUrl = tempCanvas.toDataURL('image/png');
    onSave(dataUrl);
  };

  const selectEraser = () => {
    setIsErasing(true);
  };

  const selectPen = (newColor) => {
    setColor(newColor);
    setIsErasing(false);
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Controls Bar: Thickness */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex gap-4 items-center">
          {THICKNESS_OPTIONS.map(opt => (
             <button
                key={opt.value}
                onClick={() => setLineWidth(opt.value)}
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${lineWidth === opt.value && !isErasing ? 'bg-white/20' : 'opacity-50 hover:opacity-100'}`}
             >
                <Circle size={opt.value + 6} className="fill-current text-white" />
             </button>
          ))}
        </div>
      </div>

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
        <div className="flex gap-2 flex-wrap max-w-[70%]">
          {COLORS.map(c => (
            <button 
              key={c.hex}
              onClick={() => selectPen(c.hex)} 
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${color === c.hex && !isErasing ? 'border-primary scale-110' : 'border-white/20'}`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
          
          <button 
            onClick={selectEraser} 
            className={`w-10 h-10 ml-2 rounded-full border-2 flex items-center justify-center transition-all ${isErasing ? 'border-primary bg-white/10 scale-110' : 'border-white/20 bg-transparent'}`}
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
          className="glass-btn glass-btn-primary px-6 py-2 rounded-xl font-bold tracking-widest text-sm"
        >
          DONE
        </button>
      </div>
    </div>
  );
}
