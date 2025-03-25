import { useEffect, useState } from "react";
import { Table, Tag, Spin, Alert } from "antd";
import { format } from "date-fns";
import { Link } from "react-router-dom";


const OrderHistory = () => {
    const [history, setHistory] = useState([]);
    const [products, setProducts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Lấy userId từ localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user.id : null;

    useEffect(() => {
        if (!userId) {
            setError("Bạn cần đăng nhập để xem lịch sử mua hàng.");
            setLoading(false);
            return;
        }

        const fetchOrderHistory = async () => {
            try {
                const response = await fetch(`http://localhost:9999/history?user_id=${userId}`);
                if (!response.ok) {
                    throw new Error("Không thể tải dữ liệu.");
                }
                const data = await response.json();
                setHistory(data);

                // Lấy danh sách product_id duy nhất từ lịch sử mua hàng
                const productIds = [...new Set(data.map((item) => item.product_id))];

                // Gọi API để lấy thông tin sản phẩm
                const productResponses = await Promise.all(
                    productIds.map((id) => fetch(`http://localhost:9999/products/${id}`).then((res) => res.json()))
                );

                // Chuyển thành object để dễ truy xuất
                const productMap = {};
                productResponses.forEach((product) => {
                    productMap[product.id] = product;
                });

                setProducts(productMap);
            } catch (error) {
                setError("Không thể tải lịch sử mua hàng.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, [userId]);

    const columns = [
        {
            title: "Mã đơn hàng",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Sản phẩm",
            key: "product",
            render: (_, record) => {
                const product = products[record.product_id];
                return product ? (
                    <div className="d-flex align-items-center">
                        <img src={product.image} alt={product.name} style={{ width: 50, height: 50, objectFit: "cover", marginRight: 10 }} />
                        <span>{product.name}</span>
                    </div>
                ) : (
                    <Spin size="small" />
                );
            },
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Tổng tiền",
            dataIndex: "total_price",
            key: "total_price",
            render: (price) => `${price.toLocaleString()} $`,
        },
        {
            title: "Ngày mua",
            dataIndex: "purchase_date",
            key: "purchase_date",
            render: (date) => format(new Date(date), "dd/MM/yyyy HH:mm"),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "Completed" ? "green" : "red"}>{status}</Tag>
            ),
        },
    ];

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Lịch sử mua hàng</h2>
            {loading ? (
                <Spin size="large" />
            ) : error ? (
                <Alert message={error} type="error" />
            ) : history.length > 0 ? (
                <Table columns={columns} dataSource={history} rowKey="id" />
            ) : (
                <p className="text-muted">Bạn chưa có đơn hàng nào.</p>
            )}

            <div className="text-center mt-3">
                <Link to="/" className="btn btn-outline-primary">
                    ⬅ Tiếp tục mua sắm
                </Link>
            </div>
        </div>
    );
};

export default OrderHistory;
