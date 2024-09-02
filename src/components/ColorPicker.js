import { useRef } from 'react';
import { useToolbar } from '../store/ToolbarProvider';

const ColorPicker = () => {
	const colorRef = useRef(null);
	const { color, setColor } = useToolbar();
	return (
		<>
			<div
				role='button'
				tabIndex={0}
				className='rounded-full p-3 border-2 border-gray-500 cursor-pointer'
				title='color'
				onClick={() => colorRef.current.click()}
				style={{ backgroundColor: color }}></div>
			<input
				type='color'
				title='color'
				ref={colorRef}
				onChange={(event) => setColor(event.target.value)}
				className='sr-only'
			/>
		</>
	);
};

export default ColorPicker;
