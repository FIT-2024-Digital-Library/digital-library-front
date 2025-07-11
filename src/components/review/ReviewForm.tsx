import React, { HTMLAttributes, PropsWithChildren } from 'react';
import { Button } from '../library/Button';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';
import { FormItem } from '../library/FormItem';
import clsx from 'clsx';
import { Icon } from '../library/Icon';
import { ProgressBar } from '../library/ProgressBar';

const marks = [1, 2, 3, 4, 5] as const;
const reviewScheme = z.object({
  mark: z.number({ coerce: true }).min(1).max(5),
  text: z.string().min(1, 'Please, write something in your review'),
});
export type ReviwSchemeType = z.infer<typeof reviewScheme>;

export interface ReviewFormProps
  extends PropsWithChildren<HTMLAttributes<React.FC>> {
  review: ReviwSchemeType;
  submitAction: (review: ReviwSchemeType) => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  review,
  submitAction,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ReviwSchemeType>({
    resolver: zodResolver(reviewScheme),
    defaultValues: {
      mark: review?.mark ?? 5,
    },
  });

  return (
    <form
      className={clsx(
        'grid grid-cols-5',
        'divide-x divide-black',
        'border border-black rounded-lg'
      )}
      onSubmit={handleSubmit((data) => submitAction(data))}
    >
      <FormItem
        className="grid grid-cols-1 p-2"
        errorMessage={errors.mark?.message}
      >
        <Controller
          control={control}
          name="mark"
          render={({ field: { onChange, value } }) => (
            <>
              <div className="around">
                {marks.map((mark) => (
                  <Button
                    className="rounded-md"
                    variant={value === mark ? 'plate-black' : 'plate-grey'}
                    onClick={() => onChange(mark)}
                    key={mark}
                  >
                    {mark}
                  </Button>
                ))}
              </div>
              <ProgressBar value={value} minValue={0} maxValue={5} />
            </>
          )}
        />
      </FormItem>
      <FormItem
        className="col-span-3 p-2 center"
        errorMessage={errors.text?.message}
      >
        <textarea
          id="text"
          placeholder="Review's text"
          className="w-full p-2 bg-transparent resize-none"
          defaultValue={review?.text}
          {...register('text')}
        />
      </FormItem>
      <div className="p-2 center">
        <Button className="w-full" variant="plate-black" type="submit">
          <span>Save</span>
          <Icon icon="save" />
        </Button>
      </div>
    </form>
  );
};
