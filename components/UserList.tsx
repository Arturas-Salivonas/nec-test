'use client';

import { User } from '@/types/user';
import { COUNTRIES, INTERESTS } from '@/lib/constants';

interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  if (users.length === 0) {
    return (
      <div className="nec-inset-text">
        <p>No users have been added yet.</p>
      </div>
    );
  }

  const getCountryLabel = (value: string) => {
    const country = COUNTRIES.find((c) => c.value === value);
    return country?.label || value;
  };

  const getInterestLabel = (value: string) => {
    const interest = INTERESTS.find((i) => i.value === value);
    return interest?.label || value;
  };

  return (
    <div className="nec-user-list">
      <h2 className="nec-heading-m">Registered users</h2>
      <p className="nec-body">
        {users.length} {users.length === 1 ? 'user' : 'users'} registered
      </p>

      <table className="nec-table">
        <caption className="nec-table__caption nec-visually-hidden">
          List of registered users
        </caption>
        <thead className="nec-table__head">
          <tr className="nec-table__row">
            <th scope="col" className="nec-table__header">
              Name
            </th>
            <th scope="col" className="nec-table__header">
              Age
            </th>
            <th scope="col" className="nec-table__header">
              Country
            </th>
            <th scope="col" className="nec-table__header">
              Interests
            </th>
          </tr>
        </thead>
        <tbody className="nec-table__body">
          {users.map((user) => (
            <tr className="nec-table__row" key={user.id}>
              <td className="nec-table__cell">{user.fullName}</td>
              <td className="nec-table__cell">{user.age}</td>
              <td className="nec-table__cell">{getCountryLabel(user.country)}</td>
              <td className="nec-table__cell">
                <ul className="nec-list">
                  {user.interests.map((interest) => (
                    <li key={interest}>{getInterestLabel(interest)}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
