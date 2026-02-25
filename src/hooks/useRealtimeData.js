import { useState, useEffect } from "react";
import {
  ref,
  onValue,
  query,
  orderByChild,
  limitToLast,
} from "firebase/database";
import { database } from "../firebase/config";

export const useRealtimeData = (path, options = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    enabled = true,
    orderBy,
    limitToLast: limit,
    sortBy,
    sortDesc,
  } = options;

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let dbRef = ref(database, path);

    if (orderBy) {
      dbRef = query(dbRef, orderByChild(orderBy));
    }
    if (limit) {
      dbRef = query(dbRef, limitToLast(limit));
    }

    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        const val = snapshot.val();
        if (val) {
          const dataArray = Object.entries(val).map(([id, data]) => ({
            id,
            ...data,
          }));

          if (sortBy) {
            dataArray.sort((a, b) => {
              const aVal = a[sortBy];
              const bVal = b[sortBy];
              return sortDesc
                ? bVal > aVal
                  ? 1
                  : -1
                : aVal > bVal
                  ? 1
                  : -1;
            });
          }

          setData(dataArray);
        } else {
          setData([]);
        }
        setLoading(false);
        setError(null);
      },
      (error) => {
        console.error("Firebase error:", error);
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [path, enabled, orderBy, limit, sortBy, sortDesc]);

  return { data, loading, error };
};
