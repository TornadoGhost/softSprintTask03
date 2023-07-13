$(document).on('change', '#mainCheckbox', function () {
    $('.block__table-body-checkbox').prop('checked', $('#mainCheckbox').prop('checked'));
});

$(document).on('change', '.block__table-body-checkbox', function () {
    let allChecked = true;
    $('.block__table-body-checkbox').each(function () {
        if (!$(this).prop('checked')) {
            allChecked = false;
            return false; // эквивалент break в цикле
        }
    });
    $('#mainCheckbox').prop('checked', allChecked);
});