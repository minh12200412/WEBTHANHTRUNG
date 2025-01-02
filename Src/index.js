function Arrow(key) {
  let img = document.getElementById("sliderImg");
  let imgPath = img.src.split("/");
  console.log(imgPath);
  let imgName = imgPath[imgPath.length - 1];
  console.log(imgName);
  let imgString = imgName.split(".")[0];
  let imgNum = parseInt(imgString[2], 10);
  console.log(imgNum);
  if (key.id === "right") {
    if (imgNum == 7) {
      imgNum = 1;
    } else {
      imgNum = imgNum + 1;
    }
  } else {
    if (imgNum == 1) {
      imgNum = 7;
    } else {
      imgNum = imgNum - 1;
    }
  }
  let lastPath = `imgs/bg${imgNum}.jpg`;
  img.src = lastPath;
}
