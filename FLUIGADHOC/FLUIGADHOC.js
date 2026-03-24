$(function() {
	var queryParams = getQueryParams(document.location.search);

	$("div.container").show();

	loadCalendar('#meetingDate');
	loadCalendar('#dueDate');

	if (queryParams.WKNumState > 0) {
		$("#divMSG").show();
	} else {
		loadTasks();
	}

	function loadCalendar(inputId) {
		var $dateInput = $(inputId + ' :input');

		if (!$dateInput.length) {
			$dateInput = $(inputId + ':input');
		}

		if ($dateInput.length) {
			FLUIGC.calendar($dateInput, {
				minDate: new Date(),
			}).setDate($dateInput.attr('value') || new Date());
		}
	}

	function loadTasks() {
		$("#divAtividades").show();

		window.wdkLoadChild("tbatividades", true);

		var $tableTasks = $("#tbatividades");
		if ($tableTasks.find('tbody tr').length > 1) {
			$tableTasks.show();
		}
	}
});
