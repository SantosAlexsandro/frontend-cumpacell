import { Environment } from '../../../environment';
import { Api } from '../axios-config';


export interface ITransactionList {
  id: number;
  cod: string;
  date: string;
  created_at: string;
  receiving_date: string;
  customer_first_name: string;
  customer_middle_name: string;
  customer_last_name: string;
  total_service_charge: number;
  situation: string;
}

export interface ITransactionDetail {
  id: number;
  nome: string;
  cod: string;
  brand?: string;
  model?: string;
  product_price?: string;
  product_cost?: string;
}

type TTransactionComTotalCount = {
  data: ITransactionList[];
  totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TTransactionComTotalCount | Error> => {
  try {
    const urlRelativa = `/transactions?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&customerfistnamelike=${filter}`;

    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
      };
    }

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const getById = async (id: number): Promise<ITransactionDetail | Error> => {
  try {
    const { data } = await Api.get(`/workorder/${id}`);
    console.log(data);
    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const create = async (dados: Omit<ITransactionDetail, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<ITransactionDetail>('/items', dados);

    if (data) {
      return data.id;
    }

    return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dados: ITransactionDetail): Promise<void | Error> => {
  try {
    await Api.put(`/items/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/items/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
  }
};


export const TransactionsService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
