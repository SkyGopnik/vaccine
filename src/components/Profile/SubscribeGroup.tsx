import React, {ReactNode} from "react";
import {Avatar, SimpleCell, Snackbar} from "@vkontakte/vkui";
import {Icon16Done, Icon24ErrorCircleOutline, Icon28Users3Outline} from "@vkontakte/icons";

import platformApi from "src/js/platformApi";

interface IProps {
  changeSnackbar(snackbar: ReactNode | null),
  changeAdditional(data: object)
}

interface IState {
  modalOpen: boolean
}

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      modalOpen: false
    };
  }

  snackbar(text: string, type: 'success' | 'error') {
    const { changeSnackbar } = this.props;

    changeSnackbar(
      <Snackbar
        className={`${type}-snack`}
        layout="vertical"
        onClose={() => changeSnackbar(null)}
        before={
          type === 'success' ? (
            <Avatar size={24} style={{background: '#fff'}}>
              <Icon16Done fill="#6A9EE5" width={14} height={14} />
            </Avatar>
          ) : (
            <Icon24ErrorCircleOutline fill="#fff" />
          )
        }
      >
        {text}
      </Snackbar>
    );
  };

  render() {
    const { changeAdditional } = this.props;
    const { modalOpen } = this.state;

    return (
      <SimpleCell
        before={<Icon28Users3Outline />}
        description="Подпишитесь на нас"
        onClick={() => {
          this.setState({ modalOpen: true });

          !modalOpen && platformApi.subscribeGroup((res) => {
            this.setState({ modalOpen: false });

            if (res.result) {
              changeAdditional({
                subGroup: true
              });

              this.snackbar('Спасибо за подписку!', 'success');
            }
          })
        }}
        expandable
      >
        Сообщество SkyReglis
      </SimpleCell>
    );
  }
};
