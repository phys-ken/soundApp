let wx=window.innerWidth;
let wy=window.innerHeight;
let kx=wx/1366;
let ky=wy/768;
//let wx=1366/2;
//let wy=768/2;
let canvas = document.getElementById('mycanvas');
canvas.width=wx;//1366;
canvas.height=wy;//768;
let ctx = canvas.getContext('2d');



//�C�x���g�p/////////////////////////////////////////////////////
window.addEventListener( 'resize', onWindowResize, false );


//�E�N���b�N ���������֎~///////////////////////////////////////////
document.oncontextmenu = function () {return false;}


/////�^�b�`���[�u�ɂ���ʈړ����֎~///////
///// �X���C�_�[������//////////////////////
let target1 = document.getElementById('vol');
let target2 = document.getElementById('freq');

document.addEventListener('touchmove', function(e) {
	if (event.target === target1 || event.target === target2){
		e.stopPropagation();
	}else{
		e.preventDefault();
	}
}, {passive: false});
//////////////////////////////////////////////////////////////////////////////////////////////////////////
let drawFlag=0;
let oscStartFlag=0;

let sound=0;
let soundLoad2=0;
let soundLoad3=0;
let soundLoad4=0;

let endFlag=0;

let start_flag=1;
let vol_bak=0.5;





////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////// audio ctx �쐬 (�����g)//////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
audioCtx = new(window.webkitAudioContext || window.AudioContext)();
osc = audioCtx.createOscillator();
vol = audioCtx.createGain();
osc.connect(vol);

//osc.type = 'sine';
osc.frequency.value =220;

vol.connect(audioCtx.destination);
vol.gain.value = 0;//0
//
analyser = audioCtx.createAnalyser();
analyser.fftSize =2048 //�f�t�H���g2048;
vol.connect(analyser);




////���y�f�[�^�ǂݍ���////////////////////////////////////////////////////////////////////////////////////
audioCtx2 = new(window.webkitAudioContext || window.AudioContext)();
vol2 = audioCtx2.createGain();

    request1 = new XMLHttpRequest();
    request1.responseType = 'arraybuffer';

    //request1.open('GET', 'sound/guitar.mp3', true);
    request1.open('GET', 'sound/g.mp3', true);

    request1.onload = function() {
        audioCtx2.decodeAudioData(
            request1.response,
            function(_data) {
                data2 = _data;
            },
            function(e) {
            }
        );
    };
    request1.send();
///////////////////////
audioCtx3 = new(window.webkitAudioContext || window.AudioContext)();
vol3 = audioCtx3.createGain();

    request2 = new XMLHttpRequest();
    request2.responseType = 'arraybuffer';

    //request2.open('GET', 'sound/fagot2.mp3', true);
    request2.open('GET', 'sound/fue2.mp3', true);

    request2.onload = function() {
        audioCtx3.decodeAudioData(
            request2.response,
            function(_data) {
                data3 = _data;
            },
            function(e) {
            }
        );
    };
    request2.send();

///////////////////////
audioCtx4 = new(window.webkitAudioContext || window.AudioContext)();
vol4 = audioCtx4.createGain();

    request4 = new XMLHttpRequest();
    request4.responseType = 'arraybuffer';
    request4.open('GET', 'sound/niko.mp3', true);

    request4.onload = function() {
        audioCtx4.decodeAudioData(
            request4.response,
            function(_data) {
                data4 = _data;
            },
            function(e) {

            }
        );
    };
    request4.send();

/// ���y�Đ��@/////////////////////////////////////////////////////////////////////////////////////////////////
function sound02(){

vol2.connect(audioCtx2.destination);
//
analyser2 = audioCtx2.createAnalyser();
analyser2.fftSize =2048; //�f�t�H���g2048;
vol2.connect(analyser2);


	sound=2;
	///wave �{�����[���̏���
	//vol_bak=vol.gain.value; // <-----�Ȃ�
	vol.gain.value = 0; //audio ctx1 osc�̉��ʂ��O�ɂ���
	document.querySelector('#volVal').value =Number(vol_bak).toFixed(2);

	//�y��@�{�����[���̏���
	vol2.gain.value = 0.75; //audio ctx2
	vol3.gain.value = 0; //audio ctx3
	vol4.gain.value = 0; //audio ctx4

	bufferSource = audioCtx2.createBufferSource();
	bufferSource.connect(vol2);
	///////
	if( soundLoad2==0){
		bufferSource.buffer = data2;
		bufferSource.start(0);
		soundLoad2=1;
	}
	bufferSource.onended =function(){soundLoad2=0;}
}
/////////////////////////////////////////////////////////
function sound03(){

vol3.connect(audioCtx3.destination);
//
analyser3 = audioCtx3.createAnalyser();
analyser3.fftSize =2048; //�f�t�H���g2048;
vol3.connect(analyser3);


	sound=3;
	///wave �{�����[���̏���
	//vol_bak=vol.gain.value; //<-----�Ȃ�
	vol.gain.value = 0; //audio ctx1 osc�̉��ʂ��O�ɂ���
	document.querySelector('#volVal').value =Number(vol_bak).toFixed(2);

	//�y��@�{�����[���̏���
	vol2.gain.value = 0; //audio ctx2
	vol3.gain.value = 1.5; //audio ctx3
	vol4.gain.value = 0; //audio ctx4

	bufferSource = audioCtx3.createBufferSource();
	bufferSource.connect(vol3);
	///////


	if(soundLoad3==0){
		bufferSource.buffer = data3;
		bufferSource.start(0);
		soundLoad3=1;
	}

	bufferSource.onended =function(){soundLoad3=0;}
}

