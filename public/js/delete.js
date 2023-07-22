$(document).on('click', '.block__table-body-text button[data-role=delete]', function () {
    const modal = $('#modalWindow');
    const row = $(this).parents('.block__table-body-row');
    const userId = row.data('id');
    const userName = row.find('td[data-target=name]').text().trim();

    modal.find('.modal-title').text("Delete Confirmation");
    modal.find('.modal-body-text').text("Are you sure you want to delete " + userName + "?");
    modal.find('.btn-primary').text('Delete').attr('data-role', 'delete');
    modal.modal('show');

    $(document).on('click', '#modalWindow button[data-role=delete]',  function () {
        modal.find('.btn-primary').text('Close').removeAttr('data-role');
        const dataSend = {id: userId, name: userName};
        $.ajax({
            url: '/Controllers/delete.php',
            method: 'post',
            data: dataSend,
            success: function (data) {
                data = JSON.parse(data);
                if (!data.status) {
                    modal.find('.modal-title').text("Error");
                    modal.find('.modal-body-text').text(`${data.error.message}`);
                    modal.modal('show');
                    $(document).off('click', '#modalWindow button[data-role=delete]');

                    return false;
                }
                row.remove();
                modal.modal('hide');
                $(document).off('click', '#modalWindow button[data-role=delete]');
            }
        });

        return false;
    })
});