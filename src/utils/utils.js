// utils/utils.js

let idCounter = 0;

export const createField = () => ({
  id: idCounter++,
  key: "",
  type: "",
  children: [],
  showOptions: true,
});

export const buildJSON = (items) => {
  const obj = {};
  items.forEach((item) => {
    if (!item.key) return;
    if (item.type === "nested") {
      obj[item.key] = buildJSON(item.children);
    } else {
      obj[item.key] =
        item.type === "string"
          ? "string"
          : item.type === "number" 
          ? "number"  :
          
          item.type === "float"
          ? "float"
          : item.type === "boolean"
          ? true
          : item.type === "objectId"
          ? "507f191e810c19729de860ea"
          : null;
    }
  });
  return obj;
};
