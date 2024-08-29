import { Api } from '../axios-config';


interface IAuth {
  token: string;
}

const auth = async (email: string, password: string): Promise<IAuth | Error> => {
  try {
    console.log(email);
    console.log(password);
    const { data } = await Api.post('/tokens/', { email, password } );
    console.log('data', data);
    if (data) {
      return data;
    }

    return new Error('Erro no login.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro no login.');
  }
};

export const AuthService = {
  auth,
};
