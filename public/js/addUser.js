$("button[data-role=add]").on('click', function () {
    $('#addUserForm .alert-danger').remove();
    const form = $('#addUserForm').closest('div');
    form.find('input').val('');
    form.find('input[name=status]').prop('checked', false);
    form.find('input[type=checkbox]').removeAttr('checked');
    form.find('option').removeAttr('selected').first().prop('selected', 'selected');
    form.find('input[name=type]').removeAttr('value').attr('value', 'add');
    form.find('input[name=id]').removeAttr('value');
    form.find('button[type=submit]').text('Save');
    $('#addUser').closest('div').find('.modal-title').text('Add User');
});