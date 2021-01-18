import React, {ReactNode} from "react";

import {Button, Caption, Card, Text} from "@vkontakte/vkui";

import style from './Card.scss';

interface IProps {
  icon?: ReactNode,
  title?: string | ReactNode,
  description?: string | ReactNode,
  subDescription?: string | ReactNode,
  children?: ReactNode,
  actions?: ReactNode,
  actionsInfo?: {
    action: ReactNode,
    info: string
  },
  noPadding?: boolean
}

export default class extends React.Component<IProps> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      icon,
      title,
      description,
      subDescription,
      children,
      actions,
      actionsInfo,
      noPadding
    } = this.props;

    return (
      <Card
        className={style.card}
        mode="shadow"
        style={noPadding && { padding: '0' }}
      >
        {title && (
          <div className={style.title}>
            {icon && (
              <div className={style.icon}>
                {icon}
              </div>
            )}
            <Caption level="1" weight="semibold">{title}</Caption>
          </div>
        )}
        <div className={!noPadding ? style.body : ''}>
          {!children ? (
            <>
              {description && (
                <Text weight="regular">{description}</Text>
              )}
              {subDescription && (
                <Caption level="2" weight="regular">{subDescription}</Caption>
              )}
            </>
          ) : children}
        </div>
        {actions && (
          <div className={style.actions}>
            {actions}
          </div>
        )}
        {actionsInfo && (
          <div className={style.btnWithInfo}>
            {actionsInfo.action}
            <Caption className={style.info} level="1" weight="regular">{actionsInfo.info}</Caption>
          </div>
        )}
      </Card>
    );
  }
}
