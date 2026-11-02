const getUser = () => {
  const user = localStorage.getItem("loggedUser");
  if (user) {
    return JSON.parse(user);
  }
};

const saveUser = (user) => {
  localStorage.setItem("loggedUser", JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem("loggedUser");
};

export { saveUser, removeUser, getUser };
