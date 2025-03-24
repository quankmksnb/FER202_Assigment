import React, { useContext } from "react";
import { SalerContext } from "../../context/SalerContext";
import { useNavigate } from "react-router-dom";

const SalerList = () => {
  const { salers } = useContext(SalerContext);
  const navigate = useNavigate();

  // Lấy thông tin user từ localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.roles; // Kiểm tra role của user
  const userId = user?.id; // Lấy ID của user nếu có

  const handleSelectSaler = (saler) => {
    navigate(`/productofsaler/${saler.id}`);
  };

  const handleMyShop = () => {
    if (userId) {
      navigate(`/myshopproduct/${userId}`);
    }
  };

  return (
    <div className="container mt-4 d-flex align-items-center">
      {userRole == "saler" && (
        <button className="btn btn-success me-3" onClick={handleMyShop}>
          My Shop
        </button>
      )}
      <ul className="list-group d-flex flex-row flex-wrap mb-0">
        {salers.map((saler) => (
          <li
            key={saler.id}
            className="list-group-item d-flex align-items-center me-2"
            onClick={() => handleSelectSaler(saler)}
            style={{ cursor: "pointer" }}
          >
            {saler.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalerList;
