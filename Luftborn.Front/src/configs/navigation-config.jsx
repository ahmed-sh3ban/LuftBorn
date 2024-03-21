import { APP_PREFIX_PATH } from "./EnvironmentConfig";

const productNavTree = {
  key: `product`,
  path: `${"APP_PREFIX_PATH"}`,
  label: `Product`,
  submenu: [
    {
      key: "product.add",
      path: `${APP_PREFIX_PATH}/product/add`,
      label: "New Product",
    },
    {
      key: "product.list",
      path: `${APP_PREFIX_PATH}/product/list`,
      label: "List Product",
    },
  ],
};
const navigationConfig = productNavTree;
export default navigationConfig;
