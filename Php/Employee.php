<?php defined('BASEPATH') OR exit('No direct script access allowed');


class Employee extends CI_Controller {
	function __construct() {
		header('Access-Control-Allow-Origin: '.ORIGIN);
		header('Access-Control-Allow-Credentials: true');
		header('Access-Control-Allow-Methods: GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH');
		header('Access-Control-Allow-Headers: Origin, Content-Type, X-Requested-With, Referrer, X-Auth-Token, Authorization');
		header('Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0');
		header('Pragma: no-cache');
		header('X-Frame-Options: deny');

		$method = $_SERVER['REQUEST_METHOD'];
		if ("OPTIONS" == $method) {
			exit();
		}

		parent::__construct();
	}

	function employee_get() {
		$get = $this->get();
		$id  = (isset($get['id']) && intval($get['id']) > 0 ? intval($get['id']) : 0);

		if ($id > 0) {
			$sql = "SELECT E.id, E.title, E.first_name, E.last_name, E.address1, E.address2, DATE_FORMAT(E.dob, '%d-%m-%Y') AS dob, E.designation
			FROM employees E
			WHERE E.id = ?";
			$query = $this->db->query($sql, [$id]);
			$rows  = $query->row_array();
		} else {
			$sql = "SELECT E.id, E.title, E.first_name, E.last_name, E.address1, E.address2,  DATE_FORMAT(E.dob, '%d-%m-%Y') AS dob, E.designation
			FROM employees E
			ORDER BY E.first_name, E.last_name
			LIMIT 0, 50";
			$query = $this->db->query($sql);
			$rows  = $query->result_array();
		}

		$result = [
			'status' => 'success',
			'data'   => $rows,
		];

		$this->response($result, 200);
	}

	function employee_post() {
		$post = $this->post();

		if (isset($post['id']) && $post['id'] > 0) {
			$this->db->where($post['id']);

			$data = [
				'title'       => $post['title'],
				'first_name'  => $post['first_name'],
				'last_name'   => $post['last_name'],
				'address1'    => $post['address1'],
				'address2'    => $post['address2'],
				'dob'         => $post['dob'],
				'designation' => $post['designation'],
			];
			$this->db->update('employees', $data);
		} else {
			$sql = "SELECT E.id
			FROM employees E
			WHERE E.first_name = ? AND E.last_name = ? ";
			$query = $this->db->query($sql, [$post['first_name'], $post['last_name']]);
			$row   = $query->row_array();

			if ( ! $row) {
				$data = [
					'title'       => $post['title'],
					'first_name'  => $post['first_name'],
					'last_name'   => $post['last_name'],
					'address1'    => $post['address1'],
					'address2'    => $post['address2'],
					'dob'         => $post['dob'],
					'designation' => $post['designation'],
				];
				$id = $this->db->insert('employees', $data);
				
				if ($id) {
					$result = [
						'status'  => 'success',
						'code'    => 200,
						'message' => 'Record Saved successfully!',
					];
				} else {
					$result = [
						'status'  => 'error',
						'code'    => 200,
						'message' => 'Something went to wrong. Please Try Again!',
					];
				}
			} else {
				$result = [
					'status'  => 'error',
					'code'    => 200,
					'message' => 'Record already saved!',
				];
			}
		}

		$this->response($result);
	}

	function employee_delete($id) {
		if ($id) {
			$this->db->delete('employees', $id);
			$result = [
				'status' => 'success',
				'code'   => 200,
			];
		} else {
			$result = [
				'status'  => 'error',
				'code'    => 200,
				'message' => 'Something went to wrong. Please Try Again!',
			];
		}

		$this->response($result);
	}
}