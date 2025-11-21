const db = require("../database");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { validationResult } = require("express-validator");


const upload = multer({ dest: "uploads/" });

const getAllProducts = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const sortField = req.query.sort || "id";
    const sortOrder = req.query.order === "desc" ? "DESC" : "ASC";

    const validSortFields = ["id", "name", "category", "brand", "stock"];

    if (!validSortFields.includes(sortField)) {
        return res.status(400).json({ error: "Invalid sort field" });
    }

    const sql = `
        SELECT * FROM products
        ORDER BY ${sortField} ${sortOrder}
        LIMIT ? OFFSET ?
    `;

    db.all(sql, [limit, offset], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        db.get(`SELECT COUNT(*) AS total FROM products`, (err2, countRow) => {
            if (err2) return res.status(500).json({ error: err2.message });

            res.json({
                page,
                limit,
                total: countRow.total,
                products: rows,
            });
        });
    });
};


const searchProducts = (req, res) => {
    const name = req.query.name || "";

    const sql = `
        SELECT * FROM products
        WHERE LOWER(name) LIKE ?
    `;

    db.all(sql, [`%${name.toLowerCase()}%`], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json(rows);
    });
};

const addProduct = (req, res) => {
  const { name, unit, category, brand, stock, status, image } = req.body;

  if (!name || name.trim() === "")
    return res.status(400).json({ error: "Name is required" });

  db.get(
    `SELECT id FROM products WHERE LOWER(name) = LOWER(?)`,
    [name],
    (err, row) => {
      if (row) return res.status(400).json({ error: "Product name exists" });

      const sql = `
        INSERT INTO products (name, unit, category, brand, stock, status, image)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      db.run(
        sql,
        [name, unit, category, brand, stock || 0, status, image],
        function (err2) {
          if (err2) return res.status(500).json({ error: err2.message });

          db.get(
            `SELECT * FROM products WHERE id = ?`,
            [this.lastID],
            (err3, prod) => {
              if (err3) return res.status(500).json({ error: err3.message });
              res.json(prod);
            }
          );
        }
      );
    }
  );
};

const updateProduct = (req, res) => {
    const id = req.params.id;

    const { name, unit, category, brand, stock, status, image } = req.body;

    if (isNaN(stock) || stock < 0) {
        return res.status(400).json({ error: "Stock must be a non-negative number" });
    }

 
    db.get(
        `SELECT id FROM products WHERE LOWER(name) = LOWER(?) AND id != ?`,
        [name, id],
        (err, row) => {
            if (err) return res.status(500).json({ error: err.message });

            if (row) {
                return res.status(400).json({ error: "Product name already exists" });
            }

            db.get(`SELECT stock FROM products WHERE id = ?`, [id], (err2, oldProduct) => {
                if (err2) return res.status(500).json({ error: err2.message });

                if (!oldProduct) {
                    return res.status(404).json({ error: "Product not found" });
                }

                const oldStock = oldProduct.stock;

          
                const updateSQL = `
                    UPDATE products
                    SET name = ?, unit = ?, category = ?, brand = ?, stock = ?, status = ?, image = ?
                    WHERE id = ?
                `;

                db.run(
                    updateSQL,
                    [name, unit, category, brand, stock, status, image, id],
                    function (err3) {
                        if (err3) return res.status(500).json({ error: err3.message });

                      
                        if (oldStock !== stock) {
                            const historySQL = `
                                INSERT INTO inventory_history (product_id, old_quantity, new_quantity, change_date, user_info)
                                VALUES (?, ?, ?, ?, ?)
                            `;

                            db.run(historySQL, [
                                id,
                                oldStock,
                                stock,
                                new Date().toISOString(),
                                "admin",
                            ]);
                        }

                        
                        db.get(`SELECT * FROM products WHERE id = ?`, [id], (err4, updated) => {
                            if (err4) return res.status(500).json({ error: err4.message });
                            res.json(updated);
                        });
                    }
                );
            });
        }
    );
};


const importProducts = (req, res) => {
    upload.single("csvFile")(req, res, (err) => {
        if (err) return res.status(400).json({ error: "File upload error" });

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const filePath = req.file.path;
        const results = [];
        let added = 0;
        let skipped = 0;
        let duplicates = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => results.push(row))
            .on("end", () => {
                const insertProduct = (index) => {
                    if (index >= results.length) {
                        fs.unlinkSync(filePath); // cleanup
                        return res.json({ added, skipped, duplicates });
                    }

                    const product = results[index];

                    db.get(
                        `SELECT id FROM products WHERE LOWER(name) = LOWER(?)`,
                        [product.name],
                        (err, row) => {
                            if (row) {
                                skipped++;
                                duplicates.push({ name: product.name, existingId: row.id });
                                return insertProduct(index + 1);
                            }

                            const sql = `
                                INSERT INTO products (name, unit, category, brand, stock, status, image)
                                VALUES (?, ?, ?, ?, ?, ?, ?)
                            `;

                            db.run(
                                sql,
                                [
                                    product.name,
                                    product.unit,
                                    product.category,
                                    product.brand,
                                    parseInt(product.stock) || 0,
                                    product.status,
                                    product.image,
                                ],
                                (err2) => {
                                    if (err2) skipped++;
                                    else added++;

                                    insertProduct(index + 1);
                                }
                            );
                        }
                    );
                };

                insertProduct(0);
            });
    });
};


const exportProducts = (req, res) => {
    db.all(`SELECT * FROM products`, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        let csvContent = "id,name,unit,category,brand,stock,status,image\n";

        rows.forEach((p) => {
            csvContent += `${p.id},${p.name},${p.unit},${p.category},${p.brand},${p.stock},${p.status},${p.image}\n`;
        });

        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=products.csv");
        res.status(200).send(csvContent);
    });
};

const getProductHistory = (req, res) => {
    const id = req.params.id;

    const sql = `
        SELECT * FROM inventory_history
        WHERE product_id = ?
        ORDER BY change_date DESC
    `;

    db.all(sql, [id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json(rows);
    });
};

module.exports = {
    getAllProducts,
    searchProducts,
    updateProduct,
    importProducts,
    exportProducts,
    getProductHistory,
    addProduct
};
