import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

export const SalerContext = createContext();

export const SalerProvider = ({ children }) => {
  const [salers, setSalers] = useState([]);
  const [searchSaler, setSearchSaler] = useState("");

  const fetchSalers = useCallback(async () => {
    try {
      const roleRes = await axios.get("http://localhost:9999/user_roles");
      console.log("User Roles:", roleRes.data);
  
      const salerIds = roleRes.data
        .filter((role) => Number(role.role_id) === 3) // Chắc chắn role_id là số
        .map((role) => String(role.user_id)); // Chuyển user_id về string
  
      console.log("Filtered Saler IDs:", salerIds);
  
      const userRes = await axios.get("http://localhost:9999/users");
      console.log("Users:", userRes.data);
  
      const filteredSalers = userRes.data.filter((user) =>
        salerIds.includes(String(user.id)) // Chuyển user.id về string để so sánh
      );
  
      console.log("Filtered Salers:", filteredSalers);
  
      setSalers(filteredSalers);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  }, []);
  

  useEffect(() => {
    fetchSalers();
  }, [fetchSalers]);

  return (
    <SalerContext.Provider value={{ salers, searchSaler, setSearchSaler }}>
      {children}
    </SalerContext.Provider>
  );
};
