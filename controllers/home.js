
const path = require('path');
module.exports = {
  getIndex: (req, res) => {
    res.render('index.ejs')
  },
  getImage: (req, res) => {
    const imagePath = path.join("https://listify-todolist-app.cyclic.cloud/", '../public/assets/listify.png');
    res.sendFile(imagePath);
  }
}