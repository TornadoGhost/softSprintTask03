<?php

namespace public\Models;
class UserModel
{
    const HOSTNAME = 'mysql';
    const USERNAME = 'laravel';
    const PASSWORD = 'root';
    const DATABASE = 'laravel';
    const PORT = '3306';

    protected $mysqli;
    public function __construct()
    {
        $this->mysqli = new \mysqli(self::HOSTNAME, self::USERNAME, self::PASSWORD, self::DATABASE, self::PORT);
    }

    public function all(){
        $query = "
            SELECT users.id, users.firstname, users.lastname, users.status, roles.name
            FROM users
            LEFT JOIN roles
            on users.role_id = roles.id
            ";

        return $this->mysqli->query($query);
    }
    public function add($data){
        $stmt = $this->mysqli->prepare("INSERT INTO users (firstname, lastname, role, status) VALUES (?,?,?,?)");
        $stmt->bind_param('sssi',$firstname, $lastname, $role, $status);

        $firstname = $this->validateInput(str_replace(' ', '', $data['firstname']));
        $lastname = $this->validateInput(str_replace(' ', '', $data['lastname']));
        $role = $this->validateInput($data['role']);
        $status = isset($data['status']) ? 1 : 0;

        $stmt->execute();

        return ['id' => $stmt->insert_id, 'firstname' => $firstname, 'lastname' => $lastname, 'role' => $role, 'status' => $status];
    }
    public function update($id, $data) {
        $stmt = $this->mysqli->prepare("UPDATE users SET firstname = ?, lastname = ?, role = ?, status = ? WHERE id = $id");
        $stmt->bind_param('sssi', $firstname, $lastname, $role, $status);

        $firstname = $this->validateInput(str_replace(' ', '', $data['firstname']));
        $lastname = $this->validateInput(str_replace(' ', '', $data['lastname']));
        $role = $this->validateInput($data['role']);
        $status = isset($data['status']) ? 1 : 0;

        $stmt->execute();

        return ['id' => $id, 'firstname' => $firstname, 'lastname' => $lastname, 'role' => $role, 'status' => $status];
    }

    public function delete($id) {
        $query = "
                DELETE FROM users WHERE id = $id;
        ";

        return $this->mysqli->query($query);
    }

    public function setActive($id) {
        $query = "UPDATE users SET status=1 WHERE id=$id";
        if($this->mysqli->query($query) === true) {
            return true;
        } else {
            return false;
        }
    }

    public function setNotActive($id) {
        $query = "UPDATE users SET status=0 WHERE id=$id";
        if($this->mysqli->query($query) === true) {
            return true;
        } else {
            return false;
        }
    }

    function validateInput($data)
    {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
    public function __destruct()
    {
        $this->mysqli->close();
    }
}