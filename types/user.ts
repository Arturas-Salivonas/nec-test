export interface User {
  id: string;
  fullName: string;
  age: number;
  country: string;
  interests: string[];
}

export interface UserFormData {
  fullName: string;
  age: number;
  country: string;
  interests: string[];
}

export interface FormErrors {
  fullName?: string;
  age?: string;
  country?: string;
  interests?: string;
}
