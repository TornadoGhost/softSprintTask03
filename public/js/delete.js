$('#userNotExist button.btn').on('click', function () {
    $('#userNotExist').addClass('is-hidden');
})
$(document).on('click', '.block__table-body-text button[data-role=delete]', function () {
    const modal = $('#modalWindow');
    const row = $(this).parents('.block__table-body-row');
    const userId = row.data('id');
    const userName = row.find('td[data-target=name]').text().trim();

    modal.find('.modal-title').text("Delete Confirmation");
    modal.find('.modal-body-text').text("Are you sure you want to delete " + userName + "?");
    modal.find('.btn-primary').text('Delete').attr('data-role', 'delete');

    modal.modal('show');
    modal.find('button[data-role=delete]').off('click').on('click', function () {
        const dataSend = {id: userId, name: userName};
        $.ajax({
            url: '/Controllers/delete.php',
            method: 'post',
            data: dataSend,
            success: function (data) {
                data = JSON.parse(data);
                if (!data.status) {
                    const text = `<p>${data.error.message}</p>`;
                    const textBody = $('#userNotExist .modal-body p');
                    if (textBody.length === 0) {
                        $('#userNotExist .modal-body').append(text);
                    }
                    $('#userNotExist').removeClass('is-hidden');
                    return false;
                }
                row.remove();
                modal.modal('hide');
                modal.find('button[data-role=delete]').removeAttr('data-role');
            }
        });

        return false;
    })
});