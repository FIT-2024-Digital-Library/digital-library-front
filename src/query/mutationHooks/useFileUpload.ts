import { useMutation } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { FileUploadedScheme, uploadFileStoragePost } from '@/api';

export const useFileUpload = (
  onSuccess?: (file: FileUploadedScheme) => void
) => {
  const { mutate: uploadFile, ...rest } = useMutation({
    mutationFn: (data: File) =>
      dataExtractionWrapper(
        uploadFileStoragePost({
          body: {
            file: data,
          },
        })
      ),
    onSuccess,
  });

  return { uploadFile, ...rest };
};
