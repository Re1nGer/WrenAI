import { Typography } from 'antd';
import { Spinner } from '@/components/PageLoading';

interface Props {
  generating?: boolean;
  correcting?: boolean;
  loading?: boolean;
}

export default function Generating(props: Props) {
  const { loading, generating, correcting } = props;

  return (
    <>
      <Typography.Text className="gray-8">
        Генерация SQL-запроса
      </Typography.Text>
      <div className="gray-7 text-sm mt-1">
        {generating || correcting ? (
          <div className="d-flex align-center gx-2">
            {correcting ? 'Correcting SQL statement' : 'Generating'}
            <Spinner className="gray-6" size={12} />
          </div>
        ) : (
          <>
            <div>SQL запрос успешно сгенерирован</div>
            {loading && (
              <div className="d-flex align-center gx-2 mt-1">
                Завершение <Spinner className="gray-6" size={16} />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
