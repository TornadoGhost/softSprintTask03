<?php
include_once './Models/UserModel.php';
?>
<tbody class="block__table-body" id="my-table-body">
<?php
$db = new \public\Models\UserModel();
$result = $db->all();
    foreach ($result as $row) {
        ?>
<!--        <tr class="block__table-body-row" data-id="--><?php //= $row['id'] ?><!--">-->
            <tr class="block__table-body-row">
            <td class="block__table-body-text">
                <input class="block__table-body-checkbox" type="checkbox" name="checkboxId[]"
                       value="<?= $row['id'] ?>"/>
            </td>
            <td class="block__table-body-text block__table-body-text--wider" data-target="name">
                <?= $row['firstname'] . ' ' . $row['lastname'] ?>
            </td>
            <td class="block__table-body-text" data-target="role"><?= $row['name'] ?></td>
            <td class="block__table-body-text">
                <?php
                if ($row['status'] == 1) {
                    echo "<div class='block__circle block__circle--active' data-target='status'><input type='hidden' name='status' value='1'></div>";
                } else if ($row['status'] == 0) {
                    echo "<div class='block__circle' data-target='status'><input type='hidden' name='status' value='0'></div>";
                }
                ?>
            </td>
            <td class="block__table-body-text">
                <div class="block__actions-buttons">
                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                        <button class="btn btn-outline-primary"
                                data-role="update"
                                data-id="<?= $row['id'] ?>"
                                type="button">Edit
                        </button>
                        <button class="btn btn-outline-primary"
                                data-role="delete"
                                data-id="<?= $row['id'] ?>"
                                type="button">Delete
                        </button>
                    </div>
                </div>
            </td>
        </tr>
        <?php
}
?>
</tbody>