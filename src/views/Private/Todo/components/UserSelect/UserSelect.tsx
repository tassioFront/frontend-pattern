import { memo } from 'react';
import BtnLink from '@/components/BtnLink/BtnLink';
import { todoUsersResolvedRouter } from '@/routes/resolvedRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTodoUsers, setSelectedUser } from '@/store/todoUsers';
import { AppDispatch } from '@/store';

export interface UserSelectTypes {
  selectedUserId: string;
}

const UserSelect = memo(function UserSelect({
  selectedUserId,
}: UserSelectTypes) {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectAllTodoUsers);
  const handleSelectedUser = (id: string) => {
    dispatch(setSelectedUser(id));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <label>
        {/* @todo[wrappers]: create custom components later */}
        Select a user!
        <select
          defaultValue={selectedUserId}
          onChange={(e) => handleSelectedUser(e.target.value)}
        >
          {users.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
      </label>
      <BtnLink className="secondary" to={todoUsersResolvedRouter}>
        Edit users
      </BtnLink>
    </div>
  );
});

export default UserSelect;
