/* 生成センター v2.0 (201x/xx/xx) WebWorkerを利用して作りなおす (予定) */

/* 生成コア部分 */
function Code(address, value) {
	this.address = address;
	this.value = value;
}

function compare_Code(a, b) {
	return a.address - b.address;
}

/* TODO: 複数領域への対応 */
self.addEventListener('message', function (event) {
	var addr_start = event.data.address.start;
	var addr_end = event.data.address.end;
	var val_min = event.data.value.min;
	var val_max = event.data.value.max;
	var count = event.data.count;
	var mul = event.data.mul;
	var align = event.data.align;

	var codes = new Array();

	var hi_align = Math.max(1, Math.floor(align / mul));
	var lo_align = Math.max(1, align % mul);

	var hi_start = Math.floor(addr_start / mul);
	var hi_length = Math.floor((Math.floor(addr_end / mul) - Math.floor(addr_start / mul) + hi_align) / hi_align) * hi_align;

	var lo_start = addr_start % mul;
	var lo_length = Math.floor((addr_end % mul - addr_start % mul + lo_align) / lo_align) * lo_align;

	var length = hi_length * lo_length;

	var k = 0;
	var total = (count + 1) * count / 2;
	var old_prog = 0;

	for (var i = 0; i < count; i++, k++) {
		var rand_addr = Math.floor(length * Math.random());
		rand_addr = Math.floor(rand_addr / lo_length) * mul + rand_addr % lo_length;
		rand_addr += hi_start * mul + lo_start;

		var rand_val = Math.floor(val_min + (val_max - val_min + 1) * Math.random());

		for (var j = 0; j < codes.length; j++, k++) {
			if (rand_addr >= codes[j].address) {
				var addr_hi = Math.floor(rand_addr / mul);
				var addr_lo = rand_addr % mul - lo_start;

				addr_lo += align;

				if (addr_lo >= lo_length) {
					addr_hi += Math.floor(addr_lo / lo_length);
					addr_lo = addr_lo % lo_length;
				}

				rand_addr = addr_hi * mul + addr_lo + lo_start;
			} else {
				k += i - j - 1;
				break;
			}
		}

		codes.splice(j, 0, new Code(rand_addr, rand_val));
		length -= align;

		var prog = (k + 1) / total;

		// 0.1%毎にMessageを投げる
		if (Math.floor(prog * 1000) > Math.floor(old_prog * 1000))
			postMessage({"completed": false, "progress": prog});

		old_prog = prog;
	}

	postMessage({"completed": true, "codes": codes});
	self.close();
}, false);
