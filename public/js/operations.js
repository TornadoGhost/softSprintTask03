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

        if(!myObj[`actions${number}`] && !myObj['checkboxId[]']) {
            modal.find('.modal-body-text').text("Please, choose user and action");
            modal.modal('show');

            return false
        }

        if (((myObj[`actions${number}`] === `Delete${number}` || myObj[`actions${number}`] === `Set active${number}`|| myObj[`actions${number}`] === `Set not active${number}`) && myObj[`actions${number}`]) && !myObj['checkboxId[]']) {
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
                        if (data.status) {
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
                    data.ids.forEach(element => {
                        $("tr.block__table-body-row input[value='" + element + "']")
                            .closest("tr.block__table-body-row")
                            .find(".block__circle").removeClass('block__circle--gray')
                            .addClass('block__circle--green');
                    });
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
                    data.ids.forEach(element => {
                        $("tr.block__table-body-row input[value='" + element + "']")
                            .closest("tr.block__table-body-row")
                            .find(".block__circle").removeClass('block__circle--green')
                            .addClass('block__circle--gray');
                    });
                }
            });
            return false;
        }
    });
}