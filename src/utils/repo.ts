export function FindGitHubUrl(c) {
  var urls = FindUrls(c);
  if (urls.length == 0) {
    return '';
  }
  var gurl = '';
  for (var j = 0; j < urls.length; j++) {
    if (isGitHubPage(urls[j])) {
      //@ts-ignore
      if (gurl == '' || gurl.length > urls[j].length) {
        gurl = urls[j];
      }
    }
  }
  if (gurl) {
    return gurl;
  }
  return urls[0];
}

export function FindUrls(c) {
  var linkRegExp = /https?:\/\/[/0-9a-zA-Z.&=#_?-]+/g;
  var urls = [];
  var match;
  while ((match = linkRegExp.exec(c))) {
    //@ts-ignore
    urls.push(match[0]);
  }
  return urls;
}

export function ArrayContains(arr, val) {
  var i = arr.length;
  while (i--) {
    if (arr[i] === val) {
      return true;
    }
  }
  return false;
}

export function GetPercent(num, total) {
  num = parseFloat(num);
  total = parseFloat(total);
  if (isNaN(num) || isNaN(total)) {
    return '-';
  }
  return total <= 0 ? '0%' : Math.round((num / total) * 10000) / 100.0 + '%';
}

const CodeFileExtentsions = {
  java: 'java',
  kt: 'java',
  scala: 'java',
  py: 'python',
  go: 'go',
  sh: 'markup',
  js: 'javascript',
  jsx: 'javascript',
  php: 'php',
  c: 'c',
  json: 'json',
  cpp: 'go',
  html: 'markup',
  yml: 'markup',
  yaml: 'markup',
  R: 'R',
  css: 'css',
  scss: 'css',
  wxss: 'css',
  swift: 'swift',
  xml: 'markup',
  wxml: 'markup',
  ipynb: 'python',
};

export function getCodeMarkup(file) {
  for (var key in CodeFileExtentsions) {
    if (file.endsWith('.' + key)) {
      return CodeFileExtentsions[key];
    }
  }
  return false;
}

const ImageFileExtentsions = ['png', 'jpg', 'gif', 'jpeg', 'ico', 'incs'];

export function isImageFile(file) {
  for (var i in ImageFileExtentsions) {
    var key = ImageFileExtentsions[i];
    if (file.toLowerCase().endsWith('.' + key)) {
      return true;
    }
  }
  return false;
}

export function mdLink(text, link) {
  return '[' + text + '](' + link + ')';
}

export const githubHttpUrl = `http://github.com`;
export const githubHttpsUrl = `https://github.com`;

export function isGitHubPage(url) {
  return url.startsWith(githubHttpUrl) || url.startsWith(githubHttpsUrl);
}

type owner = 'owner' | '';
type repo = 'repo' | '';
type filePath = 'filePath' | '';

export type parseGitHubReturn = [owner, repo, filePath];

export function parseGitHub(url: string): parseGitHubReturn {
  let arr = url.split('/');
  if (arr.length == 4) {
    return [arr[3] as owner, '', ''];
  } else if (arr.length == 5) {
    let repo = arr[4];
    if (repo.indexOf('#')) {
      repo = arr[4].split('#')[0];
    }
    return [arr[3] as owner, repo as repo, ''];
  } else if (arr.length > 5) {
    const len = (githubHttpsUrl + '/' + arr[3] + '/' + arr[4] + '/').length;
    let file = url.slice(len);
    return [arr[3] as owner, arr[4] as repo, file as filePath];
  }
  return ['', '', ''];
}

export const getNavPath = ({ owner, filePath, repo }): string => {
  let url = '';
  if (filePath) {
    const full_name = `${owner}/${repo}`;
    if (filePath.startsWith('issues/new')) {
      url = `/pages/issues/create-issue?full_name=${full_name}`;
    } else if (/^issues\/\d+/.test(filePath)) {
      const num = filePath.split('/')[1];
      url = `/pages/issues/issue-detail/index?full_name=${full_name}&number=${num}`;
    } else if (filePath.startsWith('issues')) {
      url = `/pages/issues/index?full_name=${full_name}`;
    } else if (filePath.startsWith('pulls?q=')) {
      // TODO
    } else if (filePath.startsWith('pull')) {
      // TODO
    } else {
      const isFile = /.*\.\w{1,10}$/.test(filePath);
      const path = `/repos/${owner}/${repo}/contents/${filePath}`;
      if (isFile) {
        url = `/pages/repos/content/index?url=${path}`;
      } else {
        url = `/pages/repos/files/index?url=${path}`;
      }
    }
  } else if (repo) {
    url = `/pages/repos/index?owner=${owner}&repo=${repo}`;
  } else {
    url = `/pages/developer/index?name=${owner}`;
  }
  return url;
};
