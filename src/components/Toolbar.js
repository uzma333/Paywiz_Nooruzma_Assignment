import {
	ChevronDown,
	Circle,
	Eraser,
	Minus,
	Pencil,
	RectangleHorizontal,
} from 'lucide-react';
import {
	CIRCLE,
	ERASER,
	LINE,
	PENCIL,
	RECTANGLE,
} from '../store/ToolbarProvider';
import ColorPicker from './ColorPicker';
import BrushSize from './BrushSize';
import ToolbarButton from './ToolbarButton';
import TextTool from './TextTool';
import { useState } from 'react';

const Toolbar = () => {
	const [toggleToolbar, setToggleToolbar] = useState(true);
	return (
		<section className='fixed top-2 left-2 md:-translate-x-1/2 md:left-1/2 shadow-xl p-3 rounded-xl flex flex-col md:flex-row items-center justify-center gap-4 bg-white bg-opacity-10 backdrop-blur-sm z-10'>
			<button
				type='button'
				title='toggle toolbar'
				className='p-2'
				onClick={() => setToggleToolbar((prev) => !prev)}>
				<ChevronDown
					className={`${
						toggleToolbar
							? 'rotate-180 md:rotate-90'
							: 'md:-rotate-90'
					}`}
				/>
			</button>
			{toggleToolbar && (
				<>
					<ToolbarButton mode={PENCIL}>
						<Pencil />
					</ToolbarButton>
					<ToolbarButton mode={ERASER}>
						<Eraser />
					</ToolbarButton>
					<ToolbarButton mode={LINE}>
						<Minus />
					</ToolbarButton>
					<ToolbarButton mode={RECTANGLE}>
						<RectangleHorizontal />
					</ToolbarButton>
					<ToolbarButton mode={CIRCLE}>
						<Circle />
					</ToolbarButton>
					<TextTool />
					<ColorPicker />
					<BrushSize />
				</>
			)}
		</section>
	);
};

export default Toolbar;
