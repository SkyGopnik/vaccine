import React from 'react';

import ViewLight from "src/components/ViewLight";

// Панели
import ErrorPanel from '../panels/Error/ErrorContainer';

interface IProps {
  id: string
}

export default (props: IProps) => {
  return (
    <ViewLight
      id="error"
      activePanel="error"
      panelList={[
        {
          id: 'error',
          component: ErrorPanel
        }
      ]}
    />
  );
}
