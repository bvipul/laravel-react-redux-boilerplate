<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\UserResource;
use App\User;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Validator;

class UserController extends ApiController
{
    protected $repository;

    /**
     * __construct.
     *
     * @param $repository
     */
    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Return the users.
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ? $request->get('paginate') : 25;
        $orderBy = $request->get('orderBy') ? $request->get('orderBy') : 'ASC';
        $sortBy = $request->get('sortBy') ? $request->get('sortBy') : 'created_at';

        return UserResource::collection(
            $this->repository->getForDataTable(1, false)->orderBy($sortBy, $orderBy)->paginate($limit)
        );
    }

    /**
     * Return the specified resource.
     *
     * @param User $user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Create User.
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validation = $this->validateUser($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return $this->respond([
            'success'   => true,
            'message'   => "User Created Successfully"
        ]);
        // return new UserResource(User::orderBy('created_at', 'desc')->first());
    }

    /**
     * Update User.
     *
     * @param Request $request
     * @param User    $user
     *
     * @return Validator object
     */
    public function update(Request $request, User $user)
    {
        $validation = $this->validateUser($request, 'edit', $user->id);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($user, $request->all());

        // $user = User::findOrfail($user->id);

        return $this->respond([
            'success'   => true,
            'message'   => "User Updated Successfully"
        ]);

        // return new UserResource($user);
    }

    /**
     * Delete User.
     *
     * @param User    $user
     * @param Request $request
     *
     * @return mixed
     */
    public function destroy(User $user, Request $request)
    {
        $this->repository->delete($user);

        return $this->respond([
            'success'   => true,
            'data'      => $user->id,
            'message'   => 'User Successfully Deleted!',
        ]);
    }

    /**
     * Delete All User.
     *
     * @param Request $request
     *
     * @return mixed
     */
    public function deleteAll(Request $request)
    {
        $ids = $request->get('ids');

        if (isset($ids) && !empty($ids)) {
            $result = $this->repository->deleteAll($ids);
        }

        if ($result) {
            return $this->respond([
                'message'   => trans('alerts.backend.users.deleted'),
            ]);
        }

        return $this->respond([
            'message'   => trans('exceptions.backend.access.users.not_found'),
        ]);
    }

    /**
     * validateUser User.
     *
     * @param $request
     * @param $action
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateUser(Request $request, $action = '', $id = 0)
    {
        $password = ($action == 'edit') ? '' : 'required|min:6';

        $validation = Validator::make($request->all(), [
            'name'            => 'required|max:255',
            'email'           => 'required|max:255|email|unique:users,email,'.$id,
            'password'        => $password,
            'is_admin'        => 'required|boolean'
        ]);

        return $validation;
    }
}
