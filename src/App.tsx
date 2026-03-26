import { createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './components/Landing'
import TopicList from './components/TopicList'
import PracticeSession from './components/PracticeSession'
import SessionHistory from './components/SessionHistory'
import PrintWorksheet from './components/PrintWorksheet'
import WeakSpots from './components/WeakSpots'

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'strand/:strandId', element: <TopicList /> },
      { path: 'practice/:teksCode', element: <PracticeSession /> },
      { path: 'print/:teksCode', element: <PrintWorksheet /> },
      { path: 'history', element: <SessionHistory /> },
      { path: 'weak-spots', element: <WeakSpots /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
