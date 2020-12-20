import React, { ReactNode } from 'react';
import {
  View
} from '@vkontakte/vkui';

interface IProps {
  id: string,
  activePanel: string,
  panelList: Array<{
    id: string,
    component: ReactNode,
    props?: any
  }>,
  modal?: ReactNode,
  popout?: ReactNode
}

export default (props: IProps) => {
  const {
    id,
    activePanel,
    panelList,
    modal,
    popout
  } = props;

  return (
    <View
      id={id}
      activePanel={activePanel}
      modal={modal}
      popout={popout}
    >
      {panelList.map((item, index) => (
        // @ts-ignore
        <item.component
          {...item.props}
          {...props}
          key={index}
          id={item.id}
        />
      ))}
    </View>
  );
};
