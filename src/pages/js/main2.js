var ros = new ROSLIB.Ros({ url : 'ws://' + location.hostname + ':9000' });
ros.on('connection', function() {console.log('websocket: connected');});
ros.on('error', function(error) {console.log('websocket error: ', error);});
ros.on('close', function() {console.log('websocket: closed');});

str = ''
var ls = new ROSLIB.Topic({
	ros: ros,
	name: '/twice',
	messageType: 'std_msgs/Int32'
});
ls.subscribe(function(message){
	str = message.data;
	document.getElementById("count").innerHTML = str;
});

var ls2 = new ROSLIB.Topic({
	ros: ros,
	name: '/wao',
	messageType: 'std_msgs/Int32'
})

function say_wao(){
	flagstr = ''
	for(i=0; i<document.chbox.elements.length ; i++){
		appendstr = '0';
		if(document.chbox.elements[i].checked){
			appendstr = '1';
		}
		flagstr += appendstr;
	}
	
	console.log('bin: ' + flagstr , 'int: ' + parseInt(flagstr, 2))

	ls2.publish({ data: parseInt(flagstr, 2) })
}

function say_woowao(){
	for(i=0; i<document.chbox.elements.length ; i++){
        	document.chbox.elements[i].checked = false;
        }
	ls2.publish({data: 0});
}
