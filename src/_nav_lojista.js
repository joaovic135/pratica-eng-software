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
  cilLockLocked
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
  {
    component: CNavTitle,
    name: 'Perfil',
  },
  {
    component: CNavItem,
    name: 'Editar Perfil',
    href: '/lojistas/editQ',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Alterar Senha',
    href: '/lojistas/alterarSenha',
    icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
  },
]

export default _nav