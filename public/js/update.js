$(document).on('click', "button[data-role=update]", function () {
    const form = $('#addUserForm').closest('div');
    form.find('input[name=type]').removeAttr('value').attr('value', 'update');
});