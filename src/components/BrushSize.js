import { useEffect, useRef, useState } from 'react';
import { useToolbar } from '../store/ToolbarProvider';
import { Tally4 } from 'lucide-react';

const BrushSize = () => {
	const [showSize, setShowSize] = useState(false);
	const { brushSize, setBrushSize } = useToolbar();
	const wrapperRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target)
			) {
				setShowSize(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);
	return (
		<div className='relative'>
			<button
				type='button'
				title='brush size'
				className={`btn ${showSize ? 'highlight' : ''}`}
				onClick={() => setShowSize((prev) => !prev)}>
				<Tally4 />
			</button>
			{showSize && (
				<div
					ref={wrapperRef}
					className='absolute left-16 top-2 md:-left-12 md:-bottom-12	md:top-16 bg-white shadow-lg rounded-lg z-20'>
					<input
						type='range'
						value={brushSize}
						min={1}
						max={50}
						className='accent-blue-500 p-1'
						onChange={(event) => {
							setBrushSize(event.target.value);
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default BrushSize;
