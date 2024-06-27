import { XCircleIcon, CheckCircleIcon,} from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function CategoryStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-400 text-gray-900': status === 'disabled',
          'bg-green-400 text-green-900': status === 'enabled',
        },
      )}
    >
      {status === 'enabled' ? (
        <>
          Enabled
          <CheckCircleIcon className="ml-1 w-4 text-green-900" />
        </>
      ) : null}
      {status === 'disabled' ? (
        <>
          Disabled
          <XCircleIcon className="ml-1 w-4 text-gray-900" />
        </>
      ) : null}
    </span>
  );
}
