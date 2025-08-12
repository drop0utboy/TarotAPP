// Frontend/src/Entities/TarotReading.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 7000,
});

export const TarotReading = {
  // 모든 리딩 목록
  async list() {
    const { data } = await api.get("/readings");
    return data;                 // [{ id, question, … }, …]
  },

  // 새 리딩 저장
  async save(payload) {
    const { data } = await api.post("/readings", payload);
    return data;                 // 저장된 레코드
  },
};

export default TarotReading;
