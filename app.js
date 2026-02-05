const app = require('./dist/app.js').default;
const PORT = process.env.PORT || 3006;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
