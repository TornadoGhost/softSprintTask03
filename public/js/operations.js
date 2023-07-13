$("#mainTable").on("submit", function () {
    $.ajax({
        url: '/Controllers/operations.php',
        method: 'post',
        data: $(this).serialize(),
        success: function (data) {
            if(!data){
                return false;
            }
            data = JSON.parse(data);
            if (data.status) {
                if (data.action === 'delete') {
                    data.ids.forEach(element => {
                        $("tr.block__table-body-row input[value='" + element + "']")
                            .closest("tr.block__table-body-row")
                            .remove();
                    });
                } else if (data.action === 'active') {
                    data.ids.forEach(element => {
                        $("tr.block__table-body-row input[value='" + element + "']")
                            .closest("tr.block__table-body-row")
                            .find(".block__circle").removeClass('block__circle--gray')
                            .addClass('block__circle--green');
                    });
                } else if (data.action === 'notActive') {
                    data.ids.forEach(element => {
                        $("tr.block__table-body-row input[value='" + element + "']")
                            .closest("tr.block__table-body-row")
                            .find(".block__circle").removeClass('block__circle--green')
                            .addClass('block__circle--gray');
                    });
                }
            }

            const modal = $('#modalWindow');
            modal.find('.modal-title').text("Warning");
            modal.find('button[data-role=delete]').removeAttr('data-role');
            modal.find('.btn-primary').text('Got it!');

            if(!data.status  && typeof data.error.info !== "undefined") {
                if(data.error.info === 'noUserIsAction') {
                    modal.find('.modal-body-text').text("Please, choose user before making actions on them");
                    modal.modal('show');
                } else if (data.error.info === 'noActionIsUser') {
                    modal.find('.modal-body-text').text("Please, choose action");
                    modal.modal('show');
                }
            }

        }
    });
    return false;
});