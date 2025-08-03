import cuid from 'cuid';

function generateUniqueId() {
	return cuid(); // e.g., 'ck2g67d1e000001laeyxfbq5a'
}

export default generateUniqueId;
