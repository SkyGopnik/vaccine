import React from 'react';
import { FormItem, usePlatform, getClassName, Button } from "@vkontakte/vkui";

import Icon24Camera from '@vkontakte/icons/dist/24/camera';
import Icon24DismissDark from '@vkontakte/icons/dist/24/dismiss_dark';

import isset from 'src/functions/isset';

import styles from './FileItem.scss';

interface FormItem {
  value: Array<string | ArrayBuffer>,
  error?: string,
  rules?: {
    minLength?: number,
    maxLength?: number,
    required?: boolean
  }
}

interface IProps {
  limit?: number,
  item: FormItem,
  onValueChange(item: FormItem)
}

interface IState {
  loading: boolean
}

export default class extends React.Component<IProps, IState> {
  private fileInput: React.RefObject<HTMLInputElement>;

  static defaultProps = {
    limit: 5
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };

    this.fileInput = React.createRef();
  }

  onFileChange = () => {
    const {
      limit,
      item,
      onValueChange
    } = this.props;
    const newItem = { ...item };
    const imagesCount = newItem.value.length;

    const image = this.fileInput.current;
    const currentImagesCount = this.fileInput.current.files.length;

    newItem.error = '';

    // Показываем эффект загрузки
    this.setState({
      loading: true
    });

    const checkFile = new Promise((fileChecked) => {
      if (currentImagesCount !== 0) {
        if (
          currentImagesCount <= limit
          && (imagesCount + currentImagesCount) <= limit
        ) {
          let isErrors = true;

          for (let i = 0; i < currentImagesCount; i++) {
            isErrors = true;

            if (this.fileInput.current.files[i].type === 'image/jpeg' || this.fileInput.current.files[i].type === 'image/png') {
              if (this.fileInput.current.files[i].size <= 10000000) {
                isErrors = false;

                const reader = new FileReader();
                reader.readAsDataURL(this.fileInput.current.files[i]);

                reader.onloadend = (e) => {
                  if (typeof e.target.result === 'string') {
                    console.log(`Размер файла ${Math.ceil(((e.target.result.length * 6) / 8) / 1024)} кб`);
                  }

                  newItem.value.push(e.target.result);

                  // Сравниваем загрузились ли все файлы
                  if ((currentImagesCount + imagesCount) === newItem.value.length) {
                    fileChecked(newItem);
                  }
                };
              }
            }
          }

          if (isErrors) {
            fileChecked(newItem);
            newItem.error = 'Для загрузки доступны только изображения формата \'.jpg\', \'.jpeg\' и \'.png\'. Размер изображения не должен превышать 10 МБ.';
          }
        } else {
          fileChecked(newItem);
          newItem.error = `Кол-во файлов не может быть больше ${limit}!`;
        }
      } else {
        fileChecked(newItem);
        newItem.error = 'Для загрузки доступны только файлы формата \'.jpg\', \'.jpeg\' и \'.png\'. Размер изображения не должен превышать 10 МБ.';
      }
    });

    checkFile.then(() => {
      // Прячем загрузку
      this.setState({
        loading: false
      });

      image.value = '';

      console.log(newItem.value);

      onValueChange(newItem);
    });
  }

  removeFile = (id) => {
    const { item, onValueChange } = this.props;
    const newItem = { ...item };

    const newImagesFiltered = newItem.value.filter((item, index) => id !== index);
    newItem.value = newImagesFiltered;

    onValueChange(newItem);
  }

  render() {
    const { item } = this.props;

    return (
      <FormItem
        top="Фотографии (.jpg, .jpeg, .png)"
        status={isset(item.error) ? (item.error ? 'error' : 'valid') : 'default'}
        bottom={item.error ? item.error : ''}
      >
        <div className={styles.loadImg}>
          <Button
            before={<Icon24Camera />}
            size="l"
            stretched
          >
            Добавить фотографии
          </Button>
          <input
            type="file"
            ref={this.fileInput}
            accept="image/jpeg,image/png"
            onChange={this.onFileChange}
            multiple
          />
        </div>
        {item.value.length !== 0 && (
          <div
            className={styles.imagesList}
            onClick={(e) => e.preventDefault()}
          >
            {item.value.map((item, index) => (
              <div
                key={`image_list_item_${index}`}
                className={styles.image}
              >
                <Icon24DismissDark
                  className={styles.remove}
                  onClick={() => this.removeFile(index)}
                />
                <img src={String(item)} alt="" />
              </div>
            ))}
          </div>
        )}
      </FormItem>
    );
  }
}
