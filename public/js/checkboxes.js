const mainCheckbox = document.getElementById('mainCheckbox');
const checkboxes = document.getElementsByClassName('block__table-body-checkbox');

mainCheckbox.addEventListener('change', function () {
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = mainCheckbox.checked;
    }
});

for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('change', function () {
        let allChecked = true;
        for (let j = 0; j < checkboxes.length; j++) {
            if (!checkboxes[j].checked) {
                allChecked = false;
                break;
            }
        }
        mainCheckbox.checked = allChecked;
    });
}