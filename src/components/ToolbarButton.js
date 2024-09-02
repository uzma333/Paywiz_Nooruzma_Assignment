import { useToolbar } from '../store/ToolbarProvider';

const ToolbarButton = ({ mode, children }) => {
	const { tool, setTool } = useToolbar();
	return (
		<button
			type='button'
			title={mode}
			className={`btn ${tool === mode ? 'highlight' : ''}`}
			onClick={() => setTool(mode)}>
			{children}
		</button>
	);
};

export default ToolbarButton;
