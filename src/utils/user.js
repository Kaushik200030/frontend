export async function login(username, password) {
  const url = `https://kaushikpattnaik200030.pythonanywhere.com/api/login/`;
  const loginData = {
    username,
    password,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    const data = await response.json();
    console.log("login", data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function signup(username, password, email) {
  const url = `https://kaushikpattnaik200030.pythonanywhere.com/api/signup/`;
  const signupData = {
    username,
    password,
    email,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });
    const data = await response.json();
    console.log("signup", data);
    return data;
  } catch (err) {
    console.log(err);
  }
}
