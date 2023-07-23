operation(1);
operation(2);
function operation(number) {
    $(`#sendButton${number}`).on("click", function (event) {
        event.preventDefault();

        let data = $("#mainTable").serializeArray();
        const selectVal = $(`#actions${number}`).val();

        const modal = $('#modalWindow');
        modal.find('.modal-title').text("Warning");
        modal.find('button[data-role=delete]').removeAttr('data-role');
        modal.find('.modal-footer').empty().html('<button type="button" class="btn btn-primary" data-bs-dismiss="modal">Got it!</button>');

        const myObj = {};
        data.forEach(function (element) {
            myObj[element.name] = element.value;
        });

        if (((!myObj[`actions${number}`] || myObj[`actions${number}`] === `Delete${number}` || myObj[`actions${number}`] === `Set active${number}` || myObj[`actions${number}`] === `Set not active${number}`)) && !myObj['checkboxId[]']) {
            modal.find('.modal-body-text').text("Please, choose user before making actions on them");
            modal.modal('show');

            return false
        }

        if (myObj[`actions${number}`] === '' && myObj['checkboxId[]']) {
            modal.find('.modal-body-text').text("Please, choose action");
            modal.modal('show');

            return false
        }

        if (!selectVal) {
            return false;
        }

        if (selectVal === `Delete${number}`) {
            modal.find('.modal-title').text('Delete Confirmation');
            modal.find('.modal-body-text').text('Are you sure that you want to delete data?');
            modal.find('.modal-footer').empty().html(
                '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>' +
                '<button id="confirmDeleteButton" type="button" class="btn btn-danger">Delete</button>');
            modal.modal('show');


            $("#confirmDeleteButton").on('click', function () {
                let formData = $("#mainTable").serialize();
                formData += `&sendFrom=button${number}&selectedAction=delete`;
                $.ajax({
                    url: '/Controllers/operations.php',
                    method: 'post',
                    data: formData,
                    success: function (data) {
                        if (!data) {
                            return false;
                        }
                        data = JSON.parse(data);
                        if (!data.status) {
                            modal.find('.modal-title').text('Error');
                            modal.find('.modal-body-text').text(`${data.error.message}`);
                            modal.find('.modal-footer').empty().html('<button type="button" class="btn btn-primary" data-bs-dismiss="modal">Got it!</button>');
                            modal.modal('show');
                        } else {
                            data.ids.forEach(element => {
                                $("tr.block__table-body-row input[value='" + element + "']")
                                    .closest("tr.block__table-body-row")
                                    .remove();
                            });
                        }
                    }
                });
                modal.modal('hide');
                return false;
            });
        }
        if (selectVal === `Set active${number}`) {
            let formData = $("#mainTable").serialize();
            formData += `&sendFrom=button${number}&selectedAction=setActive`;
            $.ajax({
                url: '/Controllers/operations.php',
                method: 'post',
                data: formData,
                success: function (data) {
                    if (!data) {
                        return false;
                    }
                    data = JSON.parse(data);
                    if (!data.status) {
                        modal.find('.modal-body-text').text(`${data.error.message}`);
                        modal.modal('show');
                    } else {
                        data.ids.forEach(element => {
                            const row = $("tr.block__table-body-row input[value='" + element + "']").closest("tr.block__table-body-row");
                            row.find(".block__circle").addClass('block__circle--active');
                            row.find('input[name=status]').val(1);
                        });
                    }
                }
            });
            return false;
        }

        if (selectVal === `Set not active${number}`) {
            let formData = $("#mainTable").serialize();
            formData += `&sendFrom=button${number}&selectedAction=setNotActive`;
            $.ajax({
                url: '/Controllers/operations.php',
                method: 'post',
                data: formData,
                success: function (data) {
                    if (!data) {
                        return false;
                    }
                    data = JSON.parse(data);
                    if (!data.status) {
                        modal.find('.modal-body-text').text(`${data.error.message}`);
                        modal.modal('show');
                    } else {
                        data.ids.forEach(element => {
                            const row = $("tr.block__table-body-row input[value='" + element + "']").closest("tr.block__table-body-row")
                            row.find(".block__circle").removeClass('block__circle--active');
                            row.find('input[name=status]').val(0);
                        });
                    }
                }
            });
            return false;
        }
    });
}