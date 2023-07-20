<?php
include_once 'check.php';

if(!empty(userExists($_POST['id']))){
    addOrUpdateUser('update');
} else {
    echo error('User does not exist.');
}
