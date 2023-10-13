import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilUser,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Produtos',
  },
  {
    component: CNavItem,
    name: 'Listar Produtos',
    href: '/produtos/lojista',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Cadastrar Produto',
    href: '/produto/cadastrar',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
]

export default _nav