function selectBirthday(yearSelector, monthSelector, daySelector, config) {
    if (config == undefined) {
        config = {};
    }

    if (config.year == undefined) {
        config.year = new Date().getFullYear();
    }

    if (config.month == undefined) {
        config.day = new Date().getMonth() + 1;
    }

    if (config.month == undefined) {
        config.day = new Date().getDate();
    }

    if (config.yearRange == undefined) {
        config.yearRange = 100;
    }

    if (config.endYear == undefined) {
        config.endYear = new Date().getFullYear();
    }

    var birthdayYear = $(yearSelector);
    for (var y = config.endYear; y > config.endYear - config.yearRange; y--) {
        if (y == config.year) {
            $('<option value="' + y + '" selected="selected">' + y + '</option>').appendTo(birthdayYear);
        } else {
            $('<option value="' + y + '" >' + y + '</option>').appendTo(birthdayYear);
        }
    }

    var birthdayMonth = $(monthSelector);
    for (var m = 1; m <= 12; m++) {
        if (m == config.month) {
            $('<option value="' + m + '" selected="selected">' + m + '</option>').appendTo(birthdayMonth);
        } else {
            $('<option value="' + m + '">' + m + '</option>').appendTo(birthdayMonth);
        }
    }

    var birthdayDay = $(daySelector);
    for (var d = 1; d <= 31; d++) {
        if (d == config.day) {
            $('<option value="' + d + '" selected="selected">' + d + '</option>').appendTo(birthdayDay);
        } else {
            $('<option value="' + d + '">' + d + '</option>').appendTo(birthdayDay);
        }
    }

    birthdayYear.change(onBirthChange);
    birthdayMonth.change(onBirthChange);
    birthdayDay.change(onBirthChange);

    var day29 = birthdayDay.find('option[value="29"]');
    var day30 = birthdayDay.find('option[value="30"]');
    var day31 = birthdayDay.find('option[value="31"]');

    function onBirthChange() {
        var year = parseInt(birthdayYear.val());
        var month = parseInt(birthdayMonth.val());
        var day = parseInt(birthdayDay.val());

        switch (month) {
            case 4:
            case 6:
            case 9:
            case 11:
                if (day > 30) {
                    setBirthDate(year, month, 30);
                }
                day29.show();
                day30.show();
                day31.hide();
                break;
            case 2:
                if (!isLeapYear(year)) {
                    if (day > 28) {
                        setBirthDate(year, 2, 28);
                    }
                    day29.hide();
                } else {
                    if (day > 29) {
                        setBirthDate(year, 2, 29);
                    }
                    day29.show();
                }
                day30.hide();
                day31.hide();
                break;
            default:
                day29.show();
                day30.show();
                day31.show();
                break;
        }
    }

    function isLeapYear(year) {
        return (0 == year % 4 && (year % 100 != 0 || year % 400 == 0));
    }

    function setBirthDate(year, month, day) {
        birthdayYear.val(year);
        birthdayMonth.val(month);
        birthdayDay.val(day);
    }
}