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
        modal.find('.btn-primary').text('Got it!');

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
            $('#confirmModal').modal('show');

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
                            modal.find('.modal-body-text').text(`${data.error.message}`);
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
                $(`#confirmModal`).modal("hide");
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