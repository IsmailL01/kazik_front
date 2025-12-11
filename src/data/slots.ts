export interface SlotGame {
  id: number;
  slug: string;        // Уникальный идентификатор для URL
  title: string;
  imageSrc: string;
  description: string;
}

export const slotsData: SlotGame[] = [
  { 
    id: 1, 
    slug: 'slot-1', 
    title: 'Slot Game 1', 
    imageSrc: '/slot1.svg', 
    description: 'Это увлекательный слот номер 1. Крутите барабаны и выигрывайте!' 
  },
  { 
    id: 2, 
    slug: 'super-fruit', 
    title: 'Super Fruit', 
    imageSrc: '/slot1.svg', 
    description: 'Классические фрукты и семерки. Высокий RTP.' 
  },
  { 
    id: 3, 
    slug: 'mega-win', 
    title: 'Mega Win', 
    imageSrc: '/slot1.svg', 
    description: 'Игра для хайроллеров с огромными множителями.' 
  },
  { id: 4, slug: 'slot-4', title: 'Slot 4', imageSrc: '/slot1.svg', description: 'Описание слота 4' },
  { id: 5, slug: 'slot-5', title: 'Slot 5', imageSrc: '/slot1.svg', description: 'Описание слота 5' },
  { id: 6, slug: 'slot-6', title: 'Slot 6', imageSrc: '/slot1.svg', description: 'Описание слота 6' },
  { id: 7, slug: 'slot-7', title: 'Slot 7', imageSrc: '/slot1.svg', description: 'Описание слота 7' },
  { id: 8, slug: 'slot-8', title: 'Slot 8', imageSrc: '/slot1.svg', description: 'Описание слота 8' },
];