const select1 = $(".actions__select[name='actions1']");
const select2 = $(".actions__select[name='actions2']");
const state = {
    selectValue: "",
};

select1.on("change", handleSelect);
select2.on("change", handleSelect);

function handleSelect(e) {
    state.selectValue = e.target.value;
    select1.val(state.selectValue);
    select2.val(state.selectValue);
}