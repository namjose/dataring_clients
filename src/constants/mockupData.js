export const projectList = [
  {
    id: 1,
    title: 'Project #1',
    content: 'Part A, Part B and Part C - Public Data Exchange',
    status: 'Ready'
  },
  {
    id: 2,
    title: 'Project #2',
    content: 'Part B and Part C - Private Data Exchange',
    status: 'Not Ready'
  },
  {
    id: 3,
    title: 'Project #3',
    content: 'Part D and Part A - Private Data Exchange',
    status: 'Not Ready'
  }
  // {
  //   id: 4,
  //   title: 'Project #4',
  //   content: 'Part A and Part B - Private Data Exchange',
  //   status: 'Pending'
  // },
  // {
  //   id: 5,
  //   title: 'Project #5',
  //   content: 'Part A and Part B - Private Data Exchange',
  //   status: 'Pending'
  // }
]

function createData(id, name, description) {
  return { id, name, description }
}

export const publicCollaboratorList = [
  createData('100', 'Party A', 'Bank in Sydney'),
  createData('101', 'Pary B', 'Hospital in Macquarie'),
  createData('102', 'Party C', 'Bank in Sydney'),
  createData('103', 'Pary D', 'Hospital in Macquarie'),
  createData('104', 'Party E', 'Bank in Sydney'),
  createData('105', 'Pary F', 'Hospital in Macquarie')
]

function createCollaboratorStatusData(id, name, status) {
  return { id, name, status }
}

export const collaboratorsOnProject = ['Party B', 'Party C']

export const columnList = ['Name', 'Interest', 'Colour', 'School']

export const collaboratorStatusData = [
  createCollaboratorStatusData('101', 'Party B', 'Ready'),
  createCollaboratorStatusData('102', 'Party C', 'Ready')
]

export const collaboratorStatusHead = [
  'Collaborator ID'
  // 'Collaborator Name',
  // 'Status'
]

function createQuery(id, creator, queryOn, result, status) {
  return { id, creator, queryOn, result, status }
}

export const queryListData = [
  createQuery('101', 'Party A', 'Party B', null, 'Pending'),
  createQuery('102', 'Party B', 'Party B, Party C', 10230, 'Done')
]

export const queryListHead = [
  'Query ID',
  'Query Creator',
  'Query On',
  'Result (rows)',
  'Status'
]

export const queryDetail = {
  id: '101',
  publishDate: new Date(2019, 11, 24),
  status: 'Done',
  collaborators: [
    {
      id: 1,
      name: 'Party B'
    },
    {
      id: 2,
      name: 'Party C'
    }
  ],
  columnValues: [
    {
      name: 'interest',
      value: 5000
    },
    {
      name: 'cost',
      value: 30000
    }
  ],
  result: 534000
}

export const projectRequest = {
  factor: 2,
  ratio: 0.001,
  epsilon: 0.95
}

export const defaultUser = {
  id: 'auth1',
  email: 'namjackson123@gmail.com',
  displayName: 'Hoang Nam',
  totalProjects: 25,
  totalQuery: 10,
  joinDate: new Date(2019, 12, 1)
}
