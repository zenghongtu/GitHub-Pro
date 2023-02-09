export const getFormatDate = (rawDate = ''): string => {
  const itemArr = new Date(rawDate).toString().split(' ');
  const m = itemArr[1];
  const d = itemArr[2];
  const y = itemArr[3];
  return `${m} ${d}, ${y}`;
};

export const getTimeAgo = (rawDate = ''): string => {
  const date = new Date(rawDate);

  const now = new Date().getTime();
  const limit = (now - date.getTime()) / 1e3;
  let content = '';
  if (limit < 60) {
    content = 'just now';
  } else if (limit >= 60 && limit < 3600) {
    content = Math.floor(limit / 60) + ' minutes ago';
  } else if (limit >= 3600 && limit < 86400) {
    content = Math.floor(limit / 3600) + ' hours ago';
  } else if (limit >= 86400 && limit < 2592000) {
    content = Math.floor(limit / 86400) + ' days ago';
  } else if (limit >= 2592000 && limit < 31104000) {
    content = Math.floor(limit / 2592000) + ' months ago';
  } else {
    content = getFormatDate(rawDate);
  }
  return content;
};
