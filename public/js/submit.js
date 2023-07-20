$("#addUserForm").on("submit", function () {
    const form = $('#addUserForm');
    const input = form.closest('div').find('input[name=type]').val();

    if (input === 'add') {
        $.ajax({
            url: '/Controllers/add.php',
            method: 'post',
            data: $(this).serialize(),
            success: function (data) {
                data = JSON.parse(data);
                if (!data.user) {
                    return null;
                }
                if (data.status) {
                    const userStatus = data.user.status
                        ? `<div class="block__circle block__circle--active" data-target='status'><input type="hidden" name="status" value="1"></div>`
                        : `<div class="block__circle" data-target='status'><input type="hidden" name="status" value="0"></div>`;

                    let role_id = null;
                    if (data.user.role_id === 1) {
                        role_id = 'Admin';
                    } else if (data.user.role_id === 2) {
                        role_id = 'User';
                    }

                    const tableRow = `
                        <tr class="block__table-body-row">
                            <td class="block__table-body-text">
                                <input class="block__table-body-checkbox" type="checkbox" name="checkboxId[]" value="${data.user.id}"/>
                            </td>
                            <td class="block__table-body-text block__table-body-text--wider" data-target="name">${data.user.firstname} ${data.user.lastname}</td>
                            <td class="block__table-body-text" data-target="role">${role_id}</td>
                            <td class="block__table-body-text">${userStatus}</td>
                            <td class="block__table-body-text">
                                <div class="block__actions-buttons">
                                <div class="btn-group" role="group" aria-label="Basic outlined example">
                                    <button class="btn btn-outline-primary" data-role="update" data-id="${data.user.id}" type="button">Edit</button>
                                <button class="btn btn-outline-primary" data-role="delete" data-id="${data.user.id}" type="button">Delete</button>
                                </div>
                                </div>
                            </td>
                        `;
                    $("#my-table-body").append(tableRow);
                    $('#mainCheckbox').prop('checked', false);
                    $('#addUser').modal('hide');
                    $('#addUserForm').removeClass().addClass('needs-validation');
                }
            }
        });
    } else if (input === 'update') {
        $.ajax({
            url: '/Controllers/update.php',
            method: 'post',
            data: $(this).serialize(),
            success: function (data) {
                data = JSON.parse(data);
                if (!data.status) {
                    const message =
                        `<div class="alert alert-danger" role="alert">
                            ${data.error.message}
                        </div>`;
                    const alert = $('#addUserForm .alert-danger');
                    if (alert.length === 0) {
                        $('#addUserForm .modal-body').prepend(message);
                    }
                    $('#addUserForm').removeClass().addClass('needs-validation');
                    return false;
                }
                let role_id = null;

                if (data.user.role_id === 1) {
                    role_id = 'Admin';
                } else if (data.user.role_id === 2) {
                    role_id = 'User';
                }

                const row = $("tr.block__table-body-row[data-id="+ data.user.id +"]")

                row.find('td[data-target=name]').text(data.user.firstname + ' ' + data.user.lastname);
                row.find('td[data-target=role]').text(role_id);
                row.find('td[data-target=status] input[name=status]').val(data.user.status);

                const userStatus = data.user.status
                    ? "block__circle block__circle--active"
                    : "block__circle";

                row.find('.block__circle').removeClass().addClass(userStatus);
                form.removeClass().addClass('needs-validation');
                $('#addUser').modal('hide');
            }
        });
    }

    return false;
});
$('#addUser').on('hidden.bs.modal', function () {
    $('#addUserForm').removeClass().addClass('needs-validation');
});