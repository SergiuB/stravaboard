let controller = (app) => {
  app.get('/login', (req, res) => res.render('login', {title: 'Login'}));
};

export {controller};
