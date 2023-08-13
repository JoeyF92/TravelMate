const config = {
  development: {
    baseUrl: 'http://127.0.0.1:5000', // Local development URL
  },
  production: {
    baseUrl: 'https://travelmate-r2ys.onrender.com', // Render deployment URL
  },
};

export default config[process.env.NODE_ENV];
