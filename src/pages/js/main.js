var ros = new ROSLIB.Ros({ url : 'ws://' + location.hostname + ':9000' });
ros.on('connection', function() {console.log('websocket: connected');});
ros.on('error', function(error) {console.log('websocket error: ', error);});
ros.on('close', function() {console.log('websocket: closed');});

var ls2 = new ROSLIB.Topic({
	ros: ros,
	name: '/detect_on',
	messageType: 'std_msgs/Int32'
})

function detect_on(){
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

function all_off(){
	for(i=0; i<document.chbox.elements.length ; i++){
        	document.chbox.elements[i].checked = false;
        }
	ls2.publish({data: 0});
}
