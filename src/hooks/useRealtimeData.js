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

  useEffect(() => {
    // Don't subscribe if auto-refresh is disabled
    if (options.enabled === false) {
      return;
    }

    let dbRef = ref(database, path);

    // Apply query options
    if (options.orderBy) {
      dbRef = query(dbRef, orderByChild(options.orderBy));
    }
    if (options.limitToLast) {
      dbRef = query(dbRef, limitToLast(options.limitToLast));
    }

    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        const val = snapshot.val();
        if (val) {
          // Convert object to array with IDs
          const dataArray = Object.entries(val).map(([id, data]) => ({
            id,
            ...data,
          }));

          // Sort if needed
          if (options.sortBy) {
            dataArray.sort((a, b) => {
              const aVal = a[options.sortBy];
              const bVal = b[options.sortBy];
              return options.sortDesc
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
  }, [path, JSON.stringify(options)]);

  return { data, loading, error };
};
