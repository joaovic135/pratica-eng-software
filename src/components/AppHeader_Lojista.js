import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CContainer, CHeader, CHeaderBrand, CHeaderDivider, CHeaderNav, CHeaderToggler, CNavItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'
import { useRouter } from 'next/router'; // Importe o useRouter
import { setSidebarShow, setSidebarUnfoldable } from '../redux/sidebarSlice';

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow)
  const router = useRouter(); // Use o useRouter para navegar

  const handleDashboardClick = () => {
    router.push('/dashboard'); // Use router.push para navegar para a rota desejada
  }

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => 
            dispatch(setSidebarShow(!sidebarShow))
          }
        >
        <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <a
              className="nav-link"
              onClick={handleDashboardClick} // Use a função handleDashboardClick para navegar
            >
            </a>
          </CNavItem>
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader