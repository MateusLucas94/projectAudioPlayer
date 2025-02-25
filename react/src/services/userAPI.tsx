type User = {
  name: string;
  email: string;
  image: string;
  description: string;
};

const USER_KEY = "user";
const TIMEOUT = 1500;
const SUCCESS_STATUS = "OK";

const readUser = (): User | null => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

const saveUser = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const simulateRequest =
  <T,>(response: T) =>
  (callback: (res: T) => void): void => {
    setTimeout(() => {
      callback(response);
    }, TIMEOUT);
  };

export const getUser = (): Promise<User> =>
  new Promise((resolve) => {
    const user = readUser() || {
      name: "",
      email: "",
      image: "",
      description: "",
    };
    simulateRequest(user)(resolve);
  });

export const createUser = (user: Partial<User>): Promise<string> =>
  new Promise((resolve) => {
    const emptyUser: User = {
      name: "",
      email: "",
      image: "",
      description: "",
    };
    saveUser({ ...emptyUser, ...user });
    simulateRequest(SUCCESS_STATUS)(resolve);
  });

export const updateUser = (updatedUser: User): Promise<string> =>
  new Promise((resolve) => {
    saveUser(updatedUser);
    simulateRequest(SUCCESS_STATUS)(resolve);
  });
