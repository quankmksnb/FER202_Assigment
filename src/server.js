const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// API lấy sản phẩm theo danh mục
server.get("/product_categories/:categoryId", (req, res) => {
    const db = router.db;
    const categoryId = parseInt(req.params.categoryId);

    // Lấy danh sách product_id từ bảng trung gian
    const productCategories = db.get("product_categories").filter({ category_id: categoryId }).value();
    const productIds = productCategories.map(pc => pc.product_id);

    // Lấy danh sách sản phẩm tương ứng
    const products = db.get("products").filter(p => productIds.includes(p.id)).value();
    
    res.json({ products });
});

server.use(router);
server.listen(9999, () => {
    console.log("JSON Server is running on port 9999");
});
