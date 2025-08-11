import api from "../../lib/api";
import { User } from "../users/user.entity";

export const authRepository = {
  // ユーザー登録
  async signup(
    name: string,
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> {
    const result = await api.post("/auth/signup", { name, email, password });
    const { user, token } = result.data;
    return { user: new User(user), token };
  },
  // ログイン
  async signin(email: string, password: string): Promise<{ user: User; token: string }> {
    const result = await api.post("/auth/signin", { email, password });
    const { user, token } = result.data;
    return { user: new User(user), token };
  },
  // ログイン中のユーザーを取得
  async getCurrentUser(): Promise<User | null> {
    const result = await api.get("/auth/me");
    if (result.data == null) return null;
    return new User(result.data);
  },
};
