'use client';

import { useState } from 'react';
import UserForm from '@/components/UserForm';
import UserList from '@/components/UserList';
import { User, UserFormData } from '@/types/user';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleAddUser = (userData: UserFormData) => {
    const newUser: User = {
      id: crypto.randomUUID(),
      ...userData,
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);
    setSuccessMessage(`${userData.fullName} has been successfully added.`);

    // Clear success message after 5 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };

  return (
    <div className="nec-width-container">
      <main className="nec-main-wrapper" id="main-content" role="main">
        <div className="nec-grid-row">
          <div className="nec-grid-column-two-thirds">
            <h1 className="nec-heading-xl">User Registration</h1>

            <p className="nec-body-l">
              Add new users to the system.
            </p>

            {successMessage && (
              <div
                className="nec-notification-banner nec-notification-banner--success"
                role="alert"
                aria-labelledby="success-banner-title"
                id="success-message"
                tabIndex={-1}
              >
                <div className="nec-notification-banner__header">
                  <h2 className="nec-notification-banner__title" id="success-banner-title">
                    Success
                  </h2>
                </div>
                <div className="nec-notification-banner__content">
                  <p className="nec-notification-banner__heading">
                    {successMessage}
                  </p>
                </div>
              </div>
            )}

            <h2 className="nec-heading-l">Add a new user</h2>

            <UserForm onAddUser={handleAddUser} />
          </div>
        </div>

        <div className="nec-grid-row" style={{ marginTop: '3rem' }}>
          <div className="nec-grid-column-full">
            <UserList users={users} />
          </div>
        </div>
      </main>
    </div>
  );
}
