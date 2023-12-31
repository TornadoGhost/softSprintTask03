<?php
include_once './Models/UserModel.php';
?>
<tbody class="block__table-body" id="my-table-body">
<?php
$db = new \public\Models\UserModel();
$result = $db->all();
    foreach ($result as $row) {
        ?>
            <tr class="block__table-body-row" data-id="<?= $row['id'] ?>">
            <td class="block__table-body-text">
                <input class="block__table-body-checkbox" type="checkbox" name="checkboxId[]"
                       value="<?= $row['id'] ?>"/>
            </td>
            <td class="block__table-body-text block__table-body-text--wider" data-target="name">
                <?= $row['firstname'] . ' ' . $row['lastname'] ?>
            </td>
            <td class="block__table-body-text" data-target="role"><?= $row['name'] ?></td>
            <td class="block__table-body-text" data-target='status'>
                <?php
                if ($row['status'] == 1) {
                    echo "<div class='block__circle block__circle--active' ><input type='hidden' name='status' value='1'></div>";
                } else if ($row['status'] == 0) {
                    echo "<div class='block__circle'><input type='hidden' name='status' value='0'></div>";
                }
                ?>
            </td>
            <td class="block__table-body-text">
                <div class="block__actions-buttons">
                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                        <button class="btn btn-outline-primary"
                                data-role="update"
                                type="button">Edit
                        </button>
                        <button class="btn btn-outline-primary"
                                data-role="delete"
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