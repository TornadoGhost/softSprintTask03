<?php
include_once '../Models/UserModel.php';

$action = $_POST['actions1'];

if(!empty($action) && empty($_POST['checkboxId'])){
    echo json_encode(['status' => false, 'error' => ['code' => 404, 'message' => 'Action selected but not user or users', 'info' => 'noUserIsAction']]);
    die();
}
if(empty($action) && !empty($_POST['checkboxId'])) {
    echo json_encode(['status' => false, 'error' => ['code' => 404, 'message' => 'User or users selected but not action', 'info' => 'noActionIsUser']]);
    die();
}

if(!empty($_POST['actions1']) && !empty($_POST['checkboxId'])) {
    if ($action === 'Delete') {
        $ids = action('delete');
        echo json_encode(['status' => true, 'error' => null, 'ids' => $ids, 'action' => 'delete']);
    } elseif ($action === 'Set active') {
        $ids = action('setActive');
        echo json_encode(['status' => true, 'error' => null, 'ids' => $ids, 'action' => 'active']);
    } else if ($action === 'Set not active') {
        $ids = action('setNotActive');
        echo json_encode(['status' => true, 'error' => null, 'ids' => $ids, 'action' => 'notActive']);
    } else {
        echo json_encode(['status' => false, 'error' => ['code' => 404, 'message' => 'Some error']]);
    }
}
function action($method)
{
    $ids = [];
    $mysql = new \public\Models\UserModel();
    foreach ($_POST['checkboxId'] as $id) {
        $res = $mysql->$method($id);
        if (!$res) {
            echo json_encode(['status' => false, 'error' => ['code' => 404, 'message' => 'Something went wrong']]);
            die();
        }
        $ids[] = $id;
    }
    return $ids;
}