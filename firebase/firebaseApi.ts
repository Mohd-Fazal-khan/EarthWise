import { db, auth } from "./firebaseconfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  Timestamp,
} from "firebase/firestore";


export const saveReading = async (temperature?: number, moisture?: number) => {
  if (!auth.currentUser) throw new Error("User not logged in");

  const temp = temperature ?? +(20 + Math.random() * 10).toFixed(1);
  const moist = moisture ?? +(30 + Math.random() * 50).toFixed(0);

  await addDoc(
    collection(db, "users", auth.currentUser.uid, "soilReadings"),
    {
      temperature: temp,
      moisture: moist,
      timestamp: new Date(),
    }
  );
};

export const getLatestReading = async () => {
  if (!auth.currentUser) throw new Error("User not logged in");

  const q = query(
    collection(db, "users", auth.currentUser.uid, "soilReadings"),
    orderBy("timestamp", "desc"),
    limit(1)
  );
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    const doc = snapshot.docs[0].data();
    return {
      temperature: doc.temperature,
      moisture: doc.moisture,
      timestamp: doc.timestamp.toDate(),
    };
  }
  return null;
};


export const getRecentReadings = async () => {
  if (!auth.currentUser) throw new Error("User not logged in");

  const q = query(
    collection(db, "users", auth.currentUser.uid, "soilReadings"),
    orderBy("timestamp", "desc"),
    limit(3)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      temperature: data.temperature,
      moisture: data.moisture,
      timestamp: data.timestamp.toDate(),
    };
  });
};

export const getLast7DaysData = async () => {
  if (!auth.currentUser) throw new Error("User not logged in");

  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  const q = query(
    collection(db, "users", auth.currentUser.uid, "soilReadings"),
    where("timestamp", ">=", Timestamp.fromDate(sevenDaysAgo)),
    orderBy("timestamp", "asc") // ascending for graph
  );

  const snapshot = await getDocs(q);
  const readings = snapshot.docs.map((doc) => doc.data());

  if (readings.length === 0) {
    return { avgTemp: 0, avgMoisture: 0, last7Readings: [] };
  }

  const sumTemp = readings.reduce((acc, r: any) => acc + r.temperature, 0);
  const sumMoisture = readings.reduce((acc, r: any) => acc + r.moisture, 0);

  return {
    avgTemp: +(sumTemp / readings.length).toFixed(1),
    avgMoisture: +(sumMoisture / readings.length).toFixed(1),
    last7Readings: readings.map((r: any) => ({
      temperature: r.temperature,
      moisture: r.moisture,
      timestamp: r.timestamp.toDate(),
    })),
  };
};
