/* ベンチマークv2 */
function generate_bench2() {
	var errorOut = new consoleOut(document.getElementById("urajijo-bench2-error"));
	errorOut.clear();

	if (!window.Worker) {
		errorOut.error("生成センターv2を利用できるブラウザではありません。");
		return;
	}

	var worker = new Worker("./script/urajijo_v2/core.js");

	// 各コード数
	var num = parseInt(document.urajijo_bench2.num.value);

	var startTime = new Date();

	document.urajijo_bench2.generate.disabled = true;

	worker.addEventListener('message', function (event) {
		if(event.data.completed) {
			var out = "";

			for (var i = 0; i < event.data.codes.length; i++) {
				var addr = event.data.codes[i].address.toString(16).toUpperCase();
				var data = event.data.codes[i].value.toString(16).toUpperCase();

				while (addr.length < 8) addr = '0' + addr;
				while (data.length < 2) data = '0' + data;

				out += addr + '-' + data + '\n';
			}

			var finishTime = new Date();

			var tookTime = (finishTime - startTime) / 1000;
			var tookTimeStr = "";
			if (tookTime >= 3600) {
				tookTimeStr += Math.floor(tookTime / 3600) + "時間";
			}
			if (tookTime >= 60) {
				tookTimeStr += Math.floor((tookTime / 60) % 60) + "分";
			}

			document.urajijo_bench2.output.value = out;
			document.urajijo_bench2.generate.disabled = false;

			tookTimeStr += Math.floor(tookTime % 60) + "." + Math.floor((tookTime * 10) % 10) + "秒";

			errorOut.clear();
			errorOut.info("所要時間：約" + tookTimeStr);
		} else {
			errorOut.clear();
			errorOut.info("進行状況：約" + Math.floor(event.data.progress * 100) + "%");
		}
	}, false);

	worker.postMessage({
		"address": {
			"start": 0x00000000,
			"end": 0xFFFFFFFF,
		},
		"value": {
			"min": 0x00,
			"max": 0xFF,
		},
		"count": num,
		"mul": 1,
		"align": 1,
	});
}
