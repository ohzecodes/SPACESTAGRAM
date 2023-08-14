import ReactDOM from "react-dom/client";
import "./string.ts";
import "./style/main.scss";
import App from "./App.tsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
const container: HTMLElement = document.getElementById("root")!;

const root = ReactDOM.createRoot(container);
root.render(
<Provider store={store}>
<App />
</Provider>
);