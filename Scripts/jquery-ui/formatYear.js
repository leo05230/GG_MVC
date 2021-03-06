﻿var originalSetting = {
	_generateMonthYearHeader: $.datepicker._generateMonthYearHeader,
	_formatDate: $.datepicker._formatDate
};

var chineseSetting = {
	_phoenixGenerateMonthYearHeader: $.datepicker._generateMonthYearHeader,

	_generateMonthYearHeader: function (inst, drawMonth, drawYear, minDate, maxDate,
		secondary, monthNames, monthNamesShort) {
		var result = $($.datepicker._phoenixGenerateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate,
			secondary, monthNames, monthNamesShort));
		result.children("select.ui-datepicker-year").children().each(function () {
			$(this).text('民國' + ($(this).text() - 1911) + '年');
		});
		if (inst.yearshtml) {
			var origyearshtml = inst.yearshtml;
			setTimeout(function () {
				//assure that inst.yearshtml didn't change.
				if (origyearshtml === inst.yearshtml) {
					inst.dpDiv.find('select.ui-datepicker-year:first').replaceWith(inst.yearshtml);
					inst.dpDiv.find('select.ui-datepicker-year').children().each(function () {
						$(this).text('民國' + ($(this).text() - 1911) + '年');
					});
				}
				origyearshtml = inst.yearshtml = null;
			}, 0);
		}
		//return result.html();
		return $("<div class='ui-datepicker-title'></div>").append(result.clone()).html();
	},

	_formatDate: function (inst, day, month, year) {
		if (!day) {
			inst.currentDay = inst.selectedDay;
			inst.currentMonth = inst.selectedMonth;
			inst.currentYear = inst.selectedYear;
		}
		var date = (day ? (typeof day == 'object' ? day :
			this._daylightSavingAdjust(new Date(year, month, day))) :
			this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
		return (date.getFullYear() - 1911) + "-" +
			(date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" +
			(date.getDate() < 9 ? "0" + date.getDate() : date.getDate());
	}

};