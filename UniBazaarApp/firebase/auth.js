// firebase/auth.js
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebaseConfig"; // 连接到你刚才创建的 firebaseConfig.js

const auth = getAuth(app);

// 注册新用户
export const signUp = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    console.log("✅ 注册成功");
  } catch (error) {
    console.error("❌ 注册失败:", error.message);
  }
};

// 登录现有用户
export const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("✅ 登录成功");
  } catch (error) {
    console.error("❌ 登录失败:", error.message);
  }
};

export default auth;
