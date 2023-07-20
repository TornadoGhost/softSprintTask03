<?php
include_once '../Models/UserModel.php';
include_once 'check.php';

dataProcessing(1);
dataProcessing(2);
function dataProcessing($buttonNumber) {
    if($_POST['sendFrom'] === "button$buttonNumber" && !empty($_POST['checkboxId'])){
        if($_POST['selectedAction'] === 'delete'){
            $ids = action('delete');
            echo json_encode(['status' => true, 'error' => null, 'ids' => $ids, 'action' => 'delete']);
        }else if ($_POST['selectedAction'] === 'setActive'){
            $ids = action('setActive');
            echo json_encode(['status' => true, 'error' => null, 'ids' => $ids, 'action' => 'active']);
        }else if ($_POST['selectedAction'] === 'setNotActive'){
            $ids = action('setNotActive');
            echo json_encode(['status' => true, 'error' => null, 'ids' => $ids, 'action' => 'notActive']);
        } else {
            echo json_encode(['status' => false, 'error' => ['code' => 404, 'message' => 'No actions selected']]);
        }
    }
}
function action($method)
{
    $ids = [];
    $mysql = new \public\Models\UserModel();
    $checlboxIds = $_POST['checkboxId'];
    //check all user on existence
    foreach ($checlboxIds as $id) {
        if(empty(userExists($id))){
            echo error('One of users is not exist.');
            die();
        }
    }
    //if all users exist then deleting
    foreach ($checlboxIds as $id){
        $res = $mysql->$method($id);
        if (!$res) {
            echo error('Something went wrong');
            die();
        }
        $ids[] = $id;
    }
    return $ids;
}