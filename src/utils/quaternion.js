const copySign = (x, y) => (Math.sign(x) === Math.sign(y)) ? x : -x;



export function quat2yaw(quat) {
	//Based on:
	//https://en.wikipedia.org/wiki/Conversion_between_quaternions_and_Euler_angles
  const w = quat[0];
  const x = quat[1];
  const y = quat[2];
  const z = quat[3];

	const siny_cosp =     2*(w*z + x*y);
	const cosy_cosp = 1 - 2*(y*y + z*z);
	return Math.atan2(siny_cosp, cosy_cosp);
}

export function quat2pitch(quat) {
  //Based on:
	//https://en.wikipedia.org/wiki/Conversion_between_quaternions_and_Euler_angles
  const w = quat[0];
  const x = quat[1];
  const y = quat[2];
  const z = quat[3];

	const sinp = 2*(w*y - z*x);

	//Ensure it is within the range before calling asin
  let result;
  if(Math.abs(sinp) >= 1) {
    result = copySign(Math.PI / 2, sinp);
	} else {
    result = Math.asin(sinp);
	}
	return result;
}

export function quat2roll(quat) {
  //Based on:
	//https://en.wikipedia.org/wiki/Conversion_between_quaternions_and_Euler_angles
  const w = quat[0];
  const x = quat[1];
  const y = quat[2];
  const z = quat[3];

  const sinr_cosp = 	  2*(w*x + y*z);
	const cosr_cosp = 1 - 2*(x*x + y*y);
	return Math.atan2(sinr_cosp, cosr_cosp);
}

export function quat2euler(quat) {
  return [
    quat2yaw(quat),
    quat2pitch(quat),
    quat2roll(quat)
  ];
}

export function euler2quat(euler) {
  //Based on:
	//https://en.wikipedia.org/wiki/Conversion_between_quaternions_and_Euler_angles
  const yaw = euler[0];
  const pitch = euler[1];
  const roll = euler[2];

  const half = 0.5;
	const cy = Math.cos(yaw * half);
  const sy = Math.sin(yaw * half);
  const cp = Math.cos(pitch * half);
  const sp = Math.sin(pitch * half);
  const cr = Math.cos(roll * half);
  const sr = Math.sin(roll * half);

	return [
		cr*cp*cy + sr*sp*sy,  //w
		sr*cp*cy - cr*sp*sy,  //x
		cr*sp*cy + sr*cp*sy,  //y
		cr*cp*sy - sr*sp*cy   //z
  ];
}