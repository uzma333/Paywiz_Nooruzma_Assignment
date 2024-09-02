import { createContext, useContext, useState } from 'react';

export const PENCIL = 'pencil';
export const ERASER = 'eraser';
export const LINE = 'line';
export const RECTANGLE = 'rectangle';
export const CIRCLE = 'circle';
export const TEXT = 'text';

const ToolbarContext = createContext({
	tool: PENCIL,
	color: '#000',
	brushSize: 5,
	fontSize: 20,
	setTool: (tool) => {},
	setColor: (color) => {},
	setBrushSize: (size) => {},
	setFontSize: (size) => {},
});

export const ToolbarProvider = ({ children }) => {
	const [{ tool, color, brushSize, fontSize }, setToolbar] = useState({
		tool: PENCIL,
		color: '#000',
		brushSize: 5,
		fontSize: 20,
	});

	const setTool = (tool) => setToolbar((prev) => ({ ...prev, tool: tool }));

	const setColor = (color) =>
		setToolbar((prev) => ({ ...prev, color: color }));

	const setBrushSize = (size) =>
		setToolbar((prev) => ({ ...prev, brushSize: size }));

	const setFontSize = (size) =>
		setToolbar((prev) => ({ ...prev, fontSize: size }));

	return (
		<ToolbarContext.Provider
			value={{
				tool,
				color,
				brushSize,
				fontSize,
				setTool,
				setColor,
				setBrushSize,
				setFontSize,
			}}>
			{children}
		</ToolbarContext.Provider>
	);
};

export const useToolbar = () => useContext(ToolbarContext);
