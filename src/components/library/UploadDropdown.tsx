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
  const {
    mutate: uploadFile,
    isSuccess,
    isPending,
    error,
  } = useMutation({
    mutationFn: (file: File) =>
      dataExtractionWrapper(
        uploadFileStoragePost({
          body: {
            file,
          },
        })
      ),
    onSuccess: (response) => {
      setUploadedLink(response.qname);
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
        <FormItem errorMessage={error?.message}>
          <input type="file" onChange={(e) => setFile(e.target.files?.[0])} />
        </FormItem>

        <Button variant="plate-black" onClick={() => file && uploadFile(file)}>
          <span>Upload</span>
          {isPending && <Icon className="animate-spin" icon="loading-3/4" />}
          {isSuccess && <Icon icon="check" />}
        </Button>
      </div>
    </DropDown>
  );
};
