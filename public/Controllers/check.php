<?php

function addOrUpdateUser($type){
    if(!empty($_POST['firstname']) && !empty($_POST['lastname']) && !empty($_POST['role'])) {
        if (!empty($_POST['type']) && $_POST['type'] === $type) {
            $user = null;
            $save = new \public\Models\UserModel();
            if($type === 'add'){
                $user = $save->add($_POST);
            } else if ($type === 'update') {
                $user = $save->update($_POST['id'], $_POST);
            }
            $data = ['user' => [
                'id' => $user['id'],
                'firstname' => $user['firstname'],
                'lastname' => $user['lastname'],
                'role' => $user['role'],
                'status' => $user['status']
            ]];
            echo response($user, $data);
        } else {
            echo json_encode(array('status' => false, 'error' => ['code' => 404, 'message' => "User was not $type"]));
        }
    } else {
        echo json_encode(array('status' => false, 'error' => ['code' => 404, 'message' => "User was not $type"]));
    }
}

function response($result, $data, $code = 404, $message = 'User not found')
{
    if ($result) {
        $array = ['status' => true, 'error' => null];
        $array = array_merge($array, $data);
        return json_encode($array);
    } else {
        return json_encode(array('status' => false, 'error' => ['code' => $code, 'message' => $message]));
    }
}