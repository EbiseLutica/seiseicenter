/* 生成センター v1.5 (2015/06/23) Win10判定の追加で52149バイトを維持できず */
/* 生成センター v1.5.1 (2018/09/18) SFCの再生成が機能していなかったのを修正 */

/* 出力コンソール */
function consoleOut(elem) {
	this.target = null;

	if (elem && typeof elem == "object" && elem.nodeType == 1) {
		this.target = elem;
	}
}

/* エラー出力 */
consoleOut.prototype.error = function () {
	if (this.target) {
		for (var i = 0; i < arguments.length; i++) {
			var errorParagraph = document.createElement("p");
			var errorText = document.createTextNode(arguments[i].toString());

			errorParagraph.setAttribute("class", "urajijo-error");
			errorParagraph.appendChild(errorText);
			this.target.appendChild(errorParagraph);
		}
	}
};

/* 警告出力 */
consoleOut.prototype.warn = function () {
	if (this.target) {
		for (var i = 0; i < arguments.length; i++) {
			var errorParagraph = document.createElement("p");
			var errorText = document.createTextNode(arguments[i].toString());

			errorParagraph.setAttribute("class", "urajijo-warn");
			errorParagraph.appendChild(errorText);
			this.target.appendChild(errorParagraph);
		}
	}
};

/* 情報出力 */
consoleOut.prototype.info = function () {
	if (this.target) {
		for (var i = 0; i < arguments.length; i++) {
			var errorParagraph = document.createElement("p");
			var errorText = document.createTextNode(arguments[i].toString());

			errorParagraph.setAttribute("class", "urajijo-info");
			errorParagraph.appendChild(errorText);
			this.target.appendChild(errorParagraph);
		}
	}
};

/* リンク出力 */
consoleOut.prototype.link = function (link, caption) {
	if (this.target && arguments.length >= 1) {
		if (arguments.length < 2) {
			caption = link;
		}

		var linkParagraph = document.createElement("p");
		var linkElement = document.createElement("a");
		var linkText = document.createTextNode(caption);

		linkElement.setAttribute("href", link);
		linkElement.setAttribute("target", "_blank");
		linkElement.appendChild(linkText);

		linkParagraph.setAttribute("class", "urajijo-info");
		linkParagraph.appendChild(linkElement);

		this.target.appendChild(linkParagraph);
	}
};

/* エラー消去 */
consoleOut.prototype.clear = function () {
	if (this.target) {
		while (this.target.firstChild)
			this.target.removeChild(this.target.firstChild);
	}
};

/* ブラウザ判定 */
//if (!isSupportedBrowser(errorOut)) return;
function isSupportedBrowser() {
	var target = new consoleOut();
	if (arguments.length >= 1) {
		target = arguments[0];
	}

	var userAgent = window.navigator.userAgent;

	if (userAgent.indexOf("Opera ") > 0 || userAgent.indexOf("Opera/") == 0) {
		// Opera 13以下
		// UA偽装があるので最初に判定
		var opVer = userAgent.match(/Opera[ \/](\d+(?:\.\d+)?)/)[1];

		if (opVer == "9.80") {
			opVer = userAgent.match(/Version\/(\d+(?:\.\d+)?)/)[1];
		}

		target.error("検出されたブラウザ：Opera " + opVer, "Blinkが採用された新しいOperaにアップグレードするか、他のブラウザにてご利用下さい。");
		return false;
	} else if (userAgent.indexOf("MSIE") > 0) {
		// IE10以下
		var ieVer = userAgent.match(/MSIE (\d+(?:\.\d+)?)/)[1];

		// XPのサポートが切れたら9に、Vistaのサポートが切れたら10に
		if (parseFloat(ieVer) < 9) {
			// IE8以下
			target.error("検出されたブラウザ：Internet Explorer " + ieVer, "Windows UpdateにてInternet Explorerをアップグレードして下さい。");
			return false;
		}
	} else if (userAgent.indexOf("Trident/") > 0) {
		// IE11
		var winVer = userAgent.match(/Windows NT (\d+(?:\.\d+)?)/)[1];
		var ieVer = userAgent.match(/rv:(\d+(?:\.\d+)*)/)[1];

		if (parseFloat(winVer) >= 10.0) {
			// Windows 10以上
			target.error("検出されたブラウザ：Internet Explorer " + ieVer, "Internet Explorerは古いサイトとの互換性のためのブラウザです。", "Microsoft Edge、または他のブラウザにてご利用ください。");
			return false;
		} else {
			if (parseFloat(ieVer) < 9) {
				// 現状ではこの判定は無意味
				target.error("検出されたブラウザ：Internet Explorer " + ieVer, "Windows UpdateにてInternet Explorerをアップグレードして下さい。");
				return false;
			}
		}
	} else if (userAgent.indexOf("Edge/") > 0) {
		// Edge
		var edgeVer = userAgent.match(/Edge\/(\d+(?:\.\d+)*)/)[1];

		if (parseFloat(edgeVer) < 13) {
			// Edge 12以下
			target.error("検出されたブラウザ：Microsoft Edge " + edgeVer, "[スタート]→[設定]→[更新とセキュリティ]からWindows Updateを適用して下さい。");
			return false;
		}
	} else if (userAgent.indexOf("Gecko/") > 0) {
		// Firefox
		var fxVer = userAgent.match(/rv:(\d+(?:\.\d+)*)/)[1];

		if (parseFloat(fxVer) < 4) {
			// Firefox 4以下
			target.error("検出されたブラウザ：Mozilla Firefox 4.0以下", "メニューの[ヘルプ]→[Firefox について]から更新を適用して下さい。");
			return false;
		} else if (parseFloat(fxVer) < 44) {
			// Firefox 43以下
			target.error("検出されたブラウザ：Mozilla Firefox " + fxVer, "メニューの[ヘルプ]→[Firefox について]から更新を適用して下さい。", "※ESR版には対応しておりません。");
			return false;
		}
	} else if (userAgent.indexOf("AppleWebKit/") > 0) {
		// WebKit
		if (userAgent.indexOf("Chrome/") > 0) {
			// Blink
			if (userAgent.indexOf("OPR/") > 0) {
				// Opera
				var oprVer = userAgent.match(/OPR\/(\d+(?:\.\d+)*)/)[1];

				if (parseFloat(oprVer) < 34) {
					// Opera 33以下
					target.error("検出されたブラウザ：Opera " + oprVer, "最新のブラウザにアップデートして下さい。");
					return false;
				}
			} else {
				// Chrome
				var gcVer = userAgent.match(/Chrome\/(\d+(?:\.\d+)*)/)[1];

				if (parseFloat(gcVer) < 48) {
					// Chrome 47以下
					target.error("検出されたブラウザ：Google Chrome " + gcVer, "右上のメニューボタン→[Google Chrome について(G)]から更新を適用して下さい。");
					return false;
				}
			}
		} else {
			// Safari
			var awkVer = userAgent.match(/AppleWebKit\/(\d+(?:\.\d+)?)/)[1];

			if (parseFloat(awkVer) < 537) {
				// Safari 6.0以下
				target.error("検出されたブラウザ：WebKit " + awkVer, "最新のブラウザにアップデートして下さい。", "※Windows版のSafariには対応していません。他のブラウザでご利用下さい。");
				return false;
			}
		}
	}

	return true;
}

