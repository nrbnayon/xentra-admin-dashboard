// types/user.ts
export interface User {  
id: string;
  name: string;
  phone_number: string;
  role: "admin" | "user" | "guest" | "creator";
  email_address?: string;
  image?: string;
  status?: "active" | "inactive" | "pending";
  location?: string;
  date?: string;
  phone?: string;
  [key: string]: any;
}

export interface UserFormData {
  name: string;
  phone_number: string;
  email_address?: string;
  password?: string;
  role: "admin";
}
