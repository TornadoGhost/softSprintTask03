<!--modal form-->
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
                    <label for="role_id" class="form-label">Select role</label>
                    <select
                        class="form-select"
                        aria-label="Default select example"
                        name="role_id"
                        id="role_id"
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