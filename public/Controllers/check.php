<?php
include_once '../Models/UserModel.php';
function addOrUpdateUser($type)
{
    if (empty($_POST['firstname'])) {
        echo error('Firstname was not write.');
    } else if (empty($_POST['lastname'])) {
        echo error('Lastname was not write.');
    } else if (empty($_POST['role_id'])) {
        echo error('Role was not choose.');
    } else {
        if (!empty($_POST['type']) && $_POST['type'] === $type) {
            $user = null;
            $save = new \public\Models\UserModel();
            if ($type === 'add') {
                $user = $save->add($_POST);
            } else if ($type === 'update') {
                $user = $save->update($_POST['id'], $_POST);
            }
            $data = ['user' => [
                'id' => $user['id'],
                'firstname' => $user['firstname'],
                'lastname' => $user['lastname'],
                'role_id' => $user['role_id'],
                'status' => $user['status']
            ]];
            echo response($user, $data);
        } else {
            echo error("User was not $type");
        }
    }

}

function response($result, $data, $code = 404, $message = 'User not found')
{
    if ($result) {
        $array = ['status' => true, 'error' => null];
        $array = array_merge($array, $data);
        return json_encode($array);
    } else {
        return error($message, $code);
    }
}

function error($message, $code = 404)
{
    return json_encode(array('status' => false, 'error' => ['code' => $code, 'message' => $message]));
}

function userExists($id) {
    $user = new public\Models\UserModel();
    return $user->getById($id);
}