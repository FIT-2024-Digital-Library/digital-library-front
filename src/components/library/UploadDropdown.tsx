import React, { useState, HTMLAttributes } from 'react';
import { DropDown } from '@/components/library/DropDown';
import { Button } from '@/components/library/Button';
import { Icon } from '@/components/library/Icon';
import { useForm } from 'react-hook-form';
// import { serverUrl } from '@/main';
import clsx from 'clsx';

interface UploadDropDownProps extends HTMLAttributes<React.FC> {
  buttonComponent: JSX.Element;
  setUploadedLink: (link: string) => void;
}

export const UploadDropdown: React.FC<UploadDropDownProps> = ({
  buttonComponent,
  setUploadedLink,
}) => {
  const [file, setFile] = useState<File>();
  const [status, setStatus] = useState<string | undefined>(undefined);

  return (
    <DropDown buttonComponent={buttonComponent}>
      <div
        className={clsx(
          'w-full p-2 around',
          'bg-1-10 text-black',
          'border border-black rounded'
        )}
      >
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files?.[0]);
          }}
        />
        <Button
          variant="plate-black"
          onClick={() => {
            console.log('File for uploading: ', file);
            setStatus('Pseudo OK');
            setUploadedLink('pseudo.url');
            // addFileStorageUserIdPost({
            //   path: {
            //     user_id: 1,
            //   },
            //   body: {
            //     file: data.file[0],
            //   },
            // })
            //   .then((response) => {
            //     if (response.response.ok)
            //       setUploadedLink(serverUrl + response.data?.url);
            //     else setUploadedLink(response.error?.detail?.toString());
            //   })
            //   .catch((error) => {
            //     console.log(error);
            //   });
          }}
        >
          Upload
        </Button>
        {status && <span className="mr-1">{status}</span>}
      </div>
    </DropDown>
  );
};
