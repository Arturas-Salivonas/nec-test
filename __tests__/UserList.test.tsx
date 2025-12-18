import { render, screen } from '@testing-library/react';
import UserList from '@/components/UserList';
import { User } from '@/types/user';

describe('UserList', () => {
  const mockUsers: User[] = [
    {
      id: '1',
      fullName: 'John Smith',
      age: 25,
      country: 'england',
      interests: ['reading-books', 'gym'],
    },
    {
      id: '2',
      fullName: 'Jane Doe',
      age: 30,
      country: 'italy',
      interests: ['sleeping'],
    },
  ];

  it('displays message when no users are present', () => {
    render(<UserList users={[]} />);
    expect(screen.getByText(/no users have been added yet/i)).toBeInTheDocument();
  });

  it('displays user count correctly', () => {
    render(<UserList users={mockUsers} />);
    expect(screen.getByText(/2 users registered/i)).toBeInTheDocument();
  });

  it('displays singular "user" when only one user', () => {
    render(<UserList users={[mockUsers[0]]} />);
    expect(screen.getByText(/1 user registered/i)).toBeInTheDocument();
  });

  it('renders user table with correct headers', () => {
    render(<UserList users={mockUsers} />);

    expect(screen.getByRole('columnheader', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /age/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /country/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /interests/i })).toBeInTheDocument();
  });

  it('displays all user information correctly', () => {
    render(<UserList users={mockUsers} />);

    // Check first user
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('England')).toBeInTheDocument();
    expect(screen.getByText('Reading books')).toBeInTheDocument();
    expect(screen.getByText('Gym')).toBeInTheDocument();

    // Check second user
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('Italy')).toBeInTheDocument();
    expect(screen.getByText('Sleeping')).toBeInTheDocument();
  });

  it('converts country codes to readable labels', () => {
    const users: User[] = [
      {
        id: '1',
        fullName: 'Test User',
        age: 25,
        country: 'france',
        interests: ['walking'],
      },
    ];

    render(<UserList users={users} />);
    expect(screen.getByText('France')).toBeInTheDocument();
  });

  it('displays interests as a list', () => {
    const users: User[] = [
      {
        id: '1',
        fullName: 'Test User',
        age: 25,
        country: 'england',
        interests: ['reading-books', 'gym', 'programming'],
      },
    ];

    render(<UserList users={users} />);

    const interestsList = screen.getByRole('cell', { name: /reading books gym programming/i });
    expect(interestsList).toBeInTheDocument();
  });
});
