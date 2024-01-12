import { memo } from 'react';
import BtnLink from '@/components/BtnLink/BtnLink';
import { todoUsersResolvedRouter } from '@/routes/resolvedRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTodoUsers, setSelectedUser } from '@/store/todoUsers';
import { AppDispatch } from '@/store';
import SelectInput from '@/components/SelectInput/SelectInput';

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
      <SelectInput
        label="Select the task creator!"
        onChange={(e) => handleSelectedUser(e.target.value)}
        options={users.map((user) => {
          return { id: user.id, label: user.name };
        })}
      />
      <BtnLink className="secondary" to={todoUsersResolvedRouter}>
        Edit users
      </BtnLink>
    </div>
  );
});

export default UserSelect;
