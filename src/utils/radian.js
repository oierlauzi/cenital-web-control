const ratio = Math.PI / 180;

export function deg2rad(deg) {
	return deg*ratio;
}

export function rad2deg(rad) {
	return rad/ratio;
}