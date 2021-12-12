/* 汎用コード生成v2 */
function generate_usa2() {
	var errorOut = new consoleOut(document.getElementById("urajijo-usa2-error"));
	errorOut.clear();

	if (!window.Worker) {
		errorOut.error("生成センターv2を利用できるブラウザではありません。");
		return;
	}

	var worker = new Worker("./script/urajijo_v2/core.js");

	// コード書式
	var addr_digit = parseInt(document.urajijo_usa2.addr_digit.value);
	var separator = document.urajijo_usa2.separator.value;
	var data_digit = parseInt(document.urajijo_usa2.data_digit.value);

	var addr_limit = Math.pow(16, addr_digit) - 1;
	var data_limit = Math.pow(16, data_digit) - 1;

	if (addr_digit <= 0 || addr_digit > 8 || (addr_digit % 2) != 0) {
		errorOut.error("アドレスの桁数は8までの偶数を入力して下さい。");
		return;
	}

	if (data_digit <= 0 || data_digit > 8 || (data_digit % 2) != 0) {
		errorOut.error("データの桁数は8までの偶数を入力して下さい。");
		return;
	}

	var align = parseInt(document.urajijo_usa2.align.value);

	if (!(align == 1 || align == 2 || align == 4)) {
		errorOut.error("アドレス境界は1、2、又は4を入力して下さい。");
		return;
	}

	// 各コード数
	var area1_start = 0x00000000;
	var area1_end = 0x00000000;
	var area1_min = 0x00;
	var area1_max = 0x00;
	var area1_num = parseInt(document.urajijo_usa2.area1_num.value);

	if (
		document.urajijo_usa2.area1_start.value.match(/^[0-9A-Fa-f]+$/) &&
		document.urajijo_usa2.area1_end.value.match(/^[0-9A-Fa-f]+$/) &&
		document.urajijo_usa2.area1_min.value.match(/^[0-9A-Fa-f]+$/) &&
		document.urajijo_usa2.area1_max.value.match(/^[0-9A-Fa-f]+$/)
	) {
		area1_start = parseInt(document.urajijo_usa2.area1_start.value, 16);
		area1_end = parseInt(document.urajijo_usa2.area1_end.value, 16);
		area1_min = parseInt(document.urajijo_usa2.area1_min.value, 16);
		area1_max = parseInt(document.urajijo_usa2.area1_max.value, 16);
	} else {
		errorOut.error("領域1: 各項目には16進数を入力してください。");
		area1_num = 0;
	}

	if (area1_start > area1_end) {
		var tmp_o = area1_start;
		area1_start = area1_end;
		area1_end = tmp_o;
	}

	if (area1_min > area1_max) {
		var tmp_t = area1_min;
		area1_min = area1_max;
		area1_max = tmp_t;
	}

	if (area1_start > addr_limit || area1_start > addr_limit) {
		errorOut.error("領域1：アドレスの範囲が" + addr_limit.toString(16).toUpperCase() + "を超えています。");
		area1_num = 0;
	}

	if (area1_min > data_limit || area1_max > data_limit) {
		errorOut.error("領域1：データの範囲が" + data_limit.toString(16).toUpperCase() + "を超えています。");
		area1_num = 0;
	}

	var area1_num_limit = Math.floor((area1_end - area1_start + align) / align);
	if (area1_num > area1_num_limit) {
		errorOut.warn("領域1：コードの数が" + area1_num_limit + "個に制限されます。");
		area1_num = area1_num_limit;
	}

	document.urajijo_usa2.generate.disabled = true;

	worker.addEventListener('message', function (event) {
		if(event.data.completed) {
			var out = "";

			for (var i = 0; i < event.data.codes.length; i++) {
				var addr = event.data.codes[i].address.toString(16).toUpperCase();
				var data = event.data.codes[i].value.toString(16).toUpperCase();

				while (addr.length < addr_digit) addr = '0' + addr;
				while (data.length < data_digit) data = '0' + data;

				out += addr;
				out += separator;
				out += data;
				out += '\n';
			}

			document.urajijo_usa2.output.value = out;
			document.urajijo_usa2.generate.disabled = false;

			errorOut.clear();
			errorOut.info("コードの生成が完了しました。");
		} else {
			errorOut.clear();
			errorOut.info("進行状況：約" + Math.floor(event.data.progress * 100) + "%");
		}
	}, false);

	worker.postMessage({
		"address": {
			"start": area1_start,
			"end": area1_end,
		},
		"value": {
			"min": area1_min,
			"max": area1_max,
		},
		"count": area1_num,
		"mul": 1,
		"align": align,
	});
}
