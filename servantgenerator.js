var servant = {
  //keys for accessing servantData
  servantClass:'servantClass',
  masterName:'masterName',
  servantName:'servantName',
  servantSex:'servantSex',
  servantData : {
    servantClass:null
  },
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
var backgroundImage;
var masterName;
var servantName;
var servantSex;
var canvas;

$(document).ready(init);

function init() {
  canvas = new fabric.StaticCanvas('canvas', {
    width: 800,
    height: 600,
    backgroundColor: '#aa6c43'
  });
  registerEventHandlers();
}

function registerEventHandlers() {
  $('#class input').click(changeServantClass);
  $('#name').keyup(changeMasterName);
  $('#servant').keyup(changeServantName);
  $('#sex input').click(changeServantSex);
}

function changeServantClass() {
  servant.setServantData(servant.servantClass, $(this).val());
}

function changeMasterName() {
  servant.setServantData(servant.masterName, $(this).val());
}

function changeServantName() {
  servant.setServantData(servant.servantName, $(this).val());
}

function changeServantSex() {
  servant.setServantData(servant.servantSex, $(this).val());
}

function draw(type) {
  switch (type) {
    case servant.servantClass: //background image
      var background = 'images/backgrounds/' + servant.getServantData(servant.servantClass) + '.png';
      if(backgroundImage == null) {
        fabric.Image.fromURL(background, function(img){
          backgroundImage = img;
          canvas.add(img);
          canvas.sendToBack(img);
        });
      }
      else {
        backgroundImage.setSrc(background, renderCanvas);
      }
      break;
    case servant.masterName:
      var master = servant.getServantData(servant.masterName);
      if (masterName == null) {
        masterName = new fabric.Text(master, informationTextStyle);
        masterName.top = 128;
        canvas.add(masterName);
      }
      else {
        masterName.setText(master);
        renderCanvas();
      }
      break;
    case servant.servantName:
      var name = servant.getServantData(servant.servantName);
      if (servantName == null) {
        servantName = new fabric.Text(name, informationTextStyle);
        servantName.top = 164;
        canvas.add(servantName);
      }
      else {
        servantName.setText(name);
        renderCanvas();
      }
      break;
    case servant.servantSex:
      var sex = capitalize(servant.getServantData(servant.servantSex));
      if (servantSex == null) {
        servantSex = new fabric.Text(sex, informationTextStyle);
        servantSex.top = 200;
        canvas.add(servantSex);
      }
      else {
        servantSex.setText(sex);
        renderCanvas();
      }
  }
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function renderCanvas() {
  canvas.renderAll();
}
