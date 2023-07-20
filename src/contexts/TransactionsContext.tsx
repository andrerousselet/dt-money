import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
  createdAt: string;
}

type TransactionsContextType = {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionData) => Promise<void>;
};

export const TransactionsContext = createContext({} as TransactionsContextType);

interface CreateTransactionData {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function fetchTransactions(query?: string) {
    try {
      const response = await api.get<Transaction[]>("/transactions", {
        params: {
          q: query,
          _sort: "createdAt",
          _order: "desc",
        },
      });
      setTransactions(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function createTransaction(data: CreateTransactionData) {
    const { description, price, category, type } = data;

    try {
      const response = await api.post<Transaction>("transactions", {
        description,
        price,
        category,
        type,
        createdAt: new Date(),
      });
      setTransactions((prevTransactions) => [
        response.data,
        ...prevTransactions,
      ]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    void fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
