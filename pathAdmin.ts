import { Request, Response, NextFunction } from 'express';
import { app } from 'express';


app.get('/auth/users', (req, res) => {
    // Firebase Admin SDK instance
    const admin = firebase.admin();
  
    // List users with pagination (default page size is 1000)
    admin.auth().listUsers().then((response) => {
      const users = response.users;
      const nextPageToken = response.nextPageToken;
  
      // Process the users array as needed
      // ...
  
      res.json(users);
    }).catch((error) => {
      console.error(error);
      res.status(500).send({ message: 'Error fetching users' });
    });
  });
  
  

app.delete('/auth/user/:id', isLoggedIn, isAdmin, deleteUser);

const deleteUser = (req, res, next) => {
  const userId = req.params.id;
  User.findByIdAndRemove(userId, (err, user) => {
    if (err) {
      req.flash('error', err);
      return res.redirect('/users');
    }
    req.flash('success', 'User successfully deleted.');
    res.status(200).send();
  });
};
// With title
app.delete('/auth/user/:title', isLoggedIn, isAdmin, deleteUser);

const deleteUser = (req, res, next) => {
  const userTitle = req.params.title;
  User.findByTitleAndRemove(userTitle, (err, user) => {
    if (err) {
      req.flash('error', err);
      return res.redirect('/users');
    }
    req.flash('success', 'User successfully deleted.');
    res.status(200).send();
  });
};