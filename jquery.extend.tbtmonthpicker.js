$.extend({
    tbtmonthpicker : function(params) {
        var elements;
        var currentElement;
        var currentYear;
        var currentMonth;
        var divMonthPicker;
        var timeHandle;
        var selectMonth;
        var selectYear;
        var buttonPick;

        createDivMonthPicker();

        elements = $(params.selector);
        elements.attr("autocomplete", "off");
        elements.focusin(elementsFocusIn);
        elements.focusout(elementsFocusOut);

        function elementsFocusIn() {
            cancelTimer();
            currentElement = $(this);

            setCurrentVal();

            var offset = getDivMonthPickerOffset();
            divMonthPicker.css({
                top: offset.top + "px",
                left: offset.left + "px"
            });

            createSelectYear();
            createSelectMonth();
            showDivMonthPicker();
        }

        function elementsFocusOut() {
            setTimer();
        }

        function cancelTimer() {
            clearTimeout(timeHandle);
        }

        function setTimer() {
            timeHandle = setTimeout(hideDivMonthPicker, 300);
        }

        function createDivMonthPicker() {
            divMonthPicker = $("<div/>");
            divMonthPicker.css({
                "position" : "absolute",
                "background-color" : "white",
                "border" : "1px solid #cccccc",
                "border-radius" : "3px",
                "-moz-border-radius" : "3px",
                "-webkit-border-radius" : "3px",
                "padding" : "10px",
                "display" : "none",
            });

            selectYear = $("<select/>");
            selectYear.focusin(cancelTimer);
            selectYear.focusout(setTimer);
            selectYear.css({
                "float":"left"
            });

            selectMonth = $("<select/>");
            selectMonth.focusin(cancelTimer);
            selectMonth.focusout(setTimer);
            selectMonth.css({
                "float":"left"
            });

            buttonPick = $("<input type='button' value='确定' />");
            buttonPick.click(buttonPickClick);
            buttonPick.css({
                "float":"left"
            });

            divMonthPicker.append(selectYear);
            divMonthPicker.append(selectMonth);
            divMonthPicker.append(buttonPick);

            $("body").append(divMonthPicker);
        }

        function createSelectYear() {
            selectYear.html("");

            var date = new Date();
            var yearTo = date.getFullYear();
            var yearFrom = 1970;

            if (params.yearFrom != undefined) {
                yearFrom = params.yearFrom;
            }

            if (params.yearTo != undefined) {
                yearTo = param.yearTo;
            }

            for (var i=yearTo;i>=yearFrom;i--) {
                var option = $("<option value='"+i+"'>"+i+"年</option>")
                if (currentYear==i) {
                    option.attr("selected", "selected");
                }
                selectYear.append(option);
            }

        }

        function createSelectMonth() {
            selectMonth.html("");

            for (var i=1;i<=12;i++) {
                var option = $("<option value='"+i+"'>"+i+"月</option>")
                if (currentMonth == i) {
                    option.attr("selected", "selected");
                }
                selectMonth.append(option);
            }
        }

        function showDivMonthPicker() {
            divMonthPicker.css({
                display : "inline-block"
            });
        }

        function hideDivMonthPicker() {
            divMonthPicker.css({
                display : "none"
            });
        }

        function getDivMonthPickerOffset() {
            var offset = currentElement.offset();
            var height = currentElement.height();
            var width = currentElement.width();

            var borderTopWidth = parseInt(currentElement.css("border-top-width"), 10);
            var borderBottomWidth = parseInt(currentElement.css("border-bottom-width"), 10);
            var paddingTop = parseInt(currentElement.css("padding-top"), 10);
            var paddingBottom = parseInt(currentElement.css("padding-bottom"), 10);
            var paddingLeft = parseInt(currentElement.css("padding-left"), 10);
            var paddingRight = parseInt(currentElement.css("padding-right"), 10);

            var top = offset.top + height + borderTopWidth + borderBottomWidth + paddingTop + paddingBottom;
            var left = offset.left;

            return {
                top: top,
                left: left
            }
        }

        function buttonPickClick() {
            cancelTimer();
            currentElement.val(selectYear.val() + "-" + selectMonth.val());
            hideDivMonthPicker();
        }

        function setCurrentVal() {
            currentYear = undefined;
            currentMonth = undefined;

            var currentVal = currentElement.val();
            var split = currentVal.split("-");
            if (split.length != 2) {
                return false;
            }

            currentYear = parseInt(split[0], 10);
            currentMonth = parseInt(split[1], 10);
        }
    }
});
