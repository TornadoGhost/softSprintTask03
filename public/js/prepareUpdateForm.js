$(document).on('click', 'button[data-role=update]', function (){
    const id = $(this).data('id');
    const select = $("tr.block__table-body-row input[value='" + id + "']").closest("tr.block__table-body-row");
    const name = select.children("td[data-target=name]").text().trim();
    const firstname = name.split(" ")[0];
    const lastname = name.split(" ")[1];
    const role = select.children("td[data-target=role]").text();
    const status = select.find("input[name=status]").val();

    $('#firstname').val(firstname);
    $('#lastname').val(lastname);
    if(status === '1') {
        $('#status').attr('checked', 'checked');
    } else {
        $('#status').removeAttr('checked');
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
