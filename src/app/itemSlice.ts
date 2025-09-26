import { createSlice } from "@reduxjs/toolkit";

export interface ItemOptions {
  id: string;
  name: string;
  sku: string;
  stock: number;
  price: number;
  tags: ItemTag[];
}

export type ItemTag = (typeof ITEM_TAGS)[number];

export const ITEM_TAGS = [
  "Đồ uống",
  "Tạp hóa",
  "Đông lạnh",
  "Đồ ăn vặt",
  "Kẹo",
];

const Items: ItemOptions[] = [
  {
    id: "aB3cD4eF",
    name: "Kem que sô cô la",
    sku: "SKU-11235",
    stock: 70,
    price: 15000,
    tags: ["Đông lạnh", "Đồ ăn vặt"],
  },
  {
    id: "gH5iJ6kL",
    name: "Sữa chua uống",
    sku: "SKU-87362",
    stock: 95,
    price: 10000,
    tags: ["Đồ uống", "Tạp hóa"],
  },
  {
    id: "mN7oP8qR",
    name: "Kẹo dẻo trái cây",
    sku: "SKU-55910",
    stock: 120,
    price: 22000,
    tags: ["Kẹo", "Đồ ăn vặt"],
  },
  {
    id: "sT9uV0wX",
    name: "Nước suối 500ml",
    sku: "SKU-48201",
    stock: 200,
    price: 5000,
    tags: ["Đồ uống"],
  },
  {
    id: "yZ1aB2cC",
    name: "Bánh mì ngọt",
    sku: "SKU-93847",
    stock: 45,
    price: 18000,
    tags: ["Đồ ăn vặt"],
  },
  {
    id: "dEfG3hIj",
    name: "Mì ly ăn liền",
    sku: "SKU-29183",
    stock: 115,
    price: 12000,
    tags: ["Đồ ăn vặt", "Tạp hóa"],
  },
  {
    id: "kLmN4oPq",
    name: "Xúc xích tiệt trùng",
    sku: "SKU-74028",
    stock: 180,
    price: 8000,
    tags: ["Đồ ăn vặt", "Tạp hóa"],
  },
  {
    id: "rStU5vWx",
    name: "Bánh Choco-pie",
    sku: "SKU-63549",
    stock: 88,
    price: 55000,
    tags: ["Đồ ăn vặt", "Kẹo"],
  },
  {
    id: "yZaB6cDe",
    name: "Nước tăng lực",
    sku: "SKU-10293",
    stock: 130,
    price: 15000,
    tags: ["Đồ uống"],
  },
  {
    id: "fGhI7jKl",
    name: "Bánh gạo",
    sku: "SKU-38475",
    stock: 65,
    price: 28000,
    tags: ["Đồ ăn vặt"],
  },
  {
    id: "mNoP8qRs",
    name: "Cà phê sữa đóng hộp",
    sku: "SKU-59102",
    stock: 90,
    price: 14000,
    tags: ["Đồ uống", "Tạp hóa"],
  },
  {
    id: "tUvW9xYz",
    name: "Kẹo cao su",
    sku: "SKU-82736",
    stock: 250,
    price: 20000,
    tags: ["Kẹo"],
  },
  {
    id: "aBcD0eFg",
    name: "Trà xanh đóng chai",
    sku: "SKU-49157",
    stock: 160,
    price: 12000,
    tags: ["Đồ uống"],
  },
  {
    id: "hIjK1lMn",
    name: "Bia lon",
    sku: "SKU-73645",
    stock: 240,
    price: 19000,
    tags: ["Đồ uống", "Tạp hóa"],
  },
  {
    id: "oPqR2sTu",
    name: "Đá viên (túi)",
    sku: "SKU-00192",
    stock: 50,
    price: 7000,
    tags: ["Đông lạnh"],
  },
];

export interface ItemState {
  items: ItemOptions[];
}

const initialState: ItemState = {
  items: Items,
};

const ItemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    }
  },
});

export const { deleteItem } = ItemSlice.actions;

export default ItemSlice.reducer;
