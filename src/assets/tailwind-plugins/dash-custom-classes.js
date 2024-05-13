const plugin = require("tailwindcss/plugin");
export default plugin(function ({ addComponents, theme }) {
  addComponents({
    ".dash-red-with-border": {
      boxShadow: theme("boxShadow.form-fields"),
      transition: "all 0.3s ease-in-out",
      border: "5px solid red",
    },
    ".dash-background-gradient": {
      background: "linear-gradient(85deg, #03045e 0.71%, #0077b6 100%)"
    },
    ".dash-gradient-border": {
      border: "1px solid",
      width: "100%",
      borderImage: "linear-gradient(to right, rgba(224, 225, 226, 0) 0%, #e0e1e2 49.52%, rgba(224, 225, 226, 0.15625) 99.04%)",
      borderImageSlice: "1"
    }
  });
});
