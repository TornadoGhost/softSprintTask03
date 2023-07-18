<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>User's Control Template</title>
    <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
            crossorigin="anonymous"
    />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./css/main.css"/>
</head>
<body>
<div class="block">
    <p class="block__text">Users</p>
    <form id="mainTable">
        <div class="actions">
            <div class="actions__item">
                <button
                        type="button"
                        class="actions__button"
                        data-bs-toggle="modal"
                        data-bs-target="#addUser"
                        id="modalAdd"
                        data-role="add"
                >
                    Add
                </button>
            </div>
            <div class="actions__item">
                <select class="actions__select" id="actions1" name="actions1">
                    <option class="actions__option" value="" selected>-Please Select-</option>
                    <option class="actions__option" value="Set active1">
                        Set active
                    </option>
                    <option class="actions__option" value="Set not active1">
                        Set not active
                    </option>
                    <option class="actions__option" value="Delete1">Delete</option>
                </select>
            </div>
            <div class="actions__item">
                <button class="actions__button" id="sendButton1" type="submit">OK</button>
            </div>
        </div>
        <table class="block__table">
            <thead class="block__table-head">
            <tr class="block__table-row">
                <th class="block__table-header">
                    <input
                            class="block__table-checkbox"
                            id="mainCheckbox"
                            type="checkbox"
                    />
                </th>
                <th class="block__table-header">Name</th>
                <th class="block__table-header">Role</th>
                <th class="block__table-header">Status</th>
                <th class="block__table-header">Actions</th>
            </tr>
            </thead>
            <?php include_once 'table-body.php' ?>
        </table>
        <div class="actions">
            <div class="actions__item">
                <button
                        type="button"
                        class="actions__button"
                        data-bs-toggle="modal"
                        data-bs-target="#addUser"
                        id="modalAdd"
                        data-role="add"
                >
                    Add
                </button>
            </div>
            <div class="actions__item">
                <select class="actions__select" id="actions2" name="actions2">
                    <option class="actions__option" value="" selected>-Please Select-</option>
                    <option class="actions__option" value="Set active2">
                        Set active
                    </option>
                    <option class="actions__option" value="Set not active2">
                        Set not active
                    </option>
                    <option class="actions__option" value="Delete2">Delete</option>
                </select>
            </div>
            <div class="actions__item">
                <button class="actions__button" id="sendButton2"  type="submit">OK</button>
            </div>
        </div>
    </form>
</div>
<!--modal-->
<div class="modal" id="addUser" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Add User</h5>
                <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                ></button>
            </div>
            <form id="addUserForm" class="needs-validation" novalidate>
                <div class="modal-body">
                    <div class="mb-3">
                        <input type="hidden" name="id">
                        <input type="hidden" name="type">
                        <label for="firstname" class="form-label">
                            First Name
                        </label>
                        <input
                                type="text"
                                class="form-control"
                                id="firstname"
                                name="firstname"
                                required
                        />
                    </div>
                    <div class="mb-3">
                        <label for="lastname" class="form-label">
                            Last Name
                        </label>
                        <input
                                type="text"
                                class="form-control"
                                id="lastname"
                                name="lastname"
                                required
                        />
                    </div>
                    <div class="form-check form-switch mb-3">
                        <label class="form-check-label">
                            Status
                            <input
                                    class="form-check-input"
                                    type="checkbox"
                                    name="status"
                                    id="status"
                            />
                        </label>
                    </div>
                    <label for="role" class="form-label">Select role</label>
                    <select
                            class="form-select"
                            aria-label="Default select example"
                            name="role"
                            id="role"
                            required
                    >
                        <option selected disabled value="">-Please select-</option>
                        <option value="1">Admin</option>
                        <option value="2">User</option>
                    </select>
                    <div class="invalid-feedback">
                        Please select a valid role.
                    </div>
                </div>
                <div class="modal-footer">
                    <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                    >
                        Close
                    </button>
                    <button type="submit" class="btn btn-primary">
                        Save
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
<!-- modal warnings -->
<div class="modal" id="modalWindow" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p class="modal-body-text"></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal"></button>
            </div>
        </div>
    </div>
</div>
<!-- modal delete confirm -->
<div class="modal" id="confirmModal" tabindex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="confirmModalLabel">Підтвердження видалення 1</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>Ви впевнені, що хочете видалити запис?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Скасувати</button>
                <button id="confirmDeleteButton" type="button" class="btn btn-danger">Видалити</button>
            </div>
        </div>
    </div>
</div>


<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
<script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"
></script>
<script src="./js/validation.js"></script>
<script src="./js/addUser.js">
</script>
<script src="./js/checkboxes.js"></script>
<script src="./js/operations.js"></script>
<script src="./js/prepareUpdateForm.js"></script>
<script src="./js/update.js"></script>
<script src="./js/delete.js"></script>
<script src="./js/submit.js"></script>
</body>
</html>
