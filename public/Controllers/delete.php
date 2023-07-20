<?php
include_once '../Models/UserModel.php';
include_once 'check.php';

$user = new \public\Models\UserModel();

if(!empty(userExists($_POST['id']))){
    $user_id = $_POST['id'];
    $result = $user->delete($user_id);
    if($result) {
        $data = ['id' => $user_id];
        echo response($result, $data);
    } else {
        echo error('Something went wrong.');
    }
} else {
    echo error('User ' . $_POST['name'] . ' does not exist.');
}
