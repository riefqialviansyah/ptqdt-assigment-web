const { expect, it } = require("@jest/globals");
const { Sale } = require("../models");
const request = require("supertest");
const app = require("../server");

afterAll(async () => {
  await Sale.destroy({ truncate: true, cascade: true, restartIdentity: true }); // main purpose is to restart identity or id table
});

describe("Create sales data", () => {
  it("Can create new sales data", async () => {
    const data = {
      name: "Kopi",
      stock: 100,
      sellAmount: 10,
      transactionDate: "1-05-2021",
      type: "Konsumsi",
    };

    const response = await request(app).post("/sales/add").send(data);

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("message", "Success add sales");
    expect(response.body.data).toHaveProperty("name", data.name);
  });
});

describe("Get sales data", () => {
  it("Can get all sales data", async () => {
    const response = await request(app).get("/sales/getAll");

    expect(response.status).toEqual(200);
    expect(response.body.data[0]).toHaveProperty("id", expect.any(Number));
  });
});

describe("Update sales data", () => {
  it("Can update sales data", async () => {
    const dataUpdate = {
      stock: 300, // last data is 100
    };

    const response = await request(app).put("/sales/update/1").send(dataUpdate); // id is 1 to update latest data

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("message", "Success update sales");
    expect(response.body.data).toHaveProperty("stock", dataUpdate.stock);
  });
});

describe("Delete sales data", () => {
  it("Can delete sales data", async () => {
    const response = await request(app).delete("/sales/delete/1");

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("message", "Success delete sale data");
  });
});
