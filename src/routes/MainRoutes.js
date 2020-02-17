import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Projects from '../containers/projects/Projects'
import QueryDetail from '../containers/query-detail/QueryDetail'
import CreateProject from '../containers/create-project/CreateProject'
import JoinProject from '../containers/join-project/JoinProject'
import Request from '../containers/request/Request'
import Profile from '../containers/user-profile/Profile'
import ProjectDetail from '../containers/project-detail/ProjectDetail'
import QueryReceiveDetail from '../containers/query-detail/QueryReceiveDetail'

const MainRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Projects} />
      <Route exact path="/projects" component={Projects} />
      <Route
        exact
        path="/projects/projectDetail/:id"
        component={ProjectDetail}
      />
      <Route exact path="/queries/:id" component={QueryDetail} />
      <Route exact path="/queries/receive/:id" component={QueryReceiveDetail} />
      <Route exact path="/projects/create" component={CreateProject} />
      <Route exact path="/requests/join/:id" component={JoinProject} />
      <Route exact path="/requests" component={Request} />
      <Route exact path="/user/id/:userId" component={Profile} />
    </Switch>
  )
}

export default MainRoutes
