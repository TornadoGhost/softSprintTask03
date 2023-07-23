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
<?php include_once 'models.php' ?>