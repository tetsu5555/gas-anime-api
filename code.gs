// https://script.google.com/macros/s/AKfycbzCEZxrl4kCPU7WhOYwU_FlPJx_Domy95PCjTTJkbUamhNu6JOX/exec?table=anime
// クエリパラーメーターを渡すのが大事。(?table=anime)
// にブラウザからアクセスするとレスポンスが見れる。

// curl -L  https://script.google.com/macros/s/AKfycbzCEZxrl4kCPU7WhOYwU_FlPJx_Domy95PCjTTJkbUamhNu6JOX/exec?table=anime
// curlする場合は -Lオプションをつけることで実行できた。
// -Lオプションは、--locationオプションで
// リダイレクト設定されている URL にアクセスした時、リダイレクト先の URL に対してのリクエストを再度発行してくれる。

function doGet(e) {
  var returnJson;
  if(e.parameter.table=="anime"){
    var sheetid = '1xnwINkWl-UoUGwfWNJX5DeJIfScoLtxXHDd74CxEJks';
    var data;
    if(e.parameter.id){
        // 詳細を取ってくる
        data = getOneDataFromSpreadSheet(sheetid, e.parameter.id);
        var columns = ['id', 'title', 'description', 'src'];
        data = arrayToObject(data, columns);
    }else{
        // 一覧を取ってくる
        data = getDataFromSpreadSheet(sheetid);
        var columns = ['id', 'title'];
        data = arrayToObject(data, columns);
    }
    returnJson = {"animes": data};
  }else if(e.parameter.table=="review"){
    // reviewを取ってくる
    var sheetid = '1StBefiOBfZW7PzZvI1fP4RKEJi5wBgrSUAHAtsklS_E';
    var data = getDataFromSpreadSheet(sheetid);
    var columns = ['anime_id', 'review'];
    var data = arrayToObject(data, columns);
    returnJson = {"reviews": data};
  }else{
    returnJson = {"message": "tableパラメーターが不正です。"};
  }
  var returnContent = createJsonContent(returnJson);
  return returnContent;
}

// reviewを投稿する関数
function doPost(e){
  var data = getBodyJson(e);
  var columns = ["anime_id", "review"];
  var data_ar = objectToArray(data, columns);
  var sheetid = '1StBefiOBfZW7PzZvI1fP4RKEJi5wBgrSUAHAtsklS_E';
  addRowToSpreadSheet(sheetid, data_ar);
}



function createJsonContent(jsonData){
  var text = JSON.stringify(jsonData);
  var content = ContentService.createTextOutput(text);
  return content.setMimeType(ContentService.MimeType.JSON);
}

function getDataFromSpreadSheet(sheetid){
  var sheet = SpreadsheetApp.openById(sheetid).getSheetByName('シート1');
  return sheet.getRange(1, 1, 10, 2).getValues();
}

function getOneDataFromSpreadSheet(sheetid, id){
  var sheet = SpreadsheetApp.openById(sheetid).getSheetByName('シート1');
  return sheet.getRange(id, 1, 1, 4).getValues();
}

function arrayToObject(data, columns){
  return data.map(function(ar){
    var row = {};
    for(var i=0; i<ar.length; i++) row[columns[i]] = ar[i];
    return row;
  });
}

function getBodyJson(e){
  var jsonString = e.postData.getDataAsString();
  return JSON.parse(jsonString);
}

function objectToArray(data, columns){
  var ar = [];
  for(var i = 0; i < columns.length; i++) ar.push(data[columns[i]]);
  return ar;
}

function addRowToSpreadSheet(id, row){
  var sheet = SpreadsheetApp.openById(id).getSheetByName('シート1');
  sheet.appendRow(row)
}