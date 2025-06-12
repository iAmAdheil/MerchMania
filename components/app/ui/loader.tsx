import { CircularProgress } from '@mui/material';

export default function Loader({
	size,
	classname,
}: {
	size: number
	classname?: string;
}) {
	return (
		<div>
			<CircularProgress size={size} sx={{ color: 'purple' }} className={`z-10 ${classname}`} />
		</div>
	);
}
