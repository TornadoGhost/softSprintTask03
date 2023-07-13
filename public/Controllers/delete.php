<?php
include_once '../Models/UserModel.php';
include_once 'check.php';

$save = new \public\Models\UserModel();
$user_id = $_POST['id'];
$result = $save->delete($user_id);
$data = ['id' => $user_id];
if($result) {
    echo response($result, $data);
} else {
    echo json_encode(array('status' => false, 'error' => ['code' => 404, 'message' => 'User not found']));
}