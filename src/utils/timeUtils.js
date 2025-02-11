// timeUtils.js
export const getFormattedTime = () => {
    const now = new Date();
    
    // 获取当前时间的小时、分钟和秒数，并确保它们都是两位数
    const padZero = (num) => num.toString().padStart(2, '0');
    const hours = padZero(now.getHours());
    const minutes = padZero(now.getMinutes());
    const seconds = padZero(now.getSeconds());

    return {
        hoursFirstChar: hours[0],
        hoursSecondChar: hours[1],
        minutesFirstChar: minutes[0],
        minutesSecondChar: minutes[1],
        secondsFirstChar: seconds[0],
        secondsSecondChar: seconds[1],
    };
}