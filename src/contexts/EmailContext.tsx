import EmailService from "@/services/email.service";
import { STORAGE_KEYS, StorageService } from "@/services/storage.service";
import { Filter, Email as _Email } from "@/types";
import { FILTERS } from "@/utils/constants";
import { format } from "date-fns";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Email = _Email & {
  body?: string;
  read?: boolean;
  favourite?: boolean;
  formattedDate: string;
};

type EmailData = {
  [id: string]: Email;
};

interface EmailContext {
  data: EmailData;
  allData: EmailData;
  setData: (data: Email[]) => void;
  setBody: (id: string, body: string) => void;
  toggleRead: (id: string, status: boolean) => void;
  toggleFavourite: (id: string, status: boolean) => void;
  getById: (id: string) => Email;
  setTotal: (total: number) => void;
  hasNext: boolean;
  isFetchingList: boolean;
  fetchMore: () => void;
  handleFilter: (filter: Filter) => void;
  filter: Filter;
}

const EmailContext = createContext<EmailContext | null>(null);

const EmailContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [allData, setAllData] = useState<EmailData>({});
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isFetchingList, setIsFetchingList] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");

  const [hasNext, setHasNext] = useState(false);

  const data = useMemo(() => {
    const keys = Object.keys(allData);
    if (filter === "read") {
      return keys
        .filter((key) => allData[key].read)
        .reduce((obj: any, key) => {
          obj[key] = allData[key];
          return obj;
        }, {}) as unknown as EmailData;
    }
    if (filter === "unread") {
      return keys
        .filter((key) => !allData[key].read)
        .reduce((obj: any, key) => {
          obj[key] = allData[key];
          return obj;
        }, {}) as unknown as EmailData;
    }
    if (filter === "favourites") {
      return keys
        .filter((key) => allData[key].favourite)
        .reduce((obj: any, key) => {
          obj[key] = allData[key];
          return obj;
        }, {}) as unknown as EmailData;
    }
    return allData;
  }, [allData, filter]);

  useEffect(() => {
    setHasNext(Object.keys(allData).length < total);
  }, [allData, total]);

  const formatAndSetData = (newData: _Email[]) => {
    const newObjects: EmailData = {};
    newData.forEach(
      (email) =>
        (newObjects[email.id] = {
          ...email,
          formattedDate: format(email.date as number, "dd/MM/yyyy hh:mm a"),
          read: StorageService.getById(STORAGE_KEYS.READ, email.id),
          favourite: StorageService.getById(STORAGE_KEYS.FAVOURITES, email.id),
        })
    );
    setAllData({ ...allData, ...newObjects });
  };

  const setBody = (id: string, body: string) => {
    allData[id].body = body;
    setAllData({ ...allData });
  };

  const toggleRead = (id: string, currentState: boolean) => {
    allData[id].read = !currentState;
    StorageService.updateById(STORAGE_KEYS.READ, id, !currentState);
    setAllData({ ...allData });
  };

  const toggleFavourite = (id: string, currentState: boolean) => {
    allData[id].favourite = !currentState;
    StorageService.updateById(STORAGE_KEYS.FAVOURITES, id, !currentState);
    setAllData({ ...allData });
  };

  const getById = (id: string) => allData[id];

  const fetchData = () => {
    setIsFetchingList(true);
    EmailService.fetchEmails(page)
      .then((response) => {
        formatAndSetData(response.list);
        setTotal(response.total);
        setPage(page + 1);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsFetchingList(false));
  };

  const fetchMore = () => {
    fetchData();
  };

  const handleFilter = (filter: Filter) => {
    setFilter(filter);
  };

  useEffect(() => {
    fetchData();
    const favouriteEmails = StorageService.read(STORAGE_KEYS.FAVOURITES);
    const readEmails = StorageService.read(STORAGE_KEYS.FAVOURITES);
    if (!favouriteEmails) {
      StorageService.write(STORAGE_KEYS.FAVOURITES, {});
    }
    if (!readEmails) {
      StorageService.write(STORAGE_KEYS.READ, {});
    }
  }, []);

  return (
    <EmailContext.Provider
      value={{
        data,
        allData,
        setData: formatAndSetData,
        setBody,
        toggleRead,
        toggleFavourite,
        getById,
        setTotal,
        hasNext,
        isFetchingList,
        fetchMore,
        filter,
        handleFilter,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
};

const useEmailContext = () => {
  const ctx = useContext(EmailContext);
  if (!ctx) {
    throw new Error("useEmailContext must be used within EmailContextProvider");
  }
  return ctx;
};

export { useEmailContext, EmailContextProvider };
