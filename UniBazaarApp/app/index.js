import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/login" />; // 一打开 app 就跳转到 login
}
