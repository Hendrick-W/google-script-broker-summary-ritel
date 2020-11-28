function doGet(e){
  var html = HtmlService.createTemplateFromFile("index").evaluate();
  html.setTitle("Broker Summary").setSandboxMode(HtmlService.SandboxMode.IFRAME);
  return html;
}
function brokerSumm(hari) {
  var dApp = DriveApp;
  var folderIter = dApp.getFoldersByName("Data Penjualan Ritel (json)");
  var folder = folderIter.next();
  var filesIter = folder.getFiles();
  var file = filesIter.next();
  var content = file.getBlob().getDataAsString();
  var json = JSON.parse(content).user;
  var counter = 1;
  while(counter != hari){
    var file = filesIter.next();
    var content = file.getBlob().getDataAsString();
    var temp = JSON.parse(content).user;
    json = [...json, ...temp];
    counter++;
  }
  var result = [];
  for (let obj of json) {
    const { kode_saham, NSLot, NSVal, Broker, Count } = obj;
    const found = result.find(obj => obj.kode_saham === kode_saham);
    if (found) {
      found.NSLot += NSLot;
      found.NSVal += NSVal;
      found.Broker += ', ';
      found.Broker += Broker;
      found.Count += Count;
    } else {
      result.push({ ...obj });
    }
  }
  return result;
//  var example = JSON.stringify(json);
//  return ContentService.createTextOutput(example).setMimeType(ContentService.MimeType.JSON);
}
