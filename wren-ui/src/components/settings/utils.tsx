import { SETTINGS } from '@/utils/enum';
import DatabaseOutlined from '@ant-design/icons/DatabaseOutlined';
import ProjectOutlined from '@ant-design/icons/ProjectOutlined';

export const getSettingMenu = (menu: SETTINGS) =>
  ({
    [SETTINGS.DATA_SOURCE]: {
      icon: DatabaseOutlined,
      label: 'Настройки ресурса данных',
    },
    [SETTINGS.PROJECT]: {
      icon: ProjectOutlined,
      label: 'Настройки проекта',
    },
  })[menu] || null;
