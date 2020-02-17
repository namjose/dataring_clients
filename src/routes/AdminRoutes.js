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
import AdminProjects from '../containers/admin-projects/AdminProjects'
import AdminProjectDetail from '../containers/admin-projects/AdminProjectDetail'
import AdminQueryDetail from '../containers/query-detail/AdminQueryDetail'
import QueryGroup from '../containers/query-detail/QueryGroup'

const AdminRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Projects} />
      <Route exact path="/projects" component={AdminProjects} />
      <Route
        exact
        path="/projects/projectDetail/:id"
        component={AdminProjectDetail}
      />
      <Route exact path="/queries/admin/:id" component={AdminQueryDetail} />
      <Route exact path="/queries/:id" component={QueryDetail} />
      <Route exact path="/queries/receive/:id" component={QueryReceiveDetail} />
      <Route exact path="/user/id/:userId" component={Profile} />
      <Route exact path="/queries/list/:listId" component={QueryGroup} />
    </Switch>
  )
}

export default AdminRoutes
