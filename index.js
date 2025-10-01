import express from 'express';
import cors from 'cors';
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Math IQ Battle server running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
