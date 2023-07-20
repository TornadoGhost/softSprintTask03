$('#userNotExist button.btn').on('click', function () {
    $('#userNotExist').addClass('is-hidden');
})
$(document).on('click', 'button[data-role=delete]', function () {
    const userId = $(this).data('id');
    const userName = $("tr input[value=" + userId + "]").closest('tr').find('td[data-target=name]').text().trim();
    const modal = $('#modalWindow');

    modal.find('.modal-title').text("Delete Confirmation");
    modal.find('.modal-body-text').text("Are you sure you want to delete " + userName + "?");
    modal.find('.btn-primary').text('Delete').attr('data-role', 'delete');

    modal.modal('show');
    modal.find('button[data-role=delete]').on('click', function () {
        const $dataSend = {id: userId, name: userName};
        $.ajax({
            url: '/Controllers/delete.php',
            method: 'post',
            data: $dataSend,
            success: function (data) {
                data = JSON.parse(data);
                $(".block__table-body-row input[value='" + data.id + "']")
                    .closest("tr.block__table-body-row")
                    .remove();
                modal.modal('hide');
                modal.find('button[data-role=delete]').removeAttr('data-role');
            }
        });

        return false;
    })
});