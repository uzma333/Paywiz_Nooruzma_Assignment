import { useEffect, useRef, useState } from 'react';
import {
	ERASER,
	useToolbar,
	LINE,
	RECTANGLE,
	CIRCLE,
	TEXT,
} from '../store/ToolbarProvider';

const Drawable = () => {
	const canvasRef = useRef(null);
	const ctxRef = useRef(null);
	const [isDrawing, setIsDrawing] = useState(false);
	const { color, brushSize, tool, fontSize } = useToolbar();
	const [startPos, setStartPos] = useState({ x: 0, y: 0 });
	const [canvasImage, setCanvasImage] = useState(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		const ctx = canvas.getContext('2d', { willReadFrequently: true });
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
		ctxRef.current = ctx;
	}, []);

	useEffect(() => {
		const resizeCanvas = () => {
			const canvas = canvasRef.current;
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		window.addEventListener('resize', resizeCanvas);
		return () => window.removeEventListener('resize', resizeCanvas);
	}, []);

	const getEventPosition = (e) => {
		const { clientX, clientY } = e.touches ? e.touches[0] : e;
		const { left, top } = canvasRef.current.getBoundingClientRect();
		return { x: clientX - left, y: clientY - top };
	};

	const startDrawing = (e) => {
		const pos = getEventPosition(e);
		setStartPos(pos);
		setIsDrawing(true);

		if ([LINE, RECTANGLE, CIRCLE].includes(tool)) {
			setCanvasImage(
				ctxRef.current.getImageData(
					0,
					0,
					canvasRef.current.width,
					canvasRef.current.height
				)
			);
		}
		if (tool === TEXT) {
			const inputText = prompt('Enter text:');
			if (inputText) {
				drawText(inputText, pos);
				setIsDrawing(false);
			}
		} else {
			ctxRef.current.beginPath();
			ctxRef.current.moveTo(pos.x, pos.y);
		}
		setIsDrawing(true);
	};

	const drawText = (text, pos) => {
		const ctx = ctxRef.current;
		ctx.font = `${fontSize}px sans-serif`;
		ctx.fillStyle = color;
		ctx.textAlign = 'left';
		ctx.textBaseline = 'top';
		ctx.fillText(text, pos.x, pos.y);
	};

	const draw = (e) => {
		if (!isDrawing || tool === TEXT) return;

		const pos = getEventPosition(e);

		const ctx = ctxRef.current;

		ctx.strokeStyle = tool === ERASER ? '#fff' : color;
		ctx.lineWidth = brushSize;

		if ([LINE, RECTANGLE, CIRCLE].includes(tool)) {
			ctx.putImageData(canvasImage, 0, 0);

			if (tool === LINE) {
				ctx.beginPath();
				ctx.moveTo(startPos.x, startPos.y);
				ctx.lineTo(pos.x, pos.y);
			} else if (tool === RECTANGLE) {
				const width = pos.x - startPos.x;
				const height = pos.y - startPos.y;
				ctx.strokeRect(startPos.x, startPos.y, width, height);
			} else if (tool === CIRCLE) {
				const radius = Math.sqrt(
					Math.pow(pos.x - startPos.x, 2) +
						Math.pow(pos.y - startPos.y, 2)
				);
				ctx.beginPath();
				ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
			}
			ctx.stroke();
		} else {
			ctx.lineTo(pos.x, pos.y);
			ctx.stroke();
		}
	};

	const stopDrawing = (e) => {
		if (isDrawing && ![LINE, RECTANGLE, CIRCLE, TEXT].includes(tool)) {
			ctxRef.current.closePath();
		}
		setIsDrawing(false);
		ctxRef.current.beginPath();
	};

	return (
		<section className='fixed w-screen h-screen overflow-hidden'>
			<canvas
				ref={canvasRef}
				onMouseDown={startDrawing}
				onMouseMove={draw}
				onMouseUp={stopDrawing}
				onMouseLeave={stopDrawing}
				onTouchStart={startDrawing}
				onTouchMove={draw}
				onTouchEnd={stopDrawing}
			/>
		</section>
	);
};

export default Drawable;
