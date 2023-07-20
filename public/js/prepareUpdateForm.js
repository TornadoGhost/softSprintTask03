$(document).on('click', 'button[data-role=update]', function (){
    $('#addUserForm .alert-danger').remove();
    const row = $(this).parents('.block__table-body-row');
    const id = row.data('id');
    const name = row.find("td[data-target='name']").text().trim();
    const role = row.find("td[data-target='role']").text();
    const status = row.find("td[data-target='status'] input[name='status']").val();
    const firstname = name.split(" ")[0];
    const lastname = name.split(" ")[1];

    $('#firstname').val(firstname);
    $('#lastname').val(lastname);
    if(status === '1') {
        $('#status').prop('checked', true);
    } else if(status === '0'){
        $('#status').prop('checked', false);
    }
    if(role === 'Admin') {
        $('#role_id').children("option[value=2]").removeAttr('selected');
        $('#role_id').children("option[value=1]").prop('selected', 'selected');
    } else {
        $('#role_id').children("option[value=1]").removeAttr('selected');
        $('#role_id').children("option[value=2]").prop('selected', 'selected');
    }
    $('#addUserForm button[type=submit]').text('Update');
    $('#addUserForm input[name=id]').attr('value', id);
    $('#addUser').closest('div').find('.modal-title').text('Update User');
    $('#addUser').modal('toggle');
});