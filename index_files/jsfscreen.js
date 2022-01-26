window.addEventListener( 'resize', onWindowResize, false );
//画面縦、横の時のリサイズ
function onWindowResize() {
    var orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
    if (orientation.type === "portrait-primary" || orientation.type === "portrait-secondary") {

	/////////////縦向き　フルスクリーン解除
 	if (document.webkitCancelFullScreen) {
		document.webkitCancelFullScreen(); //Chrome15+, Safari5.1+, Opera15+
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen(); //FF10+
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen(); //IE11+
	} else if(document.cancelFullScreen) {
		document.cancelFullScreen(); //Gecko:FullScreenAPI仕様
	} else if(document.exitFullscreen) {
		document.exitFullscreen(); // HTML5 Fullscreen API仕様
	}

    } else {
	//wx = innerWidth;
	//wy = innerHeight;
	}
//wx = innerWidth;
//wy = innerHeight;
}
/////////////////////////////////////////////////////////////////////////////////////////////////

//フルスクリーン化 ///////safariで動くか？
//document.body.onclick = function() {
document.onclick = function() {
   var orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
      if (orientation.type === "portrait-primary" || orientation.type === "portrait-secondary") {
        //縦向き
		//何もしない
      } else {
        //横向き　フルスクリーンへ
		if (document.body.webkitRequestFullScreen) { 
			document.body.webkitRequestFullScreen();
		}
			else if (document.body. mozRequestFullScreen) {
				document.body. mozRequestFullScreen();
			}
			else {
				alert("not found")
			}
	//ctx.width = window.innerWidth;
	//ctx.height = window.innerHeight;
	}
}


