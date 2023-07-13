$("#addUserForm").on("submit", function () {

    const input = $('#addUserForm').closest('div').find('input[name=type]').val();

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
                        ? `<div class="block__circle block__circle--green" data-target='status'></div>`
                        : `<div class="block__circle block__circle--gray" data-target='status'></div>`;

                    const tableRow = `
                        <tr class="block__table-body-row">
                            <td class="block__table-body-text">
                                <input class="block__table-body-checkbox" type="checkbox" name="checkboxId[]" value="${data.user.id}"/>
                            </td>
                            <td class="block__table-body-text block__table-body-text--wider" data-target="name">${data.user.firstname} ${data.user.lastname}</td>
                            <td class="block__table-body-text" data-target="role">${data.user.role}</td>
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
                if (data.status === 'false') {
                    return false;
                }

                const row = $(".block__table-body-checkbox[value='" + data.user.id + "']").closest('tr');
                row.find('td[data-target=name]').text(data.user.firstname + ' ' + data.user.lastname);
                row.find('td[data-target=role]').text(data.user.role);

                const userStatus = data.user.status
                    ? "block__circle block__circle--green"
                    : "block__circle block__circle--gray";

                row.find('.block__circle').removeClass().addClass(userStatus);
                row.find('.block__circle[data-target=status] input[value]').removeAttr('value').attr('value', data.user.status);
            }
        });
    }

    return false;
});