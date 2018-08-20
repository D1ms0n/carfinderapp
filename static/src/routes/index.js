import FormContainer from './../containers/Form';
import Registration from './../components/Registration';
import Login from './../components/Login';
import Logout from './../components/Logout';
import NotFound from './../components/NotFound';
import Repo from './../components/Repo';

const routes = [
  {
    path: "/",
    component: FormContainer
  },
  {
    path: "/registration",
    component: Registration
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/logout",
    component: Logout
  },
  {
    path: "/user/:repoName",
    component: Repo
  },
  {
    component: NotFound
  }
];

export default routes;