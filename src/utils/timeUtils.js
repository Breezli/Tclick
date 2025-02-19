// timeUtils.js
export const formatTime = (seconds) => {
	const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
	const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
	const secs = (seconds % 60).toString().padStart(2, '0');
	
	return {
		hours,
		minutes,
		seconds: secs
	};
};

export const splitTimeString = (timeString) => {
	return {
		firstChar: timeString[0],
		secondChar: timeString[1]
	};
};

export const getCurrentTime = () => {
	const now = new Date();
	return {
		hours: now.getHours().toString().padStart(2, '0'),
		minutes: now.getMinutes().toString().padStart(2, '0'),
		seconds: now.getSeconds().toString().padStart(2, '0')
	};
};
