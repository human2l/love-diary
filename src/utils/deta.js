import { Deta } from "deta";

const getDetaDB = (dbName) => {
  const deta = Deta(process.env.REACT_APP_DETA_SECRET);
  return deta.Base(dbName);
};

const getDetaDrive = (driveName) => {
  const deta = Deta(process.env.REACT_APP_DETA_SECRET);
  return deta.Drive("diary_photos");
};

export { getDetaDB, getDetaDrive };
