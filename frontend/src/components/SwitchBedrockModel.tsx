import { twMerge } from 'tailwind-merge';
import { BaseProps } from '../@types/common';
import useModel from '../hooks/useModel';
import Button from './Button';
import useUser from '../hooks/useUser'

type Props = BaseProps;

const SwitchBedrockModel: React.FC<Props> = (props) => {
  const { availableModels, modelId, setModelId } = useModel();
  const { isAdmin } = useUser();

  return (
    <div
      className={twMerge(
        props.className,
        'flex justify-center gap-2 rounded-lg border border-light-gray bg-light-gray p-1 text-sm'
      )}>
      {isAdmin
        ? availableModels.map((availableModels) => (
          <Button
            key={availableModels.modelId}
            className={twMerge(
              'flex w-40 flex-1 items-center rounded-lg p-2',
              modelId === availableModels.modelId
                ? ''
                : 'border-light-gray bg-white text-dark-gray'
            )}
            onClick={() => setModelId(availableModels.modelId)}
            children={<span>{availableModels.label}</span>}
          />
        ))
        : availableModels.length > 0 && (
          <Button
            key={availableModels[0].modelId}
            className={twMerge(
              'flex w-40 flex-1 items-center rounded-lg p-2',
              modelId === availableModels[0].modelId
                ? ''
                : 'border-light-gray bg-white text-dark-gray'
            )}
            onClick={() => setModelId(availableModels[0].modelId)}
            children={<span>{availableModels[0].label}</span>}          
          />
        )}
    </div>
  );
};

export default SwitchBedrockModel;
