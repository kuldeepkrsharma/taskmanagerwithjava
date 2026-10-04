import { useState, useEffect } from "react";
import { fetchTasks } from "../api";
import _ from "lodash";

export function useTasks(tryagain, query, status, page, pageSize) {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    function callfunction() {
      fetchTasks({ query, status, page, pageSize })
        .then((data) => {
          setTasks(data.items);
          setTotal(data.total);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }

    const debouncedFunction = _.debounce(callfunction, 500);

    debouncedFunction();

    return () => {
      debouncedFunction.cancel();
    };
  }, [query, status, page, pageSize, tryagain]);

  return { tasks, total, loading, error };
}