/* 生成コア部分 */
function Code(address, value) {
	this.address = address;
	this.value = value;
}

function compare_Code(a, b) {
	return a.address - b.address;
}

function generator_core(addr_start, addr_end, val_min, val_max, count, mul, align) {
	var codes = new Array();

	var hi_align = Math.max(1, Math.floor(align / mul));
	var lo_align = Math.max(1, align % mul);

	var hi_start = Math.floor(addr_start / mul);
	var hi_length = Math.floor((Math.floor(addr_end / mul) - Math.floor(addr_start / mul) + hi_align) / hi_align) * hi_align;

	var lo_start = addr_start % mul;
	var lo_length = Math.floor((addr_end % mul - addr_start % mul + lo_align) / lo_align) * lo_align;

	var length = hi_length * lo_length;

	for (var i = 0; i < count; i++) {
		var rand_addr = Math.floor(length * Math.random());
		rand_addr = Math.floor(rand_addr / lo_length) * mul + rand_addr % lo_length;
		rand_addr += hi_start * mul + lo_start;

		var rand_val = Math.floor(val_min + (val_max - val_min + 1) * Math.random());

		for (var j = 0; j < codes.length; j++) {
			if (rand_addr == codes[j].address) {
				rand_addr += align;
				while ((rand_addr % mul) < lo_start || (rand_addr % mul) >= (lo_start + lo_length)) {
					rand_addr += mul - lo_length;
				}
			} else if (rand_addr < codes[j].address) {
				break;
			}
		}

		codes.splice(j, 0, new Code(rand_addr, rand_val));
		length -= align;
	}

	return codes;
}

function generator_regenerate(codes, val_min, val_max) {
	for (var i = 0; i < codes.length; i++) {
		codes[i].value = Math.floor(val_min + (val_max - val_min + 1) * Math.random());
	}

	return codes;
}

