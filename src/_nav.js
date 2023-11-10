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
    name: 'Admin',
  },
  {
    component: CNavItem,
    name: 'Cadastrar',
    href: '/auth/admin/signup',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Usuários',
  },
  {
    component: CNavItem,
    name: 'Listar',
    href: '/users/',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Lojistas',
  },
  {
    component: CNavItem,
    name: 'Listar',
    href: '/lojistas/',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Produtos',
  },
  {
    component: CNavItem,
    name: 'Listar',
    href: '/produtos/',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Informações Pessoais',
  },
  {
    component: CNavItem,
    name: 'Editar Perfil',
    href: '/users/editQ',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Alterar Senha',
    href: '/users/alterarSenha',
    icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
  },
]

export default _nav