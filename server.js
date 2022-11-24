const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static('./dist'));

app.get('*', (req, res) => {
  res.sendFile('./dist/index.html');
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
