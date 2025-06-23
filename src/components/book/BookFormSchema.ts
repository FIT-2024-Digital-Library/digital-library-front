import { z } from 'zod';

// Схема валидации полей книги
export const bookEditScheme = z.object({
  title: z.string().min(1, 'Title is required'),
  theme: z
    .object({
      value: z.number(),
      label: z.string(),
    })
    .required(),
  author: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .required(),
  genre: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .optional()
    .nullable(),
  publishedDate: z.number({ coerce: true }).optional().nullable(),
  description: z.string().optional().nullable(),
  imageQname: z.string().optional().nullable(),
  pdfQname: z.string().min(1, 'Book file is required'),
});

export type BookEditData = z.infer<typeof bookEditScheme>;

// Статические пропсы для react-select компонентов, используемых в форме
export const selectComponentStaticProps = {
  unstyled: true,
  classNames: {
    container: () => 'w-full border-b border-black',
    menuList: () => 'bg-1-12 my-1 py-1 divide-y-2 divide-black rounded',
    option: () => 'p-2 hover:bg-white',
    dropdownIndicator: () => 'mx-2',
  },
  isSearchable: true,
  isClearable: false,
  maxMenuHeight: 160,
}; 