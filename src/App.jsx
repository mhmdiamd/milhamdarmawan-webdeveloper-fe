import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CodeResetPassword from './Pages/CodeResetPassword/CodeResetPassword';
import CreateRecipe from './Pages/Dashboard/CreateRecipe/CreateRecipe';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import Login from './Pages/Login/Login';
import DetailVideo from './Pages/DetailVideo/DetailVideo';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import Register from './Pages/Register/Register';
import NotFound from './Pages/PageNotFound/NotFound';
import Profile from './Pages/Dashboard/Profile/Profile';
import Home from './Pages/Home/Home';
import DetailResep from './Pages/DetailResep/DetailResep';
import AuthMiddleware from './Middleware/AuthMiddleware';
import UpdateRecipe from './Pages/Dashboard/UpdateRecipe/UpdateRecipe';
import Recipes from './Pages/Recipes/Recipes';
import UnauthMiddleware from './Middleware/UnauthMiddleware';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/dashboard/create-recipe"
        element={
          <AuthMiddleware>
            <CreateRecipe />
          </AuthMiddleware>
        }
      />
      <Route path="/dashboard/my-recipe/:id" element={<UpdateRecipe />} />
      <Route
        path="/login"
        element={
          <UnauthMiddleware>
            <Login />
          </UnauthMiddleware>
        }
      />
      <Route
        path="/register"
        element={
          <UnauthMiddleware>
            <Register />
          </UnauthMiddleware>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <UnauthMiddleware>
            <ForgotPassword />
          </UnauthMiddleware>
        }
      />
      <Route
        path="/code-reset-password"
        element={
          <UnauthMiddleware>
            <CodeResetPassword />
          </UnauthMiddleware>
        }
      />
      <Route
        path="/reset-password"
        element={
          <UnauthMiddleware>
            <ResetPassword />
          </UnauthMiddleware>
        }
      />
      <Route
        path="/profile"
        element={
          <AuthMiddleware>
            <Profile />
          </AuthMiddleware>
        }
      />
      <Route path="/recipes/videos/:id" element={<DetailVideo />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/recipes/:id" element={<DetailResep />} />
      <Route path="/recipes" element={<Recipes />} />
    </Routes>
  );
}

export default App;
