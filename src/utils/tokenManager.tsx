import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { setUUID } from 'redux/userID';

interface jwtType {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  user_uuid: string;
}

interface TokenInfo {
  token: string;
}

// π μ‘μΈμ€, λ¦¬νλ μ¬ ν ν° μ²΄ν¬ ν¨μ
const checkAccessToken = async (Token: string) => {
  const tokenForm: TokenInfo = {
    token: Token,
  };

  await axios
    .post(`/users/token/verify`, tokenForm)
    .then((res) => {
      if (res.status === 200) {
        console.log('ν ν° μμ§ μ ν¨ν¨');
      }
    })
    .catch((error) => {
      if (error.response.status) {
        console.log('λ§λ£λκ±°');
        updateAccessToken(getToken().refresh!);
        // updateAccessToken(getToken().refresh!);
      } else {
        console.log(error);
      }
    });
};

// π λ‘κ·ΈμΈ axios κ³Όμ μμ μ΄κ±° μ¬μ©νλ©΄ λ  λ―
const decodeAccessToken = (accessToken: string) => {
  const decoded = jwtDecode<jwtType>(accessToken);
  console.log(decoded.user_uuid, 'μ²΄ν¬γ΄');
  // μ¬κΈ°μ uuid μ μ­κ΄λ¦¬ κ³ κ³ 
  return decoded.user_uuid;
};

// π λ¦¬νλ μ¬λ‘ μμΈμ€ κ°±μ 
const updateAccessToken = async (refreshToken: string) => {
  await axios
    .post(`/users/token/refresh`, {
      refresh: refreshToken,
    })
    .then((res) => {
      setToken(res.data.access, getToken().refresh!);
      console.log('μλ°μ΄νΈλμμλλ€.');
    })
    .catch((res) => {
      console.log('μλ°μ΄νΈ', res);
    });
};

// π λ‘μ»¬ μ€ν λ¦¬μ§μ μλ ν ν°μ νμΈ
const getToken = () => {
  const access = localStorage.getItem('access_token');
  const refresh = localStorage.getItem('refresh_token');

  return { access, refresh };
};

// π λ‘μ»¬ μ€ν λ¦¬μ§μ μλ ν ν°μ νμΈ
const setToken = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);
};

// π λ‘μ»¬ μ€ν λ¦¬μ§μ μλ ν ν°μ clear λ‘κ·Έμμν λ ?
// const deleteToken = (clearToken: string) => {
//   localStorage.removeItem(clearToken);
//   window.location.replace("/mainpage");
// };

export { checkAccessToken, decodeAccessToken, getToken, setToken, updateAccessToken };
