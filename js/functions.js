// JSONデータを取得する関数
function getJsonData(jsonUrl) {
  return new Promise((resolve, reject) => {
    $.getJSON(jsonUrl, function (data) {
      resolve(data);
    }).fail(function () {
      reject('Failed to load JSON file');
    });
  });
}

// CSVデータを取得する関数
async function fetchCsvData(fileName, skipRowCount = 0) {
  try {
    const response = await fetch(fileName);
    const text = await response.text();
    return parseCsv(text, skipRowCount);
  } catch (error) {
    throw new Error('Failed to load CSV file:' + fileName);
  }
}

// CSVデータをパースする関数（csvデータ内の「,」は「，」にしているため「,」に変換して返却）
function parseCsv(csvText, skipRowCount) {
  var regx = new RegExp(appsettings.commaInString, 'g');
  return csvText
    .trim()
    .split(/\r?\n|\r/)
    .slice(skipRowCount)
    .map((line) => line.split(',').map((value) => value.replace(regx, ',')));
}

// データをローカルストレージからクリアする関数
function removeLocal(key) {
  localStorage.removeItem(appsettings.appName + '.' + key);
}

// データをローカルストレージにセットする関数
function setLocal(key, value) {
  localStorage.setItem(appsettings.appName + '.' + key, value);
}

// ローカルストレージからデータをゲットする関数
function getLocal(key) {
  return localStorage.getItem(appsettings.appName + '.' + key);
}

// ローカルストレージから配列を取得(nullは空に)
function getLocalArray(key) {
  return (
    JSON.parse(localStorage.getItem(appsettings.appName + '.' + key)) ?? []
  );
}

// ローカルストレージに配列設定(nullは空に)
function setLocalArray(key, array) {
  localStorage.setItem(
    appsettings.appName + '.' + key,
    JSON.stringify(array ?? [])
  );
}

// エラー時処理
function showError(errorMsg1, errorMsg2) {
  // コンソールに表示
  console.error(errorMsg1, errorMsg2);
  // 画面に表示
  alert(errorMsg2);
}

// Youtubeタグ作成
function createYoutubeTag(id, isPlayList) {
  // 変数初期化
  var tag = '';

  // タグ生成
  tag += '<div class="card-iframe-container">';
  tag +=
    '        <iframe src="https://www.youtube.com/embed/' +
    (isPlayList ? 'videoseries?list=' : '?loop=1&playlist=') +
    id +
    '" frameborder="0" allowfullscreen>';
  tag += '   </iframe> ';
  tag += '</div> ';

  return tag;
}

// Youtubeタグ作成
function createYoutubeListTag(ids) {
  // 変数初期化
  var tag = '';

  // タグ生成
  tag += '<div class="card-iframe-container">';
  tag +=
    '        <iframe src="https://www.youtube.com/watch_videos?video_ids=' +
    ids +
    '" frameborder="0" allowfullscreen>';
  tag += '   </iframe> ';
  tag += '</div> ';

  return tag;
}
