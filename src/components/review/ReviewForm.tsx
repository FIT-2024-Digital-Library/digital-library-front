import React, {
  HTMLAttributes,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { ReviewType } from './ReviewsList';
import { Button } from '../library/Button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';
import { FormItem } from '../library/FormItem';
import clsx from 'clsx';
import { Icon } from '../library/Icon';

const marks = [1, 2, 3, 4, 5];
const reviewScheme = z.object({
  mark: z.number({ coerce: true }).min(1).max(5),
  text: z.string(),
});
export type ReviwSchemeType = z.infer<typeof reviewScheme>;

export interface ReviewFormProps
  extends PropsWithChildren<HTMLAttributes<React.FC>> {
  review?: ReviewType;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ review }) => {
  const [currentMark, setCurrentMark] = useState(review?.mark ?? 5);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ReviwSchemeType>({
    resolver: zodResolver(reviewScheme),
  });

  useEffect(() => {
    console.log('Mark updated');
    setValue('mark', currentMark, { shouldValidate: true });
  }, [setValue, currentMark]);

  return (
    <form
      className={clsx(
        'grid grid-cols-5',
        'gap-x-3',
        'divide-x divide-black',
        'border border-black rounded-lg'
      )}
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <FormItem
        className="grid grid-cols-1 p-2"
        errorMessage={errors.mark?.message}
      >
        <div className="around">
          {marks.map((mark) => (
            <Button
              className="rounded-md"
              variant={currentMark === mark ? 'plate-black' : 'plate-grey'}
              onClick={() => setCurrentMark(mark)}
              key={mark}
            >
              {mark}
            </Button>
          ))}
        </div>
        <input className="hidden" value={currentMark} {...register('mark')} />
      </FormItem>
      <FormItem className="col-span-3 p-2" errorMessage={errors.text?.message}>
        <textarea
          id="text"
          placeholder="Review text (optional)"
          className="w-full p-2 bg-transparent"
          defaultValue={review?.text}
          {...register('text')}
        />
      </FormItem>
      <div className="p-2">
        <Button className="w-full" variant="plate-black" type="submit">
          <span>Save</span>
          <Icon icon="save" />
        </Button>
      </div>
    </form>
  );
};
