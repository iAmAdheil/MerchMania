export const blobUrlToFile = async (blobUrl: string, filename: string) => {
	console.log('blobUrl', blobUrl);
	console.log('filename', filename);
	const response = await fetch(blobUrl);
	const blob = await response.blob();

	return new File([blob], filename, { type: blob.type });
};