/* ファミリーコンピュータ/Nintendo Entertainment System */
function generate_nes(regenerate) {
	var errorOut = new consoleOut(document.getElementById("urajijo-nes-error"));
	errorOut.clear();
	isSupportedBrowser(errorOut);

	var code_type = "VirtuaNES";

	if(document.urajijo_nes.code_type.length) {
		for(var i = 0; i < document.urajijo_nes.code_type.length; i++) {
			if(document.urajijo_nes.code_type[i].checked) {
				code_type = document.urajijo_nes.code_type[i].value;
				break;
			}
		}
	}

	var codes = new Array();

	if (regenerate) { // 再生成: アドレスを変えずにコードを再生成
		var regenerate_min = 0x00;
		var regenerate_max = 0x00;

		if (
			document.urajijo_nes.regenerate_min.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_nes.regenerate_max.value.match(/^[0-9A-Fa-f]+$/)
		) {
			regenerate_min = parseInt(document.urajijo_nes.regenerate_min.value, 16);
			regenerate_max = parseInt(document.urajijo_nes.regenerate_max.value, 16);
		} else {
			errorOut.error("再生成：各項目には16進数を入力してください。");
			return;
		}

		if (regenerate_min > regenerate_max) {
			var tmp_t = regenerate_min;
			regenerate_min = regenerate_max;
			regenerate_max = tmp_t;
		}

		if (code_type == "VirtuaNES") { // VirtuaNESコードか否か
			var cur_codes = document.urajijo_nes.output.value.match(/^(?:#[0-7]\t)?[0-9A-F]{4,5}-0?1-[0-9A-F]{2}/gm);
			for (var i = 0; i < cur_codes.length; i++) {
				var addr_val = cur_codes[i].match(/^(?:#[0-7]\t)?(1?[0-9A-F]{4})-0?1-([0-9A-F]{2})/);

				if (addr_val && addr_val.length == 3) {
					var addr_fix = parseInt(addr_val[1], 16);
					if (addr_fix >= 0x10000 && addr_fix < 0x12000)
						addr_fix -= 0x10000 - 0x6000;

					codes.push(new Code(
						addr_fix,
						parseInt(addr_val[2], 16)
					));
				}
			}
		} else {
			var cur_codes = document.urajijo_nes.output.value.match(/^(?:#[0-7]\t)?[0-9A-F]{4,5}-0?1-[0-9A-F]{2}/gm);
			for (var i = 0; i < cur_codes.length; i++) {
				var addr_val = cur_codes[i].match(/^(?:#[0-7]\t)?([0-7][0-9A-F]{3,4})-0?1-([0-9A-F]{2})/);

				if (addr_val && addr_val.length == 3) {
					var addr_fix = parseInt(addr_val[1], 16);
					if (addr_fix >= 0x6000 && addr_fix < 0x8000)
						addr_fix += 0x10000 - 0x6000;

					codes.push(new Code(
						addr_fix,
						parseInt(addr_val[2], 16)
					));
				}
			}
		}

		codes = generator_regenerate(codes, regenerate_min, regenerate_max);
	} else {
		// 各コード数
		var zeropage_num = parseInt(document.urajijo_nes.zeropage_num.value);
		var ram_num = parseInt(document.urajijo_nes.ram_num.value);
		var sram_num = parseInt(document.urajijo_nes.sram_num.value);
		var rom_num = parseInt(document.urajijo_nes.rom_num.value);
		var exram_num = parseInt(document.urajijo_nes.exram_num.value);

		var custom_start = 0x0000;
		var custom_end = 0x0000;
		var custom_min = 0x00;
		var custom_max = 0x00;
		var custom_num = parseInt(document.urajijo_nes.custom_num.value);

		if (zeropage_num > 0x100) {
			errorOut.warn("ゼロページコードの数が" + 0x100 + "個に制限されます。");
			zeropage_num = 0x100;
		}

		if (ram_num > 0x700) {
			errorOut.warn("RAM領域コードの数が" + 0x700 + "個に制限されます。");
			ram_num = 0x700;
		}

		if (sram_num > 0x2000) {
			errorOut.warn("SRAM領域コードの数が" + 0x2000 + "個に制限されます。");
			sram_num = 0x2000;
		}

		if (code_type == "VirtuaNES") { // VirtuaNESコードか否か
			if (rom_num > 0x8000) {
				errorOut.warn("ROM領域コードの数が" + 0x8000 + "個に制限されます。");
				rom_num = 0x8000;
			}
			exram_num = 0;
		} else {
			if (exram_num > 0x10000) {
				errorOut.warn("マッパー拡張メモリ領域コードの数が" + 0x10000 + "個に制限されます。");
				exram_num = 0x10000;
			}
			rom_num = 0;
		}

		if (
			document.urajijo_nes.custom_start.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_nes.custom_end.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_nes.custom_min.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_nes.custom_max.value.match(/^[0-9A-Fa-f]+$/)
		) {
			custom_start = parseInt(document.urajijo_nes.custom_start.value, 16);
			custom_end = parseInt(document.urajijo_nes.custom_end.value, 16);
			custom_min = parseInt(document.urajijo_nes.custom_min.value, 16);
			custom_max = parseInt(document.urajijo_nes.custom_max.value, 16);
		} else {
			errorOut.error("カスタム：各項目には16進数を入力してください。");
			custom_num = 0;
		}

		if (custom_start > custom_end) {
			var tmp_o = custom_start;
			custom_start = custom_end;
			custom_end = tmp_o;
		}

		if (custom_min > custom_max) {
			var tmp_t = custom_min;
			custom_min = custom_max;
			custom_max = tmp_t;
		}

		if (code_type == "VirtuaNES") { // VirtuaNESコードか否か
			if (custom_start > 0xFFFF || custom_end > 0xFFFF) {
				errorOut.error("カスタム：アドレスの範囲がFFFFを超えています。");
				custom_num = 0;
			}
		} else {
			if (custom_start > 0x2FFFF || custom_end > 0x2FFFF) {
				errorOut.error("カスタム：アドレスの範囲が2FFFFを超えています。");
				custom_num = 0;
			}
		}

		if (custom_min > 0xFF || custom_max > 0xFF) {
			errorOut.error("カスタム：データの範囲がFFを超えています。");
			custom_num = 0;
		}

		var custom_num_limit = custom_end - custom_start + 1;
		if (custom_num > custom_num_limit) {
			errorOut.warn("カスタム：コードの数が" + custom_num_limit + "個に制限されます。");
			custom_num = custom_num_limit;
		}

		var zeropage_codes = generator_core(0x0000, 0x00FF, 0x00, 0xFF, zeropage_num, 1, 1);
		var ram_codes      = generator_core(0x0100, 0x07FF, 0x00, 0xFF, ram_num, 1, 1);
		var sram_codes     = (code_type == "VirtuaNES") ? generator_core(0x6000, 0x7FFF, 0x00, 0xFF, sram_num, 1, 1)
		                                                : generator_core(0x10000, 0x11FFF, 0x00, 0xFF, sram_num, 1, 1);
		var rom_codes      = generator_core(0x8000, 0xFFFF, 0x00, 0xFF, rom_num, 1, 1);
		var exram_codes    = generator_core(0x20000, 0x21FFF, 0x00, 0xFF, exram_num, 1, 1);
		var custom_codes   = generator_core(custom_start, custom_end, custom_min, custom_max, custom_num, 1, 1);

		if (code_type == "VirtuaNES") {
			codes = codes.concat(zeropage_codes, ram_codes, sram_codes, rom_codes, custom_codes);
		} else {
			codes = codes.concat(zeropage_codes, ram_codes, sram_codes, exram_codes, custom_codes);
		}
	}

	var out = "";

	if (code_type == "VirtuaNES") { // VirtuaNESコードか否か
		for (var i = 0; i < codes.length; i++) {
			var addr = codes[i].address.toString(16).toUpperCase();
			var data = codes[i].value.toString(16).toUpperCase();

			while (addr.length < 4) addr = '0' + addr;
			while (data.length < 2) data = '0' + data;

			out += addr + "-01-" + data + '\n';
		}
	} else {
		for (var i = 0; i < codes.length; i++) {
			var addr = codes[i].address.toString(16).toUpperCase();
			var data = codes[i].value.toString(16).toUpperCase();

			while (addr.length < 4) addr = '0' + addr;
			while (data.length < 2) data = '0' + data;

			out += addr + "-1-" + data + '\n';
		}
	}

	document.urajijo_nes.output.value = out;
}

/* SEGA SG-1000/マークIII/Master System/ゲームギア */
function generate_sg(regenerate) {
	var errorOut = new consoleOut(document.getElementById("urajijo-sg-error"));
	errorOut.clear();
	isSupportedBrowser(errorOut);

	var codes = new Array();

	if (regenerate) { // 再生成: アドレスを変えずにコードを再生成
		var regenerate_min = 0x00;
		var regenerate_max = 0x00;

		if (
			document.urajijo_sg.regenerate_min.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_sg.regenerate_max.value.match(/^[0-9A-Fa-f]+$/)
		) {
			regenerate_min = parseInt(document.urajijo_sg.regenerate_min.value, 16);
			regenerate_max = parseInt(document.urajijo_sg.regenerate_max.value, 16);
		} else {
			errorOut.error("再生成：各項目には16進数を入力してください。");
			return;
		}

		if (regenerate_min > regenerate_max) {
			var tmp_t = regenerate_min;
			regenerate_min = regenerate_max;
			regenerate_max = tmp_t;
		}

		var cur_codes = document.urajijo_sg.output.value.match(/^00[0-9A-F]{4}:[0-9A-F]{2}/gm);
		for (var i = 0; i < cur_codes.length; i++) {
			var addr_val = cur_codes[i].match(/^00([0-9A-F]{4}):([0-9A-F]{2})/);

			if (addr_val && addr_val.length == 3) {
				codes.push(new Code(
					parseInt(addr_val[1], 16),
					parseInt(addr_val[2], 16)
				));
			}
		}

		codes = generator_regenerate(codes, regenerate_min, regenerate_max);
	} else {
		// 各コード数
		var sg_ram_num = parseInt(document.urajijo_sg.sg_ram_num.value);
		var mk3_ram_num = parseInt(document.urajijo_sg.mk3_ram_num.value);
		var rom1_num = parseInt(document.urajijo_sg.rom1_num.value);
		var rom2_num = parseInt(document.urajijo_sg.rom2_num.value);

		var custom_start = 0x0000;
		var custom_end = 0x0000;
		var custom_min = 0x00;
		var custom_max = 0x00;
		var custom_num = parseInt(document.urajijo_sg.custom_num.value);

		if (sg_ram_num > 0x400) {
			errorOut.warn("RAM領域（SG-1000）コードの数が" + 0x400 + "個に制限されます。");
			sg_ram_num = 0x400;
		}

		if (mk3_ram_num > 0x2000) {
			errorOut.warn("RAM領域（マークIII・Master System・ゲームギア）コードの数が" + 0x2000 + "個に制限されます。");
			mk3_ram_num = 0x2000;
		}

		if (rom1_num > 0x8000) {
			errorOut.warn("ROM領域1コードの数が" + 0x8000 + "個に制限されます。");
			rom1_num = 0x8000;
		}

		if (rom2_num > 0x4000) {
			errorOut.warn("ROM領域2コードの数が" + 0x4000 + "個に制限されます。");
			rom2_num = 0x4000;
		}

		if (
			document.urajijo_sg.custom_start.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_sg.custom_end.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_sg.custom_min.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_sg.custom_max.value.match(/^[0-9A-Fa-f]+$/)
		) {
			custom_start = parseInt(document.urajijo_sg.custom_start.value, 16);
			custom_end = parseInt(document.urajijo_sg.custom_end.value, 16);
			custom_min = parseInt(document.urajijo_sg.custom_min.value, 16);
			custom_max = parseInt(document.urajijo_sg.custom_max.value, 16);
		} else {
			errorOut.error("カスタム：各項目には16進数を入力してください。");
			custom_num = 0;
		}

		if (custom_start > custom_end) {
			var tmp_o = custom_start;
			custom_start = custom_end;
			custom_end = tmp_o;
		}

		if (custom_min > custom_max) {
			var tmp_t = custom_min;
			custom_min = custom_max;
			custom_max = tmp_t;
		}

		if (custom_start > 0xFFFF || custom_end > 0xFFFF) {
			errorOut.error("カスタム：アドレスの範囲がFFFFを超えています。");
			custom_num = 0;
		}

		if (custom_min > 0xFF || custom_max > 0xFF) {
			errorOut.error("カスタム：データの範囲がFFを超えています。");
			custom_num = 0;
		}

		var custom_num_limit = custom_end - custom_start + 1;
		if (custom_num > custom_num_limit) {
			errorOut.warn("カスタム：コードの数が" + custom_num_limit + "個に制限されます。");
			custom_num = custom_num_limit;
		}

		codes = codes.concat(generator_core(0xC000, 0xC3FF, 0x00, 0xFF, sg_ram_num, 1, 1));
		codes = codes.concat(generator_core(0xC000, 0xDFFF, 0x00, 0xFF, mk3_ram_num, 1, 1));
		codes = codes.concat(generator_core(0x0000, 0x7FFF, 0x00, 0xFF, rom1_num, 1, 1));
		codes = codes.concat(generator_core(0x8000, 0xBFFF, 0x00, 0xFF, rom2_num, 1, 1));
		codes = codes.concat(generator_core(custom_start, custom_end, custom_min, custom_max, custom_num, 1, 1));
	}

	var out = "";

	for (var i = 0; i < codes.length; i++) {
		var addr = codes[i].address.toString(16).toUpperCase();
		var data = codes[i].value.toString(16).toUpperCase();

		while (addr.length < 4) addr = '0' + addr;
		while (data.length < 2) data = '0' + data;

		out += "00" + addr + ':' + data + '\n';
	}

	document.urajijo_sg.output.value = out;
}

/* ゲームボーイ (カラー) */
function generate_gb(regenerate) {
	var errorOut = new consoleOut(document.getElementById("urajijo-gb-error"));
	errorOut.clear();
	isSupportedBrowser(errorOut);

	var codes = new Array();

	if (regenerate) { // 再生成: アドレスを変えずにコードを再生成
		var regenerate_min = 0x00;
		var regenerate_max = 0x00;

		if (
			document.urajijo_gb.regenerate_min.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_gb.regenerate_max.value.match(/^[0-9A-Fa-f]+$/)
		) {
			regenerate_min = parseInt(document.urajijo_gb.regenerate_min.value, 16);
			regenerate_max = parseInt(document.urajijo_gb.regenerate_max.value, 16);
		} else {
			errorOut.error("再生成：各項目には16進数を入力してください。");
			return;
		}

		if (regenerate_min > regenerate_max) {
			var tmp_t = regenerate_min;
			regenerate_min = regenerate_max;
			regenerate_max = tmp_t;
		}

		var cur_codes = document.urajijo_gb.output.value.match(/^[0-9A-F]{2}[0-9A-F]{2}[0-9A-F]{2}[0-9A-F]{2}/gm);
		for (var i = 0; i < cur_codes.length; i++) {
			var addr_val = cur_codes[i].match(/^([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})/);

			if (addr_val && addr_val.length == 5) {
				codes.push(new Code(
					parseInt(addr_val[1]+addr_val[4]+addr_val[3], 16),
					parseInt(addr_val[2], 16)
				));
			}
		}

		codes = generator_regenerate(codes, regenerate_min, regenerate_max);
	} else {
		// 各コード数
		var ram_num = parseInt(document.urajijo_gb.ram_num.value);
		var cram_num = parseInt(document.urajijo_gb.cram_num.value);
		var hram_num = parseInt(document.urajijo_gb.hram_num.value);
		var rom_num = parseInt(document.urajijo_gb.rom_num.value);

		var custom_start_hi = 0x00;
		var custom_start_lo = 0x0000;
		var custom_end_hi = 0x00;
		var custom_end_lo = 0x0000;
		var custom_min = 0x00;
		var custom_max = 0x00;
		var custom_num = parseInt(document.urajijo_gb.custom_num.value);

		if (ram_num > 0x1000) {
			errorOut.warn("RAM領域コードの数が" + 0x1000 + "個に制限されます。");
			ram_num = 0x1000;
		}

		if (cram_num > 0x7000) {
			errorOut.warn("カラー拡張RAM領域コードの数が" + 0x7000 + "個に制限されます。");
			cram_num = 0x7000;
		}

		if (hram_num > 0x80) {
			errorOut.warn("HRAM領域コードの数が" + 0x80 + "個に制限されます。");
			hram_num = 0x80;
		}

		if (rom_num > 0x8000) {
			errorOut.warn("ROM領域コードの数が" + 0x8000 + "個に制限されます。");
			rom_num = 0x8000;
		}

		if (
			document.urajijo_gb.custom_start_hi.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_gb.custom_start_lo.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_gb.custom_end_hi.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_gb.custom_end_lo.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_gb.custom_min.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_gb.custom_max.value.match(/^[0-9A-Fa-f]+$/)
		) {
			custom_start_hi = parseInt(document.urajijo_gb.custom_start_hi.value, 16);
			custom_start_lo = parseInt(document.urajijo_gb.custom_start_lo.value, 16);
			custom_end_hi = parseInt(document.urajijo_gb.custom_end_hi.value, 16);
			custom_end_lo = parseInt(document.urajijo_gb.custom_end_lo.value, 16);
			custom_min = parseInt(document.urajijo_gb.custom_min.value, 16);
			custom_max = parseInt(document.urajijo_gb.custom_max.value, 16);
		} else {
			errorOut.error("カスタム：各項目には16進数を入力してください。");
			custom_num = 0;
		}

		if (custom_start_hi > custom_end_hi) {
			var tmp_hi = custom_start_hi;
			custom_start_hi = custom_end_hi;
			custom_end_hi = tmp_hi;
		}

		if (custom_start_lo > custom_end_lo) {
			var tmp_lo = custom_start_lo;
			custom_start_lo = custom_end_lo;
			custom_end_lo = tmp_lo;
		}

		if (custom_min > custom_max) {
			var tmp_t = custom_min;
			custom_min = custom_max;
			custom_max = tmp_t;
		}

		var custom_start = custom_start_hi * 0x10000 + custom_start_lo;
		var custom_end = custom_end_hi * 0x10000 + custom_end_lo;

		if (custom_start > 0xFFFFFF || custom_end > 0xFFFFFF) {
			errorOut.error("カスタム：アドレスの範囲がFF:FFFFを超えています。");
			custom_num = 0;
		}

		if (custom_min > 0xFF || custom_max > 0xFF) {
			errorOut.error("カスタム：データの範囲がFFを超えています。");
			custom_num = 0;
		}

		var custom_num_limit = (custom_end_hi - custom_start_hi + 1) * (custom_end_lo - custom_start_lo + 1);
		if (custom_num > custom_num_limit) {
			errorOut.warn("カスタム：コードの数が" + custom_num_limit + "個に制限されます。");
			custom_num = custom_num_limit;
		}

		codes = codes.concat(generator_core(0x01C000, 0x01CFFF, 0x00, 0xFF, ram_num, 0x10000, 1));
		codes = codes.concat(generator_core(0x91D000, 0x97DFFF, 0x00, 0xFF, cram_num, 0x10000, 1));
		codes = codes.concat(generator_core(0x01FF80, 0x01FFFF, 0x00, 0xFF, hram_num, 0x10000, 1));
		codes = codes.concat(generator_core(0x010000, 0x017FFF, 0x00, 0xFF, rom_num, 0x10000, 1));
		codes = codes.concat(generator_core(custom_start, custom_end, custom_min, custom_max, custom_num, 0x10000, 1));
	}

	var out = "";

	for (var i = 0; i < codes.length; i++) {
		var addr = codes[i].address.toString(16).toUpperCase();
		var data = codes[i].value.toString(16).toUpperCase();

		while (addr.length < 6) addr = '0' + addr;
		while (data.length < 2) data = '0' + data;

		out += addr.substring(0, 2) + data + addr.substring(4, 6) + addr.substring(2, 4) + '\n';
	}

	document.urajijo_gb.output.value = out;
}

/* スーパーファミコン/Super Nintendo Entertainment System */
function generate_snes(regenerate) {
	var errorOut = new consoleOut(document.getElementById("urajijo-snes-error"));
	errorOut.clear();
	isSupportedBrowser(errorOut);

	var codes = new Array();

	if (regenerate) { // 再生成: アドレスを変えずにコードを再生成
		var regenerate_min = 0x00;
		var regenerate_max = 0x00;

		if (
			document.urajijo_snes.regenerate_min.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_snes.regenerate_max.value.match(/^[0-9A-Fa-f]+$/)
		) {
			regenerate_min = parseInt(document.urajijo_snes.regenerate_min.value, 16);
			regenerate_max = parseInt(document.urajijo_snes.regenerate_max.value, 16);
		} else {
			errorOut.error("再生成：各項目には16進数を入力してください。");
			return;
		}

		if (regenerate_min > regenerate_max) {
			var tmp_t = regenerate_min;
			regenerate_min = regenerate_max;
			regenerate_max = tmp_t;
		}

		var cur_codes = document.urajijo_snes.output.value.match(/^[0-9A-F]{6}[0-9A-F]{2}/gm);
		for (var i = 0; i < cur_codes.length; i++) {
			var addr_val = cur_codes[i].match(/^([0-9A-F]{6})([0-9A-F]{2})/);

			if (addr_val && addr_val.length == 3) {
				codes.push(new Code(
					parseInt(addr_val[1], 16),
					parseInt(addr_val[2], 16)
				));
			}
		}

		codes = generator_regenerate(codes, regenerate_min, regenerate_max);
	} else {
		// 各コード数
		var ram_num = parseInt(document.urajijo_snes.ram_num.value);

		var custom_start_hi = 0x00;
		var custom_start_lo = 0x0000;
		var custom_end_hi = 0x00;
		var custom_end_lo = 0x0000;
		var custom_min = 0x00;
		var custom_max = 0x00;
		var custom_num = parseInt(document.urajijo_snes.custom_num.value);

		if (ram_num > 0x20000) {
			errorOut.warn("RAM領域コードの数が" + 0x20000 + "個に制限されます。");
			ram_num = 0x20000;
		}

		if (
			document.urajijo_snes.custom_start_hi.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_snes.custom_start_lo.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_snes.custom_end_hi.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_snes.custom_end_lo.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_snes.custom_min.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_snes.custom_max.value.match(/^[0-9A-Fa-f]+$/)
		) {
			custom_start_hi = parseInt(document.urajijo_snes.custom_start_hi.value, 16);
			custom_start_lo = parseInt(document.urajijo_snes.custom_start_lo.value, 16);
			custom_end_hi = parseInt(document.urajijo_snes.custom_end_hi.value, 16);
			custom_end_lo = parseInt(document.urajijo_snes.custom_end_lo.value, 16);
			custom_min = parseInt(document.urajijo_snes.custom_min.value, 16);
			custom_max = parseInt(document.urajijo_snes.custom_max.value, 16);
		} else {
			errorOut.error("カスタム：各項目には16進数を入力してください。");
			custom_num = 0;
		}

		if (custom_start_hi > custom_end_hi) {
			var tmp_hi = custom_start_hi;
			custom_start_hi = custom_end_hi;
			custom_end_hi = tmp_hi;
		}

		if (custom_start_lo > custom_end_lo) {
			var tmp_lo = custom_start_lo;
			custom_start_lo = custom_end_lo;
			custom_end_lo = tmp_lo;
		}

		if (custom_min > custom_max) {
			var tmp_t = custom_min;
			custom_min = custom_max;
			custom_max = tmp_t;
		}

		var custom_start = custom_start_hi * 0x10000 + custom_start_lo;
		var custom_end = custom_end_hi * 0x10000 + custom_end_lo;

		if (custom_start > 0xFFFFFF || custom_end > 0xFFFFFF) {
			errorOut.error("カスタム：アドレスの範囲がFF:FFFFを超えています。");
			custom_num = 0;
		}

		if (custom_min > 0xFF || custom_max > 0xFF) {
			errorOut.error("カスタム：データの範囲がFFを超えています。");
			custom_num = 0;
		}

		var custom_num_limit = (custom_end_hi - custom_start_hi + 1) * (custom_end_lo - custom_start_lo + 1);
		if (custom_num > custom_num_limit) {
			errorOut.warn("カスタム：コードの数が" + custom_num_limit + "個に制限されます。");
			custom_num = custom_num_limit;
		}

		codes = codes.concat(generator_core(0x7E0000, 0x7FFFFF, 0x00, 0xFF, ram_num, 0x10000, 1));
		codes = codes.concat(generator_core(custom_start, custom_end, custom_min, custom_max, custom_num, 0x10000, 1));
	}

	var out = "";

	for (var i = 0; i < codes.length; i++) {
		var addr = codes[i].address.toString(16).toUpperCase();
		var data = codes[i].value.toString(16).toUpperCase();

		while (addr.length < 6) addr = '0' + addr;
		while (data.length < 2) data = '0' + data;

		out += addr + data + '\n';
	}

	document.urajijo_snes.output.value = out;
}

/* メガドライブ/Genesis */
function generate_md(regenerate) {
	var errorOut = new consoleOut(document.getElementById("urajijo-md-error"));
	errorOut.clear();
	isSupportedBrowser(errorOut);

	var codes = new Array();

	if (regenerate) { // 再生成: アドレスを変えずにコードを再生成
		var regenerate_min = 0x00;
		var regenerate_max = 0x00;

		if (
			document.urajijo_md.regenerate_min.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_md.regenerate_max.value.match(/^[0-9A-Fa-f]+$/)
		) {
			regenerate_min = parseInt(document.urajijo_md.regenerate_min.value, 16);
			regenerate_max = parseInt(document.urajijo_md.regenerate_max.value, 16);
		} else {
			errorOut.error("再生成：各項目には16進数を入力してください。");
			return;
		}

		if (regenerate_min > regenerate_max) {
			var tmp_t = regenerate_min;
			regenerate_min = regenerate_max;
			regenerate_max = tmp_t;
		}

		var cur_codes = document.urajijo_md.output.value.match(/^[0-9A-F]{6}:[0-9A-F]{2}/gm);
		for (var i = 0; i < cur_codes.length; i++) {
			var addr_val = cur_codes[i].match(/^([0-9A-F]{6}):([0-9A-F]{2})/);

			if (addr_val && addr_val.length == 3) {
				codes.push(new Code(
					parseInt(addr_val[1], 16),
					parseInt(addr_val[2], 16)
				));
			}
		}

		codes = generator_regenerate(codes, regenerate_min, regenerate_max);
	} else {
		// 各コード数
		var m68k_ram_num = parseInt(document.urajijo_md.m68k_ram_num.value);
		var mcd_pram_num = parseInt(document.urajijo_md.mcd_pram_num.value);
		var mcd_wram_num = parseInt(document.urajijo_md.mcd_wram_num.value);
		var z80_ram_num = parseInt(document.urajijo_md.z80_ram_num.value);
		var rom_num = parseInt(document.urajijo_md.rom_num.value);

		var custom_start = 0x000000;
		var custom_end = 0x000000;
		var custom_min = 0x00;
		var custom_max = 0x00;
		var custom_num = parseInt(document.urajijo_md.custom_num.value);

		if (m68k_ram_num > 0x10000) {
			errorOut.warn("68k RAM領域コードの数が" + 0x10000 + "個に制限されます。");
			m68k_ram_num = 0x10000;
		}

		if (mcd_pram_num > 0x1FFFF) {
			errorOut.warn("メガCD PRAM領域コードの数が" + 0x1FFFF + "個に制限されます。");
			mcd_pram_num = 0x1FFFF;
		}

		if (mcd_wram_num > 0x3FFFF) {
			errorOut.warn("メガCD WRAM領域コードの数が" + 0x3FFFF + "個に制限されます。");
			mcd_wram_num = 0x3FFFF;
		}

		if (z80_ram_num > 0x4000) {
			errorOut.warn("Z80 RAM領域コードの数が" + 0x4000 + "個に制限されます。");
			z80_ram_num = 0x4000;
		}

		if (rom_num > 0x400000) {
			errorOut.warn("カートリッジROM/RAM領域コードの数が" + 0x400000 + "個に制限されます。");
			rom_num = 0x400000;
		}

		if (
			document.urajijo_md.custom_start.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_md.custom_end.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_md.custom_min.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_md.custom_max.value.match(/^[0-9A-Fa-f]+$/)
		) {
			custom_start = parseInt(document.urajijo_md.custom_start.value, 16);
			custom_end = parseInt(document.urajijo_md.custom_end.value, 16);
			custom_min = parseInt(document.urajijo_md.custom_min.value, 16);
			custom_max = parseInt(document.urajijo_md.custom_max.value, 16);
		} else {
			errorOut.error("カスタム：各項目には16進数を入力してください。");
			custom_num = 0;
		}

		if (custom_start > custom_end) {
			var tmp_o = custom_start;
			custom_start = custom_end;
			custom_end = tmp_o;
		}

		if (custom_min > custom_max) {
			var tmp_t = custom_min;
			custom_min = custom_max;
			custom_max = tmp_t;
		}

		if (custom_start > 0xFFFFFF || custom_end > 0xFFFFFF) {
			errorOut.error("カスタム：アドレスの範囲がFFFFFFを超えています。");
			custom_num = 0;
		}

		if (custom_min > 0xFF || custom_max > 0xFF) {
			errorOut.error("カスタム：データの範囲がFFを超えています。");
			custom_num = 0;
		}

		var custom_num_limit = custom_end - custom_start + 1;
		if (custom_num > custom_num_limit) {
			errorOut.warn("カスタム：コードの数が" + custom_num_limit + "個に制限されます。");
			custom_num = custom_num_limit;
		}

		codes = codes.concat(generator_core(0xFF0000, 0xFFFFFF, 0x00, 0xFF, m68k_ram_num, 1, 1));
		codes = codes.concat(generator_core(0x020000, 0x03FFFF, 0x00, 0xFF, mcd_pram_num, 1, 1));
		codes = codes.concat(generator_core(0x200000, 0x23FFFF, 0x00, 0xFF, mcd_wram_num, 1, 1));
		codes = codes.concat(generator_core(0xA00000, 0xA01FFF, 0x00, 0xFF, z80_ram_num, 1, 1));
		codes = codes.concat(generator_core(0x000000, 0x3FFFFF, 0x00, 0xFF, rom_num, 1, 1));
		codes = codes.concat(generator_core(custom_start, custom_end, custom_min, custom_max, custom_num, 1, 1));
	}

	var out = "";

	for (var i = 0; i < codes.length; i++) {
		var addr = codes[i].address.toString(16).toUpperCase();
		var data = codes[i].value.toString(16).toUpperCase();

		while (addr.length < 6) addr = '0' + addr;
		while (data.length < 2) data = '0' + data;

		// TODO: 16-bit code (AAAAAA:DDDD)
		out += addr + ':' + data + '\n';
	}

	document.urajijo_md.output.value = out;
}

/* ゲームボーイアドバンス */
function generate_gba(regenerate) {
	var errorOut = new consoleOut(document.getElementById("urajijo-gba-error"));
	errorOut.clear();
	isSupportedBrowser(errorOut);

	var codes = new Array();

	if (regenerate) { // 再生成: アドレスを変えずにコードを再生成
		var regenerate_min = 0x00;
		var regenerate_max = 0x00;

		if (
			document.urajijo_gba.regenerate_min.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_gba.regenerate_max.value.match(/^[0-9A-Fa-f]+$/)
		) {
			regenerate_min = parseInt(document.urajijo_gba.regenerate_min.value, 16);
			regenerate_max = parseInt(document.urajijo_gba.regenerate_max.value, 16);
		} else {
			errorOut.error("再生成：各項目には16進数を入力してください。");
			return;
		}

		if (regenerate_min > regenerate_max) {
			var tmp_t = regenerate_min;
			regenerate_min = regenerate_max;
			regenerate_max = tmp_t;
		}

		var cur_codes = document.urajijo_gba.output.value.match(/^[0-9A-F]{8}:[0-9A-F]{2}/gm);
		for (var i = 0; i < cur_codes.length; i++) {
			var addr_val = cur_codes[i].match(/^([0-9A-F]{8}):([0-9A-F]{2})/);

			if (addr_val && addr_val.length == 3) {
				codes.push(new Code(
					parseInt(addr_val[1], 16),
					parseInt(addr_val[2], 16)
				));
			}
		}

		codes = generator_regenerate(codes, regenerate_min, regenerate_max);
	} else {
		// 各コード数
		var iwram_num = parseInt(document.urajijo_gba.iwram_num.value);
		var ewram_num = parseInt(document.urajijo_gba.ewram_num.value);
		var rom_num = parseInt(document.urajijo_gba.rom_num.value);

		var custom_start = 0x00000000;
		var custom_end = 0x00000000;
		var custom_min = 0x00;
		var custom_max = 0x00;
		var custom_num = parseInt(document.urajijo_gba.custom_num.value);

		if (
			document.urajijo_gba.custom_start.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_gba.custom_end.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_gba.custom_min.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_gba.custom_max.value.match(/^[0-9A-Fa-f]+$/)
		) {
			custom_start = parseInt(document.urajijo_gba.custom_start.value, 16);
			custom_end = parseInt(document.urajijo_gba.custom_end.value, 16);
			custom_min = parseInt(document.urajijo_gba.custom_min.value, 16);
			custom_max = parseInt(document.urajijo_gba.custom_max.value, 16);
		} else {
			errorOut.error("カスタム：各項目には16進数を入力してください。");
			custom_num = 0;
		}

		if (custom_start > custom_end) {
			var tmp_o = custom_start;
			custom_start = custom_end;
			custom_end = tmp_o;
		}

		if (custom_min > custom_max) {
			var tmp_t = custom_min;
			custom_min = custom_max;
			custom_max = tmp_t;
		}

		if (custom_start > 0xFFFFFFFF || custom_end > 0xFFFFFFFF) {
			errorOut.error("カスタム：アドレスの範囲がFFFFFFFFを超えています。");
			custom_num = 0;
		}

		if (custom_min > 0xFF || custom_max > 0xFF) {
			errorOut.error("カスタム：データの範囲がFFを超えています。");
			custom_num = 0;
		}

		codes = codes.concat(generator_core(0x03000000, 0x03007FFF, 0x00, 0xFF, iwram_num, 1, 1));
		codes = codes.concat(generator_core(0x02000000, 0x0203FFFF, 0x00, 0xFF, ewram_num, 1, 1));
		codes = codes.concat(generator_core(0x08000000, 0x09FFFFFF, 0x00, 0xFF, rom_num, 1, 1));
		codes = codes.concat(generator_core(custom_start, custom_end, custom_min, custom_max, custom_num, 1, 1));
	}

	var out = "";

	for (var i = 0; i < codes.length; i++) {
		var addr = codes[i].address.toString(16).toUpperCase();
		var data = codes[i].value.toString(16).toUpperCase();

		while (addr.length < 8) addr = '0' + addr;
		while (data.length < 2) data = '0' + data;

		// TODO: 16-bit code (0AAAAAAA:DDDD)
		// TODO: 32-bit code (0AAAAAAA:DDDDDDDD)
		out += addr + ':' + data + '\n';
	}

	document.urajijo_gba.output.value = out;
}

/* 汎用コード生成 */
function generate_usa(regenerate) {
	var errorOut = new consoleOut(document.getElementById("urajijo-usa-error"));
	errorOut.clear();
	isSupportedBrowser(errorOut);

	var addr_digit = parseInt(document.urajijo_usa.addr_digit.value);
	var separator = document.urajijo_usa.separator.value;
	var data_digit = parseInt(document.urajijo_usa.data_digit.value);

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

	var codes = new Array();

	if (regenerate) { // 再生成: アドレスを変えずにコードを再生成
		var regenerate_min = 0x00;
		var regenerate_max = 0x00;

		if (
			document.urajijo_usa.regenerate_min.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_usa.regenerate_max.value.match(/^[0-9A-Fa-f]+$/)
		) {
			regenerate_min = parseInt(document.urajijo_usa.regenerate_min.value, 16);
			regenerate_max = parseInt(document.urajijo_usa.regenerate_max.value, 16);
		} else {
			errorOut.error("再生成：各項目には16進数を入力してください。");
			return;
		}

		if (regenerate_min > data_limit || regenerate_max > data_limit) {
			errorOut.error("再生成：データの範囲が" + data_limit.toString(16).toUpperCase() + "を超えています。");
			return;
		}

		if (regenerate_min > regenerate_max) {
			var tmp_t = regenerate_min;
			regenerate_min = regenerate_max;
			regenerate_max = tmp_t;
		}

		var addr_str = "[0-9A-F]{" + addr_digit + "}";
		var data_str = "[0-9A-F]{" + data_digit + "}";

		var codes_check = new RegExp("^" + addr_str + ".*" + data_str + "$", "gm");
		var codes_parse = new RegExp("^(" + addr_str + ").*(" + data_str + ")$");

		var cur_codes = document.urajijo_usa.output.value.match(codes_check);
		for (var i = 0; i < cur_codes.length; i++) {
			var addr_val = cur_codes[i].match(codes_parse);

			if (addr_val && addr_val.length == 3) {
				codes.push(new Code(
					parseInt(addr_val[1], 16),
					parseInt(addr_val[2], 16)
				));
			}
		}

		codes = generator_regenerate(codes, regenerate_min, regenerate_max);
	} else {
		var align = parseInt(document.urajijo_usa.align.value);

		if (!(align == 1 || align == 2 || align == 4)) {
			errorOut.error("アドレス境界は1、2、又は4を入力して下さい。");
			return;
		}

		// 各コード数
		var area1_start = 0x00000000;
		var area1_end = 0x00000000;
		var area1_min = 0x00;
		var area1_max = 0x00;
		var area1_num = parseInt(document.urajijo_usa.area1_num.value);

		var area2_start = 0x00000000;
		var area2_end = 0x00000000;
		var area2_min = 0x00;
		var area2_max = 0x00;
		var area2_num = parseInt(document.urajijo_usa.area2_num.value);

		var area3_start = 0x00000000;
		var area3_end = 0x00000000;
		var area3_min = 0x00;
		var area3_max = 0x00;
		var area3_num = parseInt(document.urajijo_usa.area3_num.value);

		if (
			document.urajijo_usa.area1_start.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_usa.area1_end.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_usa.area1_min.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_usa.area1_max.value.match(/^[0-9A-Fa-f]+$/)
		) {
			area1_start = parseInt(document.urajijo_usa.area1_start.value, 16);
			area1_end = parseInt(document.urajijo_usa.area1_end.value, 16);
			area1_min = parseInt(document.urajijo_usa.area1_min.value, 16);
			area1_max = parseInt(document.urajijo_usa.area1_max.value, 16);
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

		if (
			document.urajijo_usa.area2_start.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_usa.area2_end.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_usa.area2_min.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_usa.area2_max.value.match(/^[0-9A-Fa-f]+$/)
		) {
			area2_start = parseInt(document.urajijo_usa.area2_start.value, 16);
			area2_end = parseInt(document.urajijo_usa.area2_end.value, 16);
			area2_min = parseInt(document.urajijo_usa.area2_min.value, 16);
			area2_max = parseInt(document.urajijo_usa.area2_max.value, 16);
		} else {
			errorOut.error("領域2：各項目には16進数を入力してください。");
			area2_num = 0;
		}

		if (area2_start > area2_end) {
			var tmp_o = area2_start;
			area2_start = area2_end;
			area2_end = tmp_o;
		}

		if (area2_min > area2_max) {
			var tmp_t = area2_min;
			area2_min = area2_max;
			area2_max = tmp_t;
		}

		if (area2_start > addr_limit || area2_start > addr_limit) {
			errorOut.error("領域2：アドレスの範囲が" + addr_limit.toString(16).toUpperCase() + "を超えています。");
			area2_num = 0;
		}

		if (area2_min > data_limit || area2_max > data_limit) {
			errorOut.error("領域2：データの範囲が" + data_limit.toString(16).toUpperCase() + "を超えています。");
			area2_num = 0;
		}

		var area2_num_limit = Math.floor((area2_end - area2_start + align) / align);
		if (area2_num > area2_num_limit) {
			errorOut.warn("領域2：コードの数が" + area2_num_limit + "個に制限されます。");
			area2_num = area2_num_limit;
		}

		if (
			document.urajijo_usa.area3_start.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_usa.area3_end.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_usa.area3_min.value.match(/^[0-9A-Fa-f]+$/) &&
			document.urajijo_usa.area3_max.value.match(/^[0-9A-Fa-f]+$/)
		) {
			area3_start = parseInt(document.urajijo_usa.area3_start.value, 16);
			area3_end = parseInt(document.urajijo_usa.area3_end.value, 16);
			area3_min = parseInt(document.urajijo_usa.area3_min.value, 16);
			area3_max = parseInt(document.urajijo_usa.area3_max.value, 16);
		} else {
			errorOut.error("領域3：各項目には16進数を入力してください。");
			area3_num = 0;
		}

		if (area3_start > area3_end) {
			var tmp_o = area3_start;
			area3_start = area3_end;
			area3_end = tmp_o;
		}

		if (area3_min > area3_max) {
			var tmp_t = area3_min;
			area3_min = area3_max;
			area3_max = tmp_t;
		}

		if (area3_start > addr_limit || area3_start > addr_limit) {
			errorOut.error("領域3：アドレスの範囲が" + addr_limit.toString(16).toUpperCase() + "を超えています。");
			area3_num = 0;
		}

		if (area3_min > data_limit || area3_max > data_limit) {
			errorOut.error("領域3：データの範囲が" + data_limit.toString(16).toUpperCase() + "を超えています。");
			area3_num = 0;
		}

		var area3_num_limit = Math.floor((area3_end - area3_start + align) / align);
		if (area3_num > area3_num_limit) {
			errorOut.warn("領域3：コードの数が" + area3_num_limit + "個に制限されます。");
			area3_num = area3_num_limit;
		}

		codes = codes.concat(generator_core(area1_start, area1_end, area1_min, area1_max, area1_num, 1, align));
		codes = codes.concat(generator_core(area2_start, area2_end, area2_min, area2_max, area2_num, 1, align));
		codes = codes.concat(generator_core(area3_start, area3_end, area3_min, area3_max, area3_num, 1, align));
	}

	var out = "";

	for (var i = 0; i < codes.length; i++) {
		var addr = codes[i].address.toString(16).toUpperCase();
		var data = codes[i].value.toString(16).toUpperCase();

		while (addr.length < addr_digit) addr = '0' + addr;
		while (data.length < data_digit) data = '0' + data;

		out += addr;
		out += separator;
		out += data;
		out += '\n';
	}

	document.urajijo_usa.output.value = out;
}

/* 16進数 */
function generate_hex() {
	var errorOut = new consoleOut(document.getElementById("urajijo-hex-error"));
	errorOut.clear();
	isSupportedBrowser(errorOut);

	// TODO: 値を重複させないオプションを付ける
	var unique = false;

	// 各コード数
	var num = parseInt(document.urajijo_hex.num.value);
	var digit = parseInt(document.urajijo_hex.digit.value);

	var min = 0x00000000;
	var max = 0x00000000;

	if (
		document.urajijo_hex.min.value.match(/^[0-9A-Fa-f]+$/) &&
		document.urajijo_hex.max.value.match(/^[0-9A-Fa-f]+$/)
	) {
		min = parseInt(document.urajijo_hex.min.value, 16);
		max = parseInt(document.urajijo_hex.max.value, 16);
	} else {
		errorOut.error("各項目には16進数を入力してください。");
		num = 0;
	}

	if (min > max) {
		var tmp_t = min;
		min = max;
		max = tmp_t;
	}

	if (digit > 8) {
		errorOut.error("9桁以上の生成には対応していません。");
		return;
	}

	if (unique && (max - min + 1) > num) {
		errorOut.error("生成数が多すぎて重複を排除できません。\n生成数を" + (max - min + 1) + "個以下にしてください。");
		return;
	}

	if (min >= Math.pow(16, digit) || max >= Math.pow(16, digit)) {
		errorOut.error("データの範囲が" + (Math.pow(16, digit) - 1).toString(16).toUpperCase() + "を超えています。");
		return;
	}

	var out = "";

	var codes = generator_core(min, max, min, max, num, 1, 1);

	// TODO: 値を重複させないオプションを付ける
	if (unique) {
		for (var i = 0; i < codes.length; i++) {
			var data = codes[i].address.toString(16).toUpperCase();

			while (data.length < digit) data = '0' + data;

			out += data + "\n";
		}
	} else {
		for (var i = 0; i < codes.length; i++) {
			var data = codes[i].value.toString(16).toUpperCase();

			while (data.length < digit) data = '0' + data;

			out += data + "\n";
		}
	}

	document.urajijo_hex.output.value = out;
}

/* ベンチマーク */
function generate_bench() {
	var errorOut = new consoleOut(document.getElementById("urajijo-bench-error"));
	errorOut.clear();
	isSupportedBrowser(errorOut);

	// 各コード数
	var num = parseInt(document.urajijo_bench.num.value);

	var startTime = new Date();

	var codes = generator_core(0x00000000, 0xFFFFFFFF, 0x00, 0xFF, num, 1, 1);

	var out = "";

	for (var i = 0; i < codes.length; i++) {
		var addr = codes[i].address.toString(16).toUpperCase();
		var data = codes[i].value.toString(16).toUpperCase();

		while (addr.length < 8) addr = '0' + addr;
		while (data.length < 2) data = '0' + data;

		out += addr + '-' + data + '\n';
	}

	document.urajijo_bench.output.value = out;

	var finishTime = new Date();

	var tookTime = (finishTime - startTime) / 1000;
	var tookTimeStr = "";
	if (tookTime >= 3600) {
		tookTimeStr += Math.floor(tookTime / 3600) + "時間";
	}
	if (tookTime >= 60) {
		tookTimeStr += Math.floor((tookTime / 60) % 60) + "分";
	}

	tookTimeStr += Math.floor(tookTime % 60) + "." + Math.floor((tookTime * 10) % 10) + "秒";

	errorOut.info("所要時間：約" + tookTimeStr);
}
