import React, { useState, HTMLAttributes } from 'react';
import { DropDown } from '@/components/library/DropDown';
import { Button } from '@/components/library/Button';
import { Icon } from '@/components/library/Icon';
import { useForm } from 'react-hook-form';
import { serverUrl } from '@/main';
import clsx from 'clsx';
import { useMutation } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { uploadFileStoragePost } from '@/api';
import { FormItem } from './FormItem';

interface UploadDropDownProps extends HTMLAttributes<React.FC> {
  buttonComponent: JSX.Element;
  setUploadedLink: (link: string) => void;
}

export const UploadDropdown: React.FC<UploadDropDownProps> = ({
  buttonComponent,
  setUploadedLink,
}) => {
  const [file, setFile] = useState<File>();
  const { mutate: uploadFile, error: uploadError } = useMutation({
    mutationFn: (file: File) =>
      dataExtractionWrapper(
        uploadFileStoragePost({
          body: {
            file,
          },
        })
      ),
    onSuccess: (response) => {
      setUploadedLink(serverUrl + response.url);
    },
  });

  return (
    <DropDown buttonComponent={buttonComponent}>
      <div
        className={clsx(
          'w-full p-2 around',
          'bg-1-10 text-black',
          'border border-black rounded'
        )}
      >
        <FormItem errorMessage={uploadError?.message}>
          <input type="file" onChange={(e) => setFile(e.target.files?.[0])} />
        </FormItem>

        <Button variant="plate-black" onClick={() => file && uploadFile(file)}>
          Upload
        </Button>
      </div>
    </DropDown>
  );
};
