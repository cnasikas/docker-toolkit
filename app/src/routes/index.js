import ListContainers from '../container/ListContainers'
import CreateContainer from '../container/CreateContainer'
import MonitorContainer from '../container/MonitorContainer'
import BuildImage from '../image/BuildImage'

const appRoutes = [
  { path: '/', component: ListContainers },
  { path: '/container/create', component: CreateContainer },
  { path: '/image/build', component: BuildImage },
  { path: '/container/:id/monitor', component: MonitorContainer }
]

export default appRoutes
