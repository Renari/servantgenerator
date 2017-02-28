$(document).ready(init);
var canvasContainer;

function init() {
  canvasContainer = new canvasObject();
  registerEventHandlers();
}

function canvasObject() {
  this.canvas = new fabric.StaticCanvas('canvas', {
    width: 800,
    height: 600,
    backgroundColor: '#aa6c43'
  });
  this.backgroundImage = null;
  this.masterName = null;
  this.servantName = null;
  this.servantSex = null;
  this.servantHeightWeight = null;
  this.servantAlignment = null;
}

var servant = {
  //keys for accessing servantData
  servantClass:'servantClass',
  masterName:'masterName',
  name: 'name',
  sex: 'sex',
  heightWeight: 'heightWeight',
  alignment: 'alignment',
  servantData : {},
  getServantData : function(key) {
    return this.servantData[key];
  },
  setServantData : function(key, value) {
    this.servantData[key] = value;
    draw(key);
  }
}

var informationTextStyle = {
  fontSize: 14,
  fontFamily: 'Oswald',
  fill: 'white',
  textAlign: 'center',
  left: 390,
  width: 220,
  originX: 'center',
  originY: 'center'
}

function registerEventHandlers() {
  $('#class input').click(changeServantClass);
  $('#name').keyup(changeMasterName);
  $('#servant').keyup(changeServantName);
  $('#sex input').click(changeServantSex);
  $('#heightweight').keyup(changeServantHeightWeight);
  $('#alignment').change(changeServantAlignment);
}

function changeServantClass() {
  servant.setServantData(servant.servantClass, $(this).val());
}

function changeMasterName() {
  servant.setServantData(servant.masterName, $(this).val());
}

function changeServantName() {
  servant.setServantData(servant.name, $(this).val());
}

function changeServantSex() {
  servant.setServantData(servant.sex, $(this).val());
}

function changeServantHeightWeight() {
  servant.setServantData(servant.heightWeight, $(this).val());
}

function changeServantAlignment() {
  servant.setServantData(servant.alignment, $(this).val());
}

function draw(type) {
  switch (type) {
    case servant.servantClass: //background image
      var background = 'images/backgrounds/' + servant.getServantData(servant.servantClass) + '.png';
      if (canvasContainer.backgroundImage == null) {
        fabric.Image.fromURL(background, function(img){
          canvasContainer.backgroundImage = img;
          canvasContainer.canvas.sendToBack(img);
        });
      }
      else {
        canvasContainer.backgroundImage.setSrc(background, renderCanvas);
      }
      break;
    case servant.masterName:
      var master = servant.getServantData(servant.masterName);
      setTextObject('masterName', master, 128);
      break;
    case servant.name:
      var name = servant.getServantData(servant.name);
      setTextObject('servantName', name, 164);
      break;
    case servant.sex:
      var sex = capitalize(servant.getServantData(servant.sex));
      setTextObject('servantSex', sex, 200);
      break;
    case servant.heightWeight:
      setTextObject('servantHeightWeight', servant.getServantData(servant.heightWeight), 236);
      break;
    case servant.alignment:
      setTextObject('servantAlignment', servant.getServantData(servant.alignment), 272);
      break;
  }
}

function setTextObject(key, value, top) {
  if (canvasContainer[key] == null) {
    var text = new fabric.Text(value, informationTextStyle);
    text.top = top;
    canvasContainer[key] = text;
    canvasContainer.canvas.add(text);
  }
  else {
    canvasContainer[key].setText(value);
    renderCanvas();
  }
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function renderCanvas() {
  canvasContainer.canvas.renderAll();
}
