/** @type {import('tailwindcss').Config} */
module.exports = {
  safelist: ["border-green-500", "border-red-500"],
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        "2xs": "350px",
        xs: "500px",
      },
      boxShadow: {
        "form-fields": "10px 20px 5px 10px black",
      },
      colors: {
        primary: { DEFAULT: "#03045e", light: "#1D32491A" },
        secondary: {
          DEFAULT: "#FF7E31",
          light: "#ade8f4",//200
          lighter: "#FFE5D6",
        },
        gray: {
          150: "#ADB5BD",
          175: "#E9EBED",
        },
        blue: {
          750: "#1E3A8A",
        },
        accent: "#8B8F92",
        success: "#22C55E",
        danger: "#EF4444",
        light: "#f8f9fa",
        status: {
          active: "#00A711",
          pending: "#F59E0B",
        },
      },
    },
  },
};
