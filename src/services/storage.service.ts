export const STORAGE_KEYS = {
  READ: "email:read",
  FAVOURITES: "email:favourites",
};

export const StorageService = {
  read(key: string) {
    const data = localStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data);
  },
  write(key: string, data: object) {
    localStorage.setItem(key, JSON.stringify(data));
  },
  updateById(key: string, id: string, value: boolean) {
    const lsData = StorageService.read(key);
    if (!lsData) {
      StorageService.write(key, {});
    }
    if (!value) {
      delete lsData[id];
    } else {
      lsData[id] = value;
    }
    StorageService.write(key, lsData);
  },
  getById(key: string, id: string) {
    const lsData = StorageService.read(key);
    return lsData[id];
  },
};
