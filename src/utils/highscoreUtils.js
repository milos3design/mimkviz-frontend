export const fetchHighscores = () => {
  return fetch(import.meta.env.VITE_LB_URL, {
    credentials: "include", // Ensure cookies are sent with the request
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Greška u mrežnom odgovoru");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Greška u preuzimanju top liste:", error);
      throw error;
    });
};
