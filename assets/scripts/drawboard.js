document.addEventListener("DOMContentLoaded", function() {
	var mouse = {
		click: false,
		move: false,
		pos: {x:0, y:0},
		pos_prev: false
	}
	
	var canvas = document.getElementById("drawboard");
	canvas.width = window.innerWidth / 2;
	canvas.height = window.innerHeight;
	var context = canvas.getContext("2d");
	var width = canvas.width;
	var height = canvas.height;
	
	canvas.onmousedown = function(e) {
		mouse.click = true;
	};
	
	canvas.onmouseup = function(e) {
		mouse.click = false;
	};
	
	canvas.onmousemove = function(e) {
		mouse.pos.x = e.clientX / width;
		mouse.pos.y = e.clientY / height;
		mouse.move = true;
	};
	
	socket.on("draw_line", function(data) {
		var line = data.line;
		context.beginPath();
		context.lineWidth = 2;
		context.moveTo(line[0].x * width, line[0].y * height);
		context.lineTo(line[1].x * width, line[1].y * height);
		context.stroke();
	});
	
	window.onresize = function(e) {
		canvas.width = window.innerWidth / 2;
		canvas.height = window.innerHeight;
	};
	
	function drawLoop() {
		if (mouse.click && mouse.move && mouse.pos_prev) {
			socket.emit("draw_line", { line: [mouse.pos, mouse.pos_prev] });
			mouse.move = false;
		}
		
		mouse.pos_prev = {x: mouse.pos.x, y: mouse.pos.y};
		setTimeout(drawLoop, 25);
	}
	
	drawLoop();
});
