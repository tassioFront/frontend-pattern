import { memo } from 'react';
import { ITodoUser } from '@/models/Todo';
import BtnLink from '@/components/BtnLink/BtnLink';
import { todoUsersResolvedRouter } from '@/routes/resolvedRoutes';

export interface UserSelectTypes {
  users: ITodoUser[];
  selectedUserId: string;
  handleSelectedUser: (id: string) => void;
}

const UserSelect = memo(function UserSelect({
  selectedUserId,
  handleSelectedUser,
  users,
}: UserSelectTypes) {
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
