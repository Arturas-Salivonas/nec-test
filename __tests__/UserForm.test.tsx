import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserForm from '@/components/UserForm';

describe('UserForm', () => {
  const mockOnAddUser = jest.fn();

  beforeEach(() => {
    mockOnAddUser.mockClear();
  });

  it('renders all form fields', () => {
    render(<UserForm onAddUser={mockOnAddUser} />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByText(/interests/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add user/i })).toBeInTheDocument();
  });

  it('shows validation errors when form is submitted empty', async () => {
    render(<UserForm onAddUser={mockOnAddUser} />);

    const submitButton = screen.getByRole('button', { name: /add user/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/enter your full name/i)).toBeInTheDocument();
      expect(screen.getByText(/enter your age/i)).toBeInTheDocument();
      expect(screen.getByText(/select a country/i)).toBeInTheDocument();
      expect(screen.getByText(/select at least one interest/i)).toBeInTheDocument();
    });

    expect(mockOnAddUser).not.toHaveBeenCalled();
  });

  it('shows age validation error when age is below 18', async () => {
    const user = userEvent.setup();
    render(<UserForm onAddUser={mockOnAddUser} />);

    const ageInput = screen.getByLabelText(/age/i);
    await user.type(ageInput, '17');

    const submitButton = screen.getByRole('button', { name: /add user/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/you must be at least 18 years old/i)).toBeInTheDocument();
    });

    expect(mockOnAddUser).not.toHaveBeenCalled();
  });

  it('successfully submits form with valid data', async () => {
    const user = userEvent.setup();
    render(<UserForm onAddUser={mockOnAddUser} />);

    // Fill in full name
    const nameInput = screen.getByLabelText(/full name/i);
    await user.type(nameInput, 'John Smith');

    // Fill in age
    const ageInput = screen.getByLabelText(/age/i);
    await user.clear(ageInput);
    await user.type(ageInput, '25');

    // Select country
    const countrySelect = screen.getByLabelText(/country/i);
    await user.selectOptions(countrySelect, 'england');

    // Select interests
    const readingCheckbox = screen.getByLabelText(/reading books/i);
    await user.click(readingCheckbox);

    const gymCheckbox = screen.getByLabelText(/gym/i);
    await user.click(gymCheckbox);

    // Submit form
    const submitButton = screen.getByRole('button', { name: /add user/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnAddUser).toHaveBeenCalledWith({
        fullName: 'John Smith',
        age: 25,
        country: 'england',
        interests: expect.arrayContaining(['reading-books', 'gym']),
      });
    });
  });

  it('clears form after successful submission', async () => {
    const user = userEvent.setup();
    render(<UserForm onAddUser={mockOnAddUser} />);

    // Fill in form
    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    const ageInput = screen.getByLabelText(/age/i);
    await user.clear(ageInput);
    await user.type(ageInput, '30');
    await user.selectOptions(screen.getByLabelText(/country/i), 'italy');
    await user.click(screen.getByLabelText(/sleeping/i));

    // Submit
    await user.click(screen.getByRole('button', { name: /add user/i }));

    await waitFor(() => {
      expect(mockOnAddUser).toHaveBeenCalled();
    });

    // Check form is cleared
    expect(screen.getByLabelText(/full name/i)).toHaveValue('');
    expect(screen.getByLabelText(/age/i)).toHaveValue(null);
  });

  it('displays error summary when validation fails', async () => {
    render(<UserForm onAddUser={mockOnAddUser} />);

    const submitButton = screen.getByRole('button', { name: /add user/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorSummary = screen.getByRole('alert');
      expect(errorSummary).toBeInTheDocument();
      expect(screen.getByText(/Please correct the \d+ error(s)? below/i)).toBeInTheDocument();
    });
  });

  it('allows selecting multiple interests', async () => {
    const user = userEvent.setup();
    render(<UserForm onAddUser={mockOnAddUser} />);

    // Fill required fields
    await user.type(screen.getByLabelText(/full name/i), 'Test User');
    const ageInput = screen.getByLabelText(/age/i);
    await user.clear(ageInput);
    await user.type(ageInput, '25');
    await user.selectOptions(screen.getByLabelText(/country/i), 'australia');

    // Select multiple interests
    await user.click(screen.getByLabelText(/reading books/i));
    await user.click(screen.getByLabelText(/programming/i));
    await user.click(screen.getByLabelText(/walking/i));

    // Submit
    await user.click(screen.getByRole('button', { name: /add user/i }));

    await waitFor(() => {
      expect(mockOnAddUser).toHaveBeenCalledWith(
        expect.objectContaining({
          interests: expect.arrayContaining(['reading-books', 'programming', 'walking']),
        })
      );
    });
  });
});
