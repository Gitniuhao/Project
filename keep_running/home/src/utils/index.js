function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {//格式化时间
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('.')
  const t2 = [hour, minute].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

/**
 * 时间戳转化为年 月 日 时 分 秒
 * ts: 传入时间戳
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
*/
export function tsFormatTime(timestamp, format) {//灵活选择时间转换格式

    // const formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    // let returnArr = [];

    // let date = new Date(timestamp * 1000);
    // let year = date.getFullYear()
    // let month = date.getMonth() + 1
    // let day = date.getDate()
    // let hour = date.getHours()
    // let minute = date.getMinutes()
    // let second = date.getSeconds()
    // returnArr.push(year, month, day, hour, minute, second);

    // returnArr = returnArr.map(formatNumber);

    // for (var i in returnArr) {
    //     format = format.replace(formateArr[i], returnArr[i]);
    // }

    var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    var returnArr = [];

    var date = new Date(timestamp * 1000);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));
    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));

    for (var i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i]);
    }

    return format;

}

export default {
  formatNumber,
  formatTime,
  tsFormatTime
}
