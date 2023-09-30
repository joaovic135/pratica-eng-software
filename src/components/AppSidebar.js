import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react';
import { AppSidebarNav } from './AppSidebarNav';
import SimpleBar from 'simplebar-react';
import navigation from '../_nav';
import 'simplebar-core/dist/simplebar.css'

// Importe as ações do Redux Toolkit
import { setSidebarShow, setSidebarUnfoldable } from '../redux/sidebarSlice';

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebar.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow);
  
  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        // Use as ações do Redux Toolkit para alterar o estado
        dispatch(setSidebarShow(visible));
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <b>teste</b>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => {
          // Use as ações do Redux Toolkit para alterar o estado
          dispatch(setSidebarUnfoldable(!unfoldable));
        }}
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
