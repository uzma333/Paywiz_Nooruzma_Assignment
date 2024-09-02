import { Type } from 'lucide-react';
import { TEXT, useToolbar } from '../store/ToolbarProvider';
import ToolbarButton from './ToolbarButton';

const TextTool = () => {
	const { tool, setFontSize, fontSize } = useToolbar();
	return (
		<>
			<ToolbarButton mode={TEXT}>
				<Type />
			</ToolbarButton>
			{tool === TEXT && (
				<input
					value={fontSize}
					onChange={(event) => {
						setFontSize(event.target.value);
					}}
					min={10}
					max={100}
					type='number'
					title='font size'
					className='rounded-md border w-10 md:w-20'
				/>
			)}
		</>
	);
};

export default TextTool;
