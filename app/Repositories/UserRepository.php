<?php

namespace App\Repositories;

use App\User;

class UserRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = User::class;

    /**
     * @var User Model
     */
    protected $model;

    /**
     * @param RoleRepository $role
     */
    public function __construct(User $model)
    {
        $this->model = $model;
    }

    /**
     * @return mixed
     */
    public function getForDataTable()
    {
        return $this->query()
            ->select([
                'users.id',
                'users.name',
                'users.email',
                'users.is_admin',
                'users.updated_at',
                'users.created_at'
            ]);
    }     
    
    public function create($input)
    {
        if(User::create($input))
        {
            return true;
        }
    }

    public function update($user, $input)
    {
        if($user->update($input))
        {
            return true;
        }
    }

    public function delete($user)
    {
        if($user->delete())
        {
            return true;
        }
    }
}