//////////////////////////////////////////////////////////////
function sound04(){

vol4.connect(audioCtx4.destination);
//
analyser4 = audioCtx4.createAnalyser();
analyser4.fftSize =2048; //�f�t�H���g2048;
vol4.connect(analyser4);


	sound=4;

	///wave �{�����[���̏���
	//vol_bak=vol.gain.value; //<-----�Ȃ�
	vol.gain.value = 0; //audio ctx1 osc�̉��ʂ��O�ɂ���
	document.querySelector('#volVal').value =Number(vol_bak).toFixed(2);

	//�y��@�{�����[���̏���
	vol2.gain.value = 0; //audio ctx2
	vol3.gain.value = 0; //audio ctx3
	vol4.gain.value = 1.0; //audio ctx4

	bufferSource = audioCtx4.createBufferSource();
	bufferSource.connect(vol4);
	///////
	if(soundLoad4==0){
		bufferSource.buffer = data4;
		bufferSource.start(0);
		soundLoad4=1;
	}
	bufferSource.onended =function(){soundLoad4=0;}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function changeVol() {
	let vol_value=document.getElementById("vol").value;
	document.querySelector('#volVal').value =Number(vol_value).toFixed(2);
    vol.gain.value = vol_value;
    vol_bak=vol_value;
}
///////////////////////////////////////////
function changeFreq() {
	let f_value=document.getElementById("freq").value;
	document.querySelector('#freqVal').value = ( '00' + f_value ).slice( -4 );
	osc.frequency.value = f_value;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// �I�� ////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function wave1(){
	sound=0;
	if (start_flag==1){
		start_flag=0;
		vol.gain.value = 0.5; //audio ctx1�̉���

	}else{
		vol.gain.value = vol_bak; //audio ctx1�̉���
	}
	
	vol2.gain.value = 0;   //audio ctx2�̉���
	vol3.gain.value = 0;   //audio ctx2�̉���
	vol4.gain.value = 0;   //audio ctx2�̉���

	osc.type = 'sine';

	if (oscStartFlag==0){oscStartFlag=1;osc.start(0);}
}
////////////////////////////////////////////////////////////
function wave2(){
	sound=0;
	if (start_flag==1){
		start_flag=0;
		vol.gain.value = 0.5; //audio ctx1

	}else{
		vol.gain.value = vol_bak; //audio ctx1
	}

	//vol.gain.value = vol_bak; ////audio ctx1

	vol2.gain.value = 0;   ////audio ctx2
	vol3.gain.value = 0;   ////audio ctx2
	vol4.gain.value = 0;   ////audio ctx2

	osc.type = 'square';

	if (oscStartFlag==0){oscStartFlag=1;osc.start(0);}
}

//////////////////////////////////////////////////////////
function wave3(){
// �J�X�^���g�`

sound=0;

vol.gain.value = vol_bak; //audio ctx1

vol2.gain.value = 0;   //audio ctx2
vol3.gain.value = 0;   //audio ctx2
vol4.gain.value = 0;   //audio ctx2



let a=2.0;
let n = new Array(13);
//�t���[�g
n[0]=1;
n[1]=0.35
n[2]=0.05;
n[3]=0.08;
n[4]=0.01;

n[5]=0.001;
n[6]=0.001;
n[7]=0;
n[8]=0;
n[9]=0;

n[10]=0;
n[11]=0;
n[12]=0;
//
let imag= new Float32Array([ a*n[0],a*n[1],a*n[2],a*n[3],a*n[4],a*n[5],a*n[6],a*n[7],a*n[8],a*n[9],a*n[10],a*n[11],a*n[12]]);   // sine
let real = new Float32Array(imag.length);                  // cos
let waveTable = audioCtx.createPeriodicWave(real, imag, {disableNormalization: true});
osc.setPeriodicWave(waveTable);
//
if (oscStartFlag==0){oscStartFlag=1;osc.start(0);}

}
//////////////////////////////////////////////////////////////////////////////
function wave4(){
// �J�X�^���g�`
sound=0;
vol.gain.value = vol_bak; //audio ctx1

vol2.gain.value = 0;   //audio ctx2
vol3.gain.value = 0;   //audio ctx2
vol4.gain.value = 0;   //audio ctx2

let a=0.3;
let n = new Array(13);
//�T�b�N�X
n[0]=1;
n[1]=0.75
n[2]=0.65;
n[3]=0.45;
n[4]=0.38;

n[5]=0.4;
n[6]=0.4;
n[7]=0.3;
n[8]=0.3;
n[9]=0.05;

n[10]=0.05;
n[11]=0;
n[12]=0;
/*
//�o�C�I����
n[0]=1;
n[1]=0.45;
n[2]=0.45;
n[3]=0.3;
n[4]=0.4;

n[5]=0.45;
n[6]=0.2;
n[7]=0.3;
n[8]=0.2;
n[9]=0.1;

n[10]=0.1;
n[11]=0.2;
n[12]=0.05;
*/
//
let imag= new Float32Array([ a*n[0],a*n[1],a*n[2],a*n[3],a*n[4],a*n[5],a*n[6],a*n[7],a*n[8],a*n[9],a*n[10],a*n[11],a*n[12]]);   // sine
let real = new Float32Array(imag.length);                  // cos
let waveTable = audioCtx.createPeriodicWave(real, imag, {disableNormalization: true});
osc.setPeriodicWave(waveTable);
//
if (oscStartFlag==0){oscStartFlag=1;osc.start(0);}
}



function hakei(){
	if (oscStartFlag==0){oscStartFlag=1;osc.start(0);}

	if (drawFlag==0){drawFlag=1;}
	else{drawFlag=0;}
	//
}

//////////////////////////////////////
function buttonBack(){
		window.history.back(-1); //return false;
} 
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
animate();

function animate() {
	requestAnimationFrame(animate); 

if (sound==0){
	amp = new Uint8Array(analyser.fftSize);//analyser.fftSize=2048
	//�@�@�@�Q�T�T�`�P�Q�W�`�O
    // �U�� �@�P�@�@�@�O�@�@�|�P
	analyser.getByteTimeDomainData(amp);//���ԗ̈�̔g�`�f�[�^ 0�`255���擾����
}
if (sound==2){
	amp = new Uint8Array(analyser2.fftSize);//analyser.fftSize=2048
	//�@�@�@�Q�T�T�`�P�Q�W�`�O
    // �U�� �@�P�@�@�@�O�@�@�|�P
	analyser2.getByteTimeDomainData(amp);//���ԗ̈�̔g�`�f�[�^ 0�`255���擾����
}
if (sound==3){
	amp = new Uint8Array(analyser3.fftSize);//analyser.fftSize=2048
	//�@�@�@�Q�T�T�`�P�Q�W�`�O
    // �U�� �@�P�@�@�@�O�@�@�|�P
	analyser3.getByteTimeDomainData(amp);//���ԗ̈�̔g�`�f�[�^ 0�`255���擾����
}
if (sound==4){
	amp = new Uint8Array(analyser4.fftSize);//analyser.fftSize=2048
	//�@�@�@�Q�T�T�`�P�Q�W�`�O
    // �U�� �@�P�@�@�@�O�@�@�|�P
	analyser4.getByteTimeDomainData(amp);//���ԗ̈�̔g�`�f�[�^ 0�`255���擾����
}


ctx.beginPath();
ctx.fillStyle = 'rgb(0, 0, 0)';
//ctx.fillStyle = 'rgb(0, 45, 45)';
ctx.fillRect(0, 0, wx, wy);
ctx.lineWidth = 3;
ctx.strokeStyle = 'rgb(0, 255, 0)';
///////////////////////
	if (drawFlag==1){

		x0 = 0;
		dAmp = 10;//10;//20;//5;

		while (amp[x0++] > 128 );//128=0
		if (x0 >= wx){x0 = 0};

		while (amp[x0++] < 128+dAmp );
		if (x0 >= wx) {x0 = 0};

		for (var x = x0; x < amp.length && x < x0 + wx ; x=x+1){
			ctx.lineTo(x - x0, wy - amp[x]/255 * wy);
		}

		  ctx.stroke();
	}
////////////////////////
//ctx.fillStyle = 'rgb(160, 90, 0)';
ctx.fillStyle = 'rgb(0, 100, 100)';
ctx.fillRect(0, 0, 40*kx, wy);
ctx.fillRect(wx-40*kx, 0, wx, wy);
ctx.fillRect(0, 0, wx, 40*ky);
ctx.fillRect(0, wy-100*ky, wx, wy-100*ky);


}
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
