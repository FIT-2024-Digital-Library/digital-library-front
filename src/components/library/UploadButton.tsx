import React, { HTMLAttributes, useRef } from 'react';
import { Button } from '@/components/library/Button';
import { Icon } from '@/components/library/Icon';
import { useMutation } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { uploadFileStoragePost, UploadFileStoragePostResponse } from '@/api';

interface UploadDropDownProps extends HTMLAttributes<React.FC> {
  buttonText?: string;
  buttonClassname?: string;
  onSuccess: (response: UploadFileStoragePostResponse) => void;
}

export const UploadButton: React.FC<UploadDropDownProps> = ({
  buttonClassname,
  buttonText,
  onSuccess,
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const {
    mutate: uploadFile,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (data: File) =>
      dataExtractionWrapper(
        uploadFileStoragePost({
          body: {
            file: data,
          },
        })
      ),
    onSuccess: (response) => {
      onSuccess(response);
    },
  });

  return (
    <>
      <input
        ref={ref}
        type="file"
        className="hidden"
        onChange={(e) => {
          if (e.target.files) uploadFile(e.target.files[0]);
        }}
      />
      {
        <Button
          title="Upload file for card"
          variant="plate-grey"
          className={buttonClassname}
          onClick={() => ref.current?.click()}
        >
          {buttonText && <span className="mx-1">{buttonText}</span>}
          {isPending && <Icon className="animate-spin" icon="loading-3/4" />}
          {isSuccess && <Icon icon="check" />}
          {!isPending && !isSuccess && <Icon icon="upload" />}
        </Button>
      }
    </>
  );
};